using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using ISLI.Model;
using ISLI.IService;
using Microsoft.AspNetCore.Cors;

namespace ISLIAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors("CorsConfig")]
    [ApiController]
    public class JurisdictionController : ControllerBase
    {
        /// <summary>
        /// 权限层
        /// </summary>
        private readonly IJurisdiction _jurisdiction;

        /// <summary>
        /// 构造函数注入
        /// </summary>
        /// <param name="jurisdiction"></param>
        public JurisdictionController(IJurisdiction jurisdiction)
        {
            _jurisdiction = jurisdiction;
        }

        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        public UserInfo Login(User user)
        {
            return  _jurisdiction.Login(user);
        }
    }
}