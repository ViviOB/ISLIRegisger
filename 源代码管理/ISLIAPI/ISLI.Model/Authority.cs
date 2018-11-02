using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
   public class Authority
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 权限名称
        /// </summary>
        public string AuthName { get; set; }

        /// <summary>
        /// 权限路径
        /// </summary>
        public string AuthUrl { get; set; }

        /// <summary>
        /// 权限父id
        /// </summary>
        public string ParentId { get; set; }
    }
}
