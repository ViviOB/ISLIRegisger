using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using ISLI.Unility;
using ISLI.Cache;
using ISLI.Model;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace ISLIClient.Controllers
{
    public class MainController : Controller
    {
        /// <summary>
        /// 初始化构造函数
        /// </summary>
        /// <param name="environment"></param>
        public MainController(IHostingEnvironment environment)
        {
            this.environment = environment;
        }

        private IHostingEnvironment environment { get; set; }

        /// <summary>
        /// 统一社会信用代码证
        /// </summary>
        static string _UnifiedSocial = string.Empty;
        static string _CertificatePublica = string.Empty;

        #region 主页面
        /// <summary>
        /// 菜单导航
        /// </summary>
        /// <returns></returns>
        public IActionResult Index() => View();

        /// <summary>
        /// 主页
        /// </summary>
        /// <returns></returns>
        public IActionResult Main() => View();

        /// <summary>
        /// 左菜单
        /// </summary>
        /// <returns></returns>
        [Authorize]
        public IActionResult Left()
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                var name = User.Claims.Where(m => m.Type == "key").Single().Value;
                //获取用户菜单
                ViewBag.LoginInfo = RedisHelper.Get<UserInfo>(name);
            }
            return View();
        }

        /// <summary>
        /// 头部
        /// </summary>
        /// <returns></returns>
        public IActionResult Head()
        {
            //获取用户菜单
            ViewBag.LoginInfo = RedisHelper.Get<UserInfo>("userinfo");
            return View();
        }
        #endregion

        #region 出版单位注册
        /// <summary>
        /// 出版单位注册界面
        /// </summary>
        /// <returns></returns>
        public IActionResult PublishingAdd()
        {
            GetProvince();
            return View();
        }

        /// <summary>
        /// 出版单位注册
        /// </summary>
        /// <param name="pcertificate"></param>
        /// <returns></returns>
        [HttpPost]
        public int PublishingAdd(Publisher_Certificate pcertificate)
        {
            GetProvince();
            pcertificate.UnifiedSocial = _UnifiedSocial;
            pcertificate.CertificatePublica = _CertificatePublica;
            var result = Convert.ToInt32(WebApiHelper.GetApiResult("post", "Jurisdiction", "PublisherAdd", pcertificate));
            return result;
        }

        /// <summary>
        /// 统一社会信用代码证上传
        /// </summary>
        /// <param name="unifiedsocial"></param>
        [HttpPost]
        public bool UploadUnifiedsocial(IFormFile unifiedsocial)
        {
            try
            {
                var extension = Path.GetExtension(unifiedsocial.FileName);
                var root = environment.WebRootPath;
                var fullPath = $@"{root}\images\{unifiedsocial.FileName + extension}";
                // 创建新文件
                using (FileStream fs = System.IO.File.Create(fullPath))
                {
                    _UnifiedSocial = "/images/" + new Guid() + unifiedsocial.FileName;
                    // 复制文件
                    unifiedsocial.CopyTo(fs);
                    // 清空缓冲区数据
                    fs.Flush();
                }
            }
            catch (Exception)
            {

                return false;
            }
            return true;
        }

        /// <summary>
        /// 出版物资质证明
        /// </summary>
        /// <param name="certificatepublica"></param>
        [HttpPost]
        public bool Uploadcertificatepublica(IFormFile certificatepublica)
        {
            try
            {
                var extension = Path.GetExtension(certificatepublica.FileName);
                var root = environment.WebRootPath;
                var fullPath = $@"{root}\images\{certificatepublica.FileName + extension}";
                // 创建新文件
                using (FileStream fs = System.IO.File.Create(fullPath))
                {
                    _CertificatePublica = "/images/" + new Guid() + certificatepublica.FileName;
                    // 复制文件
                    certificatepublica.CopyTo(fs);
                    // 清空缓冲区数据
                    fs.Flush();
                }
            }
            catch (Exception)
            {

                return false;
            }
            return true;
        }
        #endregion

        #region 技术服务商注册
        /// <summary>
        /// 技术服务商注册页面
        /// </summary>
        /// <returns></returns>
        public IActionResult FacilitatorAdd() => View();

        /// <summary>
        /// 技术服务商基础信息添加
        /// </summary>
        /// <param name="facilitator"></param>
        [HttpPost]
        public bool FacilitatorAdd(Facilitator_Qualification fqualification)
        {
            //存入redis中
            RedisHelper.Set<Facilitator_Qualification>("fqualification", fqualification);
            return true;
        }

        /// <summary>
        /// 技术服务商资质证明添加
        /// </summary>
        /// <returns></returns>
        public int QualificationAdd(int Type)
        {
            //从redis中取出
            Facilitator_Qualification facilitator = RedisHelper.Get<Facilitator_Qualification>("fqualification");
            facilitator.Type = Type;
            facilitator.UnifiedSocial = _UnifiedSocial;
            facilitator.RegTime = DateTime.Now;
            var result = Convert.ToInt32(WebApiHelper.GetApiResult("post", "Jurisdiction", "QualificationAdd", facilitator));
            return result;
        }
        #endregion

        #region 方法
        /// <summary>
        /// 注册界面
        /// </summary>
        /// <returns></returns>
        public IActionResult Register() => View();

        /// <summary>
        /// 用户登录界面
        /// </summary>
        /// <returns></returns>
        public IActionResult Login() => View();

        /// <summary>
        /// 实现用户登录
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        public bool Login(User user)
        {
            var json = WebApiHelper.GetApiResult("post", "Jurisdiction", "Login", user);
            var userinfo = JsonConvert.DeserializeObject<UserInfo>(json);
            if (userinfo != null)
            {
                RedisHelper.Set<UserInfo>("userinfo", userinfo);
                //构造ClaimsIdentity 对象
                var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
                //创建 Claim 类型,传入 ClaimsIdentity 中
                identity.AddClaim(new Claim("key", userinfo.UserName));

                //创建ClaimsPrincipal对象,传入ClaimsIdentity 对象,调用HttpContext.SignInAsync完成登录
                HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

                //存储redis
                RedisHelper.Set<UserInfo>(userinfo.UserName, userinfo);
                return true;
            }
            return false;
        }

        /// <summary>
        /// 退出
        /// </summary>
        public IActionResult Logout()
        {
            HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction(nameof(MainController.Login), "main");
        }

        /// <summary>
        /// 服务条款
        /// </summary>
        /// <returns></returns>
        public IActionResult TOS() => View();
        #endregion

        #region Enum转list<selectlistitem>
        /// <summary>
        /// 获取省份
        /// </summary>
        /// <returns></returns>
        public void GetProvince()
        {
            var selectlistitem = ToSelectList(typeof(Province));
            ViewBag.province = selectlistitem;
        }

        /// <summary>
        /// 根据枚举生成下拉列表的数据源
        /// </summary>
        /// <param name="enumType">枚举类型</param>
        /// <param name="firstText">第一行文本(一般用于查询。例如：全部/请选择)</param>
        /// <param name="firstValue">第一行值(一般用于查询。例如：全部/请选择的值)</param>
        /// <returns></returns>
        public static IList<SelectListItem> ToSelectList(Type enumType
            , string firstText = "请选择"
            , string firstValue = "-1")
        {
            IList<SelectListItem> listItem = new List<SelectListItem>();

            if (enumType.IsEnum)
            {
                AddFirst(listItem, firstText, firstValue);

                Array values = Enum.GetValues(enumType);
                if (null != values && values.Length > 0)
                {
                    foreach (int item in values)
                    {
                        listItem.Add(new SelectListItem { Value = item.ToString(), Text = Enum.GetName(enumType, item) });
                    }
                }
            }
            else
            {
                throw new ArgumentException("请传入正确的枚举！");
            }
            return listItem;
        }

        /// <summary>
        /// 添加第一行元素
        /// </summary>
        /// <param name="listItem"></param>
        /// <param name="firstText"></param>
        /// <param name="firstValue"></param>
        static void AddFirst(IList<SelectListItem> listItem, string firstText, string firstValue)
        {
            if (!string.IsNullOrWhiteSpace(firstText))
            {
                if (string.IsNullOrWhiteSpace(firstValue))
                    firstValue = "-1";
                listItem.Add(new SelectListItem { Text = firstText, Value = firstValue });
            }
        }
        #endregion
    }
}