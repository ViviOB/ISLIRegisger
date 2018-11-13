using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ISLIClient.Controllers
{
    public class AuthorizationServiceController : Controller
    {
        /// <summary>
        /// 服务商授权
        /// </summary>
        /// <returns></returns>
        public IActionResult AuthorizationService()
        {
            return View();
        }
    }
}