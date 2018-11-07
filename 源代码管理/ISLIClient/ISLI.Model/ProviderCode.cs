using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
    public class ProviderCode
    {
        /// <summary>
        /// 服务商代码表
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 服务商Id
        /// </summary>
        public int FacilitatorId { get; set; }

        /// <summary>
        /// 服务商代码
        /// </summary>
        public string FacilitatorCode { get; set; }
    }
}
