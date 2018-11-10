using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
    public class Publisher_Certificate : Publisher
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int Id { get; set; }

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
    }
}
