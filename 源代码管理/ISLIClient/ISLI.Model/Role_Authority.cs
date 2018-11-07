using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
   public class Role_Authority
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 角色id
        /// </summary>
        public int RoleId { get; set; }

        /// <summary>
        /// 权限id
        /// </summary>
        public int AuthId { get; set; }
    }
}
