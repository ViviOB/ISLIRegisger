using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using ISLI.Unility;
using ISLI.Cache;
using ISLI.Model;

namespace ISLIClient.Controllers
{
    public class MainController : Controller
    {
        public IActionResult Index()
        {
            //获取用户菜单
            ViewBag.MenuList = RedisHelper.Get<List<Authority>>("authority");
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        public IActionResult Login(User user)
        {
            var user1 = WebApiHelper.GetApiResult("post", "Jurisdiction", "Login", user);
            return View();
        }
    }
}