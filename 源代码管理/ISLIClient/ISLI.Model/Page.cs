using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
    public class Page
    {
        /// <summary>
        /// 当前页
        /// </summary>
        public int pageindex { get; set; }

        /// <summary>
        /// 每页多少条数据
        /// </summary>
        public int pagesize { get; set; }

        /// <summary>
        /// 查询条件
        /// </summary>
        public string name { get; set; }

        /// <summary>
        /// 总条数
        /// </summary>
        public int counts { get; set; }
    }
}
