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
            throw new NotImplementedException();
        }
    }
}
