using System;

namespace ISLI.Model
{
    public class User
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// 密码
        /// </summary>
        public string UserPwd { get; set; }

        /// <summary>
        /// 用户详情
        /// </summary>
        public int UserInfoId { get; set; }

        /// <summary>
        /// 用户类型
        /// </summary>
        public int UserTypeId { get; set; }

        /// <summary>
        /// 是否启用
        /// </summary>
        public int IsEnabled { get; set; }
    }
}
