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
                wherestr += " and CompanyName like '%" + sourceName + "%' ";
            }
            if (!string.IsNullOrEmpty(allocationTime))
            {
                wherestr += " and allocationTime = " + allocationTime;
            }
            pageParams.StrWhere = wherestr;
            var result = WebApiHelper.GetApiResult("post", "Authorization", "GetPagedList", pageParams);
            return result;
        }


        #region/// 新增授权
        public IActionResult ApplyAuthorize()
        {
            return View();
        }

        [HttpPost]
        public int ApplyAuthorize(Authorize authorize)
        {
            authorize.AuthorizaionDate = DateTime.Now;
            var i = WebApiHelper.GetApiResult("post", "Authorization", "AddAuthorize", authorize);
            return Convert.ToInt32(i);
        }

        /// <summary>
        /// 绑定下拉
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<UserInfo> GetUsers()
        {
            var list = WebApiHelper.GetApiResult("get", "UserInfo", "GetUsersItem", null);
            return JsonConvert.DeserializeObject<List<UserInfo>>(list);
        }
        #endregion
    }
}