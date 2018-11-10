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

namespace ISLIClient.Controllers
{
    public class MainController : Controller
    {
        #region 主页面

        /// <summary>
        /// 菜单导航
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 主页
        /// </summary>
        /// <returns></returns>
        public IActionResult Main()
        {
            return View();
        }

        /// <summary>
        /// 左菜单
        /// </summary>
        /// <returns></returns>
        public IActionResult Left()
        {
            //获取用户菜单
            ViewBag.LoginInfo = RedisHelper.Get<UserInfo>("userinfo");
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

        public IActionResult PublishingAdd()
        {
            GetProvince();
            return View();
        }

        [HttpPost]
        public IActionResult PublishingAdd(Publisher_Certificate pcertificate)
        {
            GetProvince();
            return View();
        }

        #endregion

        /// <summary>
        /// 注册界面
        /// </summary>
        /// <returns></returns>
        public IActionResult Register()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        /// <summary>
        /// 用户登录
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
                return true;
            }
            return false;
        }

        /// <summary>
        /// 退出
        /// </summary>
        public void SignOut()
        {
            RedisHelper.Remove("userinfo");
            Response.Redirect("/main/login");
        }

        /// <summary>
        /// 获取省份
        /// </summary>
        /// <returns></returns>
        public void GetProvince()
        {
            var selectlistitem = ToSelectList(typeof(Province));
            ViewBag.province = selectlistitem;
        }


        #region Enum转list<selectlistitem>
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