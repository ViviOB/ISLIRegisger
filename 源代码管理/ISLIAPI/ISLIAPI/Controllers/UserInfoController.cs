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
    public class UserInfoController : ControllerBase
    {
        private readonly IUserInformation _userInformation;


        public UserInfoController(IUserInformation userInformation)
        {
            _userInformation = userInformation;
        }

        /// <summary>
        /// 显示账号详情信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Facilitator> GetList()
        {
            var list = _userInformation.FacilitatorList();
            return list;
        }

        /// <summary>
        /// 修改账号信息
        /// </summary>
        /// <param name="facilitator"></param>
        /// <returns></returns>
        [HttpPost]
        public int UpdateFacilitator(Facilitator facilitator)
        {
            var i = _userInformation.UpdateFacilitator(facilitator);
            return i;
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        public int UpdateUserPwd(User user)
        {
            var i = _userInformation.UpdateUserPwd(user);
            return i;
        }

    }
}