using System;
using System.Collections.Generic;
using System.Text;

using ISLI.IService;
using ISLI.Model;
using ISLI.Unility;
using SqlSugar;

namespace ISLI.Service
{
    /// <summary>
    /// 权限层
    /// </summary>
    public class JurisdictionService : IJurisdiction
    {
        /// <summary>
        /// 初始化sqlSugar对象
        /// </summary>
        SqlSugarClient db = BaseDB.GetClient();

        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public User Login(User user)
        {
            UserInfo user1 =(UserInfo)db.Queryable<User>().Single(u => u.UserName == user.UserName && u.UserPwd == user.UserPwd);
            user1.AuthList = db.Queryable<Role_Authority, Authority>((ra, a) => ra.AuthId == a.Id).Where((a)=>a.RoleId==user.UserTypeId).Select((ra, a) => new Authority { Id = a.Id, AuthName = a.AuthName, AuthUrl = a.AuthUrl, ParentId = a.ParentId }).ToList();
            return user1;
        }
    }
}
