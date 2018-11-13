using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
   public class Facilitator
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 申请人姓名
        /// </summary>
        public string ApplicantName { get; set; }

        /// <summary>
        /// 服务商类型
        /// </summary>
        public string ServiceType { get; set; }

        /// <summary>
        /// 申请人邮箱
        /// </summary>
        public string ApplicantEmail { get; set; }

        /// <summary>
        /// 申请人联系电话
        /// </summary>
        public string ContactNumber { get; set; }

        /// <summary>
        /// 申请人联系手机
        /// </summary>
        public int CellPhone { get; set; }

        /// <summary>
        /// 企业名称
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// 注册地址
        /// </summary>
        public string RegistrationAddres { get; set; }

        /// <summary>
        /// 注册地址邮箱
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// 注册地址邮编
        /// </summary>
        public int Postcode { get; set; }

        /// <summary>
        /// 注册地行政区代码
        /// </summary>
        public int RegistrationCode { get; set; }

        /// <summary>
        /// 法人代表姓名
        /// </summary>
        public string RepresentativeName { get; set; }

        /// <summary>
        /// 联系人姓名
        /// </summary>
        public string ContactName { get; set; }

        /// <summary>
        /// 联系人电话
        /// </summary>
        public string ContactPhone { get; set; }

        /// <summary>
        /// 联系人邮箱
        /// </summary>
        public string ContactEmail { get; set; }

        /// <summary>
        /// 企业资质证明
        /// </summary>
        public int QualificationId { get; set; }

        /// <summary>
        /// 统一社会信用代码
        /// </summary>
        public string CreditCode { get; set; }

        /// <summary>
        /// 用户Id
        /// </summary>
        public int UserId { get; set; }
    }
}
