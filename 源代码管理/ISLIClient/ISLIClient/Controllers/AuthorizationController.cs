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
            string json = WebApiHelper.GetApiResult("post", "BackStage", "GetPublishApplysList", null);
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

        /// <summary>
        /// 修改提交状态（通过）
        /// </summary>
        /// <param name="id"></param>
        public int UpdateSbumissionStateToPass(int id)
        {
            //获取到实体类
            var json = WebApiHelper.GetApiResult("get", "BackStage", "UpdateById?id=" + id, null);
            var publishapply = JsonConvert.DeserializeObject<PublishApply>(json);
            var json2 = WebApiHelper.GetApiResult("put", "BackStage", "UpdateSbumissionStateToPass", publishapply);
            int i = int.Parse(json2);
            return i;
        }

        /// <summary>
        /// 修改提交状态（拒绝）
        /// </summary>
        /// <param name="id"></param>
        public int UpdateSbumissionStateToDeny(int id)
        {
            //获取到实体类
            var json = WebApiHelper.GetApiResult("get", "BackStage", "UpdateById?id=" + id, null);
            var publishapply = JsonConvert.DeserializeObject<PublishApply>(json);
            var json2 = WebApiHelper.GetApiResult("put", "BackStage", "UpdateSbumissionStateToDeny", publishapply);
            int i = int.Parse(json2);
            return i;
        }
        #endregion

        #region ///出版单位账号管理

        public ActionResult AccountManage()
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
        public ActionResult AccountUpdateById(int id)
        {
            string json = WebApiHelper.GetApiResult("get", "BackStage", "UpdateById?id=" + id, null);
            var publishapply = JsonConvert.DeserializeObject<PublishApply>(json);
            return View(publishapply);
        }

        /// <summary>
        /// 修改状态
        /// </summary>
        /// <param name="id"></param>
        public int UpdateState(int id)
        {
            //获取到实体类
            var json = WebApiHelper.GetApiResult("get", "BackStage", "UpdateById?id=" + id, null);
            var publishapply = JsonConvert.DeserializeObject<PublishApply>(json);
            var json2 = WebApiHelper.GetApiResult("put", "BackStage", "UpdateEnableState", publishapply);
            int i = int.Parse(json2);
            return i;
        }
        #endregion

        #region ///MPR编码审核管理

        /// <summary>
        /// 首页
        /// </summary>
        /// <returns></returns>
        public ActionResult BooksIndex()
        {
            Page page = new Page();
            page.pageindex = 1;
            page.pagesize = 3;
            page.name = "";
            page.counts = 0;
            var json = WebApiHelper.GetApiResult("post", "Books", "GetList", page);
            var data = JsonConvert.DeserializeObject<DataTable<Books>>(json);
            var list = data.list;
            return View(list);
        }

        /// <summary>
        /// 根据ID查看详情
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult BooksUpdateById(int id)
        {
            string json = WebApiHelper.GetApiResult("get", "BackStage", "BooksUpdateById?id=" + id, null);
            var books = JsonConvert.DeserializeObject<Books>(json);
            return View(books);
        }

        /// <summary>
        /// 修改提交状态（通过）
        /// </summary>
        /// <param name="id"></param>
        public int UpdateBooksSbumissionStateToPass(int id)
        {
            //获取到实体类
            var json = WebApiHelper.GetApiResult("get", "BackStage", "BooksUpdateById?id=" + id, null);
            var books = JsonConvert.DeserializeObject<Books>(json);
            var json2 = WebApiHelper.GetApiResult("put", "BackStage", "UpdateBooksSbumissionStateToPass", books);
            int i = int.Parse(json2);
            return i;
        }

        /// <summary>
        /// 修改提交状态（拒绝）
        /// </summary>
        /// <param name="id"></param>
        public int UpdateBooksSbumissionStateToDeny(int id)
        {
            //获取到实体类
            var json = WebApiHelper.GetApiResult("get", "BackStage", "BooksUpdateById?id=" + id, null);
            var books = JsonConvert.DeserializeObject<Books>(json);
            var json2 = WebApiHelper.GetApiResult("put", "BackStage", "UpdateBooksSbumissionStateToDeny", books);
            int i = int.Parse(json2);
            return i;
        }
        #endregion
    }
}