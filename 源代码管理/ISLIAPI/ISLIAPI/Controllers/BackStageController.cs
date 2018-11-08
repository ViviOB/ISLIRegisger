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
    public class AuthorizeController : ControllerBase
    {
        /// <summary>
        /// 构造函数注入
        /// </summary>
        private readonly IAuthorize _authorize;
        public AuthorizeController(IAuthorize authorize)
        {
            _authorize = authorize;
        }
    }
}