using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using ISLI.Unility;
using Newtonsoft.Json;
using ISLI.Model;
namespace ISLIClient.Controllers
{
    public class AuthorizationController : Controller
    {
        public ActionResult Index()
        {
            string json = WebApiHelper.GetApiResult("get", "BackStage", "GetPublishApplysList", null);
            var list = JsonConvert.DeserializeObject<List<PublishApply>>(json);
            ViewBag.list = list;
            return View();
        }
      
    }
}