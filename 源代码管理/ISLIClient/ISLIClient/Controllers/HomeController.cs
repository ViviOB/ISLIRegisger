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
            var list = WebApiHelper.GetApiResult("get", "values", "getuserlist");
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
