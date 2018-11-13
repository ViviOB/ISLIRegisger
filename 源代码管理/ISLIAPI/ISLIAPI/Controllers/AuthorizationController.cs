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
    public class AuthorizationController : ControllerBase
    {
        private readonly IAuthorization _authorization;


        public AuthorizationController(IAuthorization authorization)
        {
            _authorization = authorization;
        }

        /// <summary>
        /// 显示授权详情
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Authorize> GetList()
        {
            var list = _authorization.AuthorizeList();
            return list;
        }

        /// <summary>
        /// 提交授权
        /// </summary>
        /// <param name="authorize"></param>
        /// <returns></returns>
        [HttpPost]
        public int AddAuthorize(Authorize authorize)
        {
            var i = _authorization.AddAuthorize(authorize);
            return i;
        }
    }
}