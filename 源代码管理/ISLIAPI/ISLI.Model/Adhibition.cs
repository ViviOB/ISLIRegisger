using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
   public class Adhibition
    {
        /// <summary>
        /// 编号
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// ISLI编码
        /// </summary>
        public string ISLICode { get; set; }

        /// <summary>
        /// 源名称
        /// </summary>
        public string SourceName { get; set; }

        /// <summary>
        /// 目标名称
        /// </summary>
        public string SourceFragment { get; set; }

        /// <summary>
        /// 分配时间
        /// </summary>
        public string AllocationTime { get; set; }

        /// <summary>
        /// 类型表Id
        /// </summary>
        public int TargetId { get; set; }
    }
}
