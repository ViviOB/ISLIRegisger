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
        public Publisher UpdateById(int id)
        {
            return _publishApply.UpdateById(id);
        }
        #endregion

        #region ///服务商管理

        #endregion

        #region ///ISLI编码申请管理
        #endregion
    }
}