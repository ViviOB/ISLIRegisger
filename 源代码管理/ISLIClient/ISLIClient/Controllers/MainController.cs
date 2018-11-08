using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using ISLI.Unility;
using ISLI.Cache;
using ISLI.Model;
using Newtonsoft.Json;

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
    }
}