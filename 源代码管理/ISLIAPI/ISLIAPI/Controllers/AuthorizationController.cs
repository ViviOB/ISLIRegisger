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
    [Route("api/[controller]")]
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
    }
}