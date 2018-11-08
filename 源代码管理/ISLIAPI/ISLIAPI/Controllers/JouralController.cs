using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using ISLI.Model;
using ISLI.IService;
using ISLI.Service;
namespace ISLIAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JouralController : ControllerBase
    {
        private readonly Ijoural _joural;
        public  JouralController(Ijoural joural)
        {
            _joural = joural;
        }

        /// <summary>
        /// 期刊申请
        /// </summary>
        /// <param name="joural"></param>
        /// <returns></returns>
        [HttpPost]
        public int AddJoural(JouralApply joural)
        {
            int i = _joural.AddJoural(joural);
            return i;
        }

        /// <summary>
        /// 修改期刊
        /// </summary>
        /// <param name="joural"></param>
        /// <returns></returns>
        [HttpPut]
        public int UpdateJoural(JouralApply joural)
        {
            int i = _joural.UpdateJoural(joural);
            return i;
        }

        /// <summary>
        /// 显示所有
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<JouralApply> GetJourals()
        {
            var list = _joural.GetJourals();
            return list;
        }
    }
}