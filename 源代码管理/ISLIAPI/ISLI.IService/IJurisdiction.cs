using System;
using System.Collections.Generic;
using System.Text;

using ISLI.Model;

namespace ISLI.IService
{
    /// <summary>
    /// 权限层
    /// </summary>
    public interface IJurisdiction
    {
        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        User Login(User user);
    }
}
