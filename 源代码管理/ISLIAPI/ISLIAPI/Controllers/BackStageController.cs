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
        public BackStageController(IPublishApply publishApply)
        {
            _publishApply = publishApply;
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
        #endregion


        #region ///服务商管理

        #endregion

        #region ///ISLI编码申请管理
        #endregion
    }
}