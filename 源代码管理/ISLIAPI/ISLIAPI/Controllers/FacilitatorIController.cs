using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ISLI.IService;
using ISLI.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ISLIAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class FacilitatorController : ControllerBase
    {
        private readonly IFacilitator _facilitator;


        public FacilitatorController(IFacilitator facilitator)
        {
            _facilitator = facilitator;
        }

        /// <summary>
        /// 显示所有
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Adhibition> GetList()
        {
            var list = _facilitator.AdhibitionList();
            return list;
        }

        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="pageParams"></param>
        /// <returns></returns>
        [HttpPost]
        public PageResult<Adhibition> GetPagedList(PageParams pageParams)
        {
            var result = _facilitator.GetPagedList(pageParams);
            return result;
        }

    }
}