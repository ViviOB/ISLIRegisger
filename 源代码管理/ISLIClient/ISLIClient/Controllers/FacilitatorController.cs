using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ISLI.Model;
using ISLI.Unility;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ISLIClient.Controllers
{
    public class FacilitatorController : Controller
    {
        /// <summary>
        /// 显示回填信息
        /// </summary>
        /// <returns></returns>
        public IActionResult FacilitatorIndex()
        {
            return View();
        }

        public string GetList()
        {
            var list = WebApiHelper.GetApiResult("get", "Facilitator", "GetList", null);
            return list;
        }
    }
}