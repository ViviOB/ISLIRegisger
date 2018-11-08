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
    [Route("api/[controller]")]
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
    }
}