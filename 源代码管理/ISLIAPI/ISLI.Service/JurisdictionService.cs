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
        public UserInfo Login(User user)
        {
            UserInfo user1 =db.Queryable<User>().Where(u => u.UserName == user.UserName && u.UserPwd == user.UserPwd).Select(a=>new UserInfo { Id=a.Id,IsEnabled=a.IsEnabled,UserInfoId=a.UserInfoId,UserName=a.UserName,UserPwd=a.UserPwd,UserTypeId=a.UserTypeId}).Single();

            //获取用户权限
            user1.AuthList = db.Queryable<Role_Authority, Authority>((ra, a) => ra.AuthId == a.Id)
                .Where(ra=>ra.RoleId==user.UserTypeId).Select((ra, a) => new Authority { Id = a.Id, AuthName = a.AuthName, AuthUrl = a.AuthUrl, ParentId = a.ParentId }).ToList();
            return user1;
        }
    }
}
