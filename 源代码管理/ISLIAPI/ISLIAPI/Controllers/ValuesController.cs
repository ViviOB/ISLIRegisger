using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using ISLI.Model;
using SqlSugar;
using ISLI.Unility;

namespace ISLIAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        SqlSugarClient db = BaseDB.GetClient();

        /// <summary>
        /// get测试
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IEnumerable<User> GetUserList()
        {
            var userlist = db.Queryable<User>().ToList();
            return userlist;
        }

        /// <summary>
        /// post测试
        /// </summary>
        /// <param name="user"></param>
        [HttpPost]
        public void Login(User user)
        {
            var user1 = user;
        }
    }
}
