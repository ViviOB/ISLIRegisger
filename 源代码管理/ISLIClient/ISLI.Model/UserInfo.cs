using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
   public class UserInfo:User
    {
        /// <summary>
        /// 用户类型名称
        /// </summary>
        public string UserTypeName { get; set; }

        /// <summary>
        /// 权限集合
        /// </summary>
        public List<Authority> AuthList { get; set; }
    }
}
