using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
    public class Authorize
    {
        /// <summary>
        /// 授权表
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// ISLI编码段
        /// </summary>
        public string ISLICode { get; set; }

        /// <summary>
        /// 服务商代码
        /// </summary>
        public string ProviderCode { get; set; }

        /// <summary>
        /// 出版单位名称
        /// </summary>
        public string EntityChinese { get; set; }

        /// <summary>
        /// 授权时间
        /// </summary>
        public DateTime AuthorizaionDate { get; set; }

        /// <summary>
        /// 授权状态
        /// </summary>
        public int AuthorizationState { get; set; }

        /// <summary>
        /// 服务商名称
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// 服务商类型
        /// </summary>
        public string ApplicantName { get; set; }

        /// <summary>
        /// 服务字段码
        /// </summary>
        public string ServiceField { get; set; }

        /// <summary>
        /// 产品编码
        /// </summary>
        public string ProductCode { get; set; }

        /// <summary>
        /// 关联位置编码码段A
        /// </summary>
        public string PositionCodeA { get; set; }

        /// <summary>
        /// 关联位置编码码段B
        /// </summary>
        public string PositionCodeB { get; set; }

        /// <summary>
        /// 注册商
        /// </summary>
        public int Publisher { get; set; }

        /// <summary>
        /// 服务商
        /// </summary>
        public int Qualification { get; set; }
    }
}
