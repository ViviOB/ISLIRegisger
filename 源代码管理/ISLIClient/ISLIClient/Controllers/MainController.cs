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
        public IActionResult Index()
        {
            //获取用户菜单
            ViewBag.LoginInfo = RedisHelper.Get<UserInfo>("userinfo");
            return View();
        }

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
    }
}