using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using ISLI.IService;
using ISLI.Model;

namespace ISLIAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BackStageController : ControllerBase
    {
        /// <summary>
        /// 构造函数注入
        /// </summary>
        private readonly IPublishApply _publishApply;

        private readonly IBooks _books;
        public BackStageController(IPublishApply publishApply)
        {
            _publishApply = publishApply;
        }

        public BackStageController(IBooks books)
        {
            _books = books;
        }
        #region ///出版单位管理
        /// <summary>
        /// 获取获取出版单位申请
        /// </summary>
        /// <returns></returns>
        public List<PublishApply> GetPublishApplysList()
        {
            return _publishApply.GetPublishApplysList();
        }

        /// <summary>
        /// 根据ID获取对象
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public PublishApply UpdateById(int id)
        {
            return _publishApply.UpdateById(id);
        }

        /// <summary>
        /// 分页方法
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="totalCount"></param>
        /// <returns></returns>
        public List<PublishApply> Paging(int pageIndex = 1, int pageSize = 2, int totalCount = 0)
        {
            return _publishApply.Paging(pageIndex, pageSize, totalCount);
        }

        /// <summary>
        /// 修改提交状态(成功)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut]
        public int UpdateSbumissionStateToPass(PublishApply publishApply)
        {
            return _publishApply.UpdateSbumissionStateToPass(publishApply);
        }

        /// <summary>
        /// 修改提交状态(拒绝)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut]
        public int UpdateSbumissionStateToDeny(PublishApply publishApply)
        {
            return _publishApply.UpdateSbumissionStateToDeny(publishApply);
        }

        /// <summary>
        /// 修改用户启用状态
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpPut]
        public int UpdateEnableState(PublishApply publishApply)
        {
            return _publishApply.UpdateEnableState(publishApply);
        }
        #endregion

        #region ///服务商管理

        #endregion

        #region ///MPR编码审核管理

        /// <summary>
        /// 分页方法显示
        /// </summary>
        /// <param name="page"></param>
        /// <returns></returns>
        [HttpPost]
        public DataTable<Books> GetList(Page page)
        {
            return _books.BooksList(page);
        }
        #endregion
    }
}