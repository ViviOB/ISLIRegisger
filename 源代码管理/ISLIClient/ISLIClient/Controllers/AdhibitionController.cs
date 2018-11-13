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
    public class AdhibitionController : Controller
    {
        /// <summary>
        /// 关联信息回填
        /// </summary>
        /// <returns></returns>
        public IActionResult Adhibition()
        {
            return View();
        }
        /// <summary>
        /// 接收从API返回的数据，用来显示
        /// </summary>
        /// <returns></returns>
        /// <summary>
        /// 接收从API返回的数据，用来显示
        /// </summary>
        /// <returns></returns>
        public string GetList(PageParams pageParams, string isliCode, string sourceName, string allocationTime)
        {
            string wherestr = "1=1";
            if (!string.IsNullOrEmpty(isliCode))
            {
                wherestr += " and islicode like '%" + isliCode + "%' ";
            }
            if (!string.IsNullOrEmpty(sourceName))
            {
                wherestr += " and sourceName like '%" + sourceName + "%' ";
            }
            if (!string.IsNullOrEmpty(allocationTime))
            {
                wherestr += " and allocationTime = " + allocationTime;
            }
            pageParams.StrWhere = wherestr;
            var result = WebApiHelper.GetApiResult("post", "Facilitator", "GetPagedList", pageParams);
            return result;
        }

        /// <summary>
        ///查看 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IActionResult LookInfo(int id)
        {
            var list = JsonConvert.DeserializeObject<List<Adhibition>>(WebApiHelper.GetApiResult("get", "Facilitator", "GetList", null));
            Adhibition adhibition = list.Find(m => m.Id == id);
            return View(adhibition);
        }


        public IActionResult AddAdhibition()
        {
            return View();
        }
    }
}