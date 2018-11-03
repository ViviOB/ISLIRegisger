using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ISLIClient.Models;

using ISLI.Unility;
using ISLI.Cache;
using ISLI.Model;
using Microsoft.Extensions.Caching.Distributed;

namespace ISLIClient.Controllers
{
    public class HomeController : Controller
    {


        public IActionResult Index()
        {
            var userlist = HttpUtils.HttpGet("https://localhost:44326/api/values/getuserlist", null);
            RedisHelper.Set("user", userlist);
            var userlist2 = RedisHelper.Get("user");
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
