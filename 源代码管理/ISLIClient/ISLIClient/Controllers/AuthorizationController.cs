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

        /// <summary>
        /// 分页方法
        /// </summary>
        /// <returns></returns>
        public List<PublishApply> Paging()
        {
            string json = WebApiHelper.GetApiResult("get", "BackStage", "Paging", null);
            var paging = JsonConvert.DeserializeObject<List<PublishApply>>(json);
            return paging;
        }

        public ActionResult Index()
        {
            string json = WebApiHelper.GetApiResult("get", "BackStage", "GetPublishApplysList", null);
            var list = JsonConvert.DeserializeObject<List<PublishApply>>(json);
            return View(list);
        }
      
    }
}