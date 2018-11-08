using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
   public class Publisher
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int PId { get; set; }

        /// <summary>
        /// 申请人姓名
        /// </summary>
        public string ApplicantName { get; set; }

        /// <summary>
        /// 申请人邮箱
        /// </summary>
        public string ApplicantEmail { get; set; }

        /// <summary>
        /// 联系电话（办公）
        /// </summary>
        public string OfficeTel { get; set; }

        /// <summary>
        /// 联系电话（手机）
        /// </summary>
        public string MovTel { get; set; }

        /// <summary>
        /// 出版单位省份
        /// </summary>
        public int BaseId { get; set; }

        /// <summary>
        /// 出版单位归属
        /// </summary>
        public string PublishingEntity { get; set; }

        /// <summary>
        /// 出版单位名称中文
        /// </summary>
        public string PublisheChinese { get; set; }

        /// <summary>
        /// 出版单位名称英文
        /// </summary>
        public string PublisherEnglish { get; set; }

        /// <summary>
        /// 统一社会信用代码
        /// </summary>
        public string CreditCode { get; set; }

        /// <summary>
        /// 出版物资质
        /// </summary>
        public string Publication { get; set; }

        /// <summary>
        /// 出版范围
        /// </summary>
        public string ScopePublicati { get; set; }

        /// <summary>
        /// 通讯地址
        /// </summary>
        public string MailingAddress { get; set; }

        /// <summary>
        /// 邮编
        /// </summary>
        public int Postcode { get; set; }

        /// <summary>
        /// 出版单位网址
        /// </summary>
        public string PublisherWebsit { get; set; }

        /// <summary>
        /// 主办单位
        /// </summary>
        public string Sponsor { get; set; }

        /// <summary>
        /// 主管单位
        /// </summary>
        public string GoverningBody { get; set; }

        /// <summary>
        /// 法人代表姓名
        /// </summary>
        public string RepresentativeName { get; set; }

        /// <summary>
        /// 法人代表电话
        /// </summary>
        public string RepresentativeTel { get; set; }

        /// <summary>
        /// 法人代表手机
        /// </summary>
        public string RepresentativePhon { get; set; }

        /// <summary>
        /// 法人代表职务
        /// </summary>
        public string RepresentativePost { get; set; }

        /// <summary>
        /// 法人代表传真
        /// </summary>
        public string RepresentativeFax { get; set; }

        /// <summary>
        /// 法人代表邮箱
        /// </summary>
        public string RepresentativeEmai { get; set; }

        /// <summary>
        /// 联系人姓名
        /// </summary>
        public string ContactName { get; set; }

        /// <summary>
        /// 联系人电话
        /// </summary>
        public string ContactTel { get; set; }

        /// <summary>
        /// 联系人手机
        /// </summary>
        public string ContactPhone { get; set; }

        /// <summary>
        /// 联系人职务
        /// </summary>
        public string ContactPerson { get; set; }

        /// <summary>
        /// 联系人传真
        /// </summary>
        public string ContactFax { get; set; }

        /// <summary>
        /// 联系人邮箱
        /// </summary>
        public string ContactEmail { get; set; }

        /// <summary>
        /// 企业资质证明
        /// </summary>
        public int CertificateId { get; set; }
        
    }
}
