using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
   public class User_Role
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 用户id
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// 角色id
        /// </summary>
        public int RoleId { get; set; }
    }
}
