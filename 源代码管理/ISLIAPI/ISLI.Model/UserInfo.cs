using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
   public class UserInfo:User
    {
        /// <summary>
        /// 出版社名称
        /// </summary>
        public string PublisheChinese { get; set; }

        /// <summary>
        /// 技术服务商名称
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// 权限集合
        /// </summary>
        public List<Authority> AuthList { get; set; }
    }
}
