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
            //实例化用户对象
            UserInfo user1 = new UserInfo();
            try
            {
                if (user.UserTypeId == 1)
                {
                    user1 = db.Queryable<User, Publisher>((u, p) => u.UserInfoId == p.PId).Where(u => u.UserName == user.UserName && u.UserPwd == user.UserPwd && u.IsEnabled == 1 && u.SubmissionState == 2 && u.UserTypeId == user.UserTypeId).Select<UserInfo>().Single();
                }
                else if (user.UserTypeId == 2)
                {
                    user1 = db.Queryable<User, Facilitator>((u, f) => u.UserInfoId == f.Id).Where(u => u.UserName == user.UserName && u.UserPwd == user.UserPwd && u.IsEnabled == 1 && u.SubmissionState == 2 && u.UserTypeId == user.UserTypeId).Select<UserInfo>().Single();
                }
                else
                {
                    user1 = db.Queryable<User>().Where(u => u.UserName == user.UserName && u.UserPwd == user.UserPwd && u.IsEnabled == 1 && u.SubmissionState == 2 && u.UserTypeId == user.UserTypeId).Select<UserInfo>().Single();
                }
                //获取用户权限
                user1.AuthList = db.Queryable<Role_Authority, Authority>((ra, a) => ra.AuthId == a.Id)
                    .Where(ra => ra.RoleId == user.UserTypeId).Select((ra, a) => new Authority { Id = a.Id, AuthName = a.AuthName, AuthUrl = a.AuthUrl, ParentId = a.ParentId }).ToList();
            }
            catch (Exception)
            {
                user1 = null;
            }
            return user1;
        }
    }
}
