using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
    public class JouralApply
    {
        /// <summary>
        /// 期刊申请
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 期刊名
        /// </summary>
        public string Periodical { get; set; }

        /// <summary>
        /// ISSN编码
        /// </summary>
        public string ISSN { get; set; }

        /// <summary>
        /// CN编码
        /// </summary>
        public string CN { get; set; }

        /// <summary>
        /// 期刊语言
        /// </summary>
        public string Language { get; set; }

        /// <summary>
        /// 主办单位
        /// </summary>
        public string HostUnit { get; set; }

        /// <summary>
        /// 出版地
        /// </summary>
        public string PublishPlace { get; set; }

        /// <summary>
        /// 主管单位
        /// </summary>
        public string ChargeUnit { get; set; }

        /// <summary>
        /// 刊期
        /// </summary>
        public string Frequency { get; set; }

        /// <summary>
        /// 发行日期
        /// </summary>
        public DateTime PublishDate { get; set; }

        /// <summary>
        /// 页数
        /// </summary>
        public string PageCount { get; set; }

        /// <summary>
        /// 创刊年
        /// </summary>
        public string CreateDate { get; set; }

        /// <summary>
        /// 停刊年
        /// </summary>
        public string StopDate { get; set; }

        /// <summary>
        /// 出版物类型 
        /// </summary>
        public string PublishType { get; set; }

        /// <summary>
        /// 分类号
        /// </summary>
        public string TypeCode { get; set; }

        /// <summary>
        /// 定价
        /// </summary>
        public int Price { get; set; }

        /// <summary>
        /// 目标资源类型
        /// </summary>
        public string TargetResouce { get; set; }

        /// <summary>
        /// 服务商代码
        /// </summary>
        public string ServiceCode { get; set; }

      
    }
}
