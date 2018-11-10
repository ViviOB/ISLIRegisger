using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
    public class Publisher_Certificate : Publisher
    {
        /// <summary>
        /// 类型
        /// </summary>
        public int Type { get; set; }

        /// <summary>
        /// 统一社会信用代码证
        /// </summary>
        public string UnifiedSocial { get; set; }

        /// <summary>
        /// 出版物资质
        /// </summary>
        public string PublicationQualif { get; set; }

        /// <summary>
        /// 出版物资质证明
        /// </summary>
        public string CertificatePublica { get; set; }

        /// <summary>
        /// 注册时间
        /// </summary>
        public DateTime RegTime { get; set; }

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

        /// <summary>
        /// 提交状态
        /// </summary>
        public int SubmissionState { get; set; }
    }
}
