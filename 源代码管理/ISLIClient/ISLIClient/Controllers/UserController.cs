using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ISLI.Cache;
using ISLI.Model;
using ISLI.Unility;
using Newtonsoft.Json;

namespace ISLIClient.Controllers
{
    public class UserController : Controller
    {
        /// <summary>
        /// 修改密码
        /// </summary>
        /// <returns></returns>
        public IActionResult UpdatePwd()
        {
            ViewBag.UserInfo = RedisHelper.Get<UserInfo>("userinfo");
            return View();
        }

        /// <summary>
        /// 传递数据，返回i
        /// </summary>
        /// <param name="newpwd"></param>
        /// <returns></returns>
        [HttpPost]
        public int UpdatePwd(string newpwd)
        {
            User user = new User()
            {
                Id = RedisHelper.Get<UserInfo>("userinfo").Id,
                UserPwd = newpwd
            };
            int i = Convert.ToInt32(WebApiHelper.GetApiResult("post", "UserInfo", "UpdateUserPwd", user));
            return i;

        }

        /// <summary>
        /// 显示用户详情信息
        /// </summary>
        /// <returns></returns>
        public string UserInfo()
        {
            Facilitator facilitator = new Facilitator();
             //int id= RedisHelper.Get<UserInfo>("userinfo").UserInfoId;
            var list = JsonConvert.DeserializeObject<List<Facilitator>>(WebApiHelper.GetApiResult("get", "UserInfo", "GetList", null)).Find(m => m.Id == 1);
            var info = JsonConvert.SerializeObject(list);
            return info;
        }

        /// <summary>
        /// 修改用户详情信息
        /// </summary>
        /// <returns></returns>
        public IActionResult UptUserInfo()
        {
            return View();
        }

        /// <summary>
        /// 传递数据，进行修改
        /// </summary>
        /// <param name="facilitator"></param>
        /// <returns></returns>
        [HttpPost]
        public int UptUserInfo(Facilitator facilitator)
        {
            int i = Convert.ToInt32(WebApiHelper.GetApiResult("post", "UserInfo", "UpdateFacilitator", facilitator));
            return i;
        }
    }
}