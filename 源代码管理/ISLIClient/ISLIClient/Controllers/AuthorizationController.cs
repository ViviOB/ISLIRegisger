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

        #region ///出版单位申请管理
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

        /// <summary>
        /// 出版单位申请管理页面
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {

            string json = WebApiHelper.GetApiResult("get", "BackStage", "GetPublishApplysList", null);
            var list = JsonConvert.DeserializeObject<List<PublishApply>>(json);
            return View(list);
        }

        /// <summary>
        /// 根据ID查看详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult UpdateById(int id)
        {
            string json = WebApiHelper.GetApiResult("get", "BackStage", "UpdateById?id=" + id, null);
            var publishapply = JsonConvert.DeserializeObject<PublishApply>(json);
            return View(publishapply);
        }
        #endregion

        #region ///出版单位账号管理
        public ActionResult AccountManage()
        {
            return View();
        }
        #endregion
    }
}