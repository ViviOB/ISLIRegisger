using System;
using System.Collections.Generic;
using System.Text;


namespace ISLI.Model
{
    public class PageParams
    {
        public PageParams()
        {
            PageIndex = 1;
            PageSize = 5;
            StrWhere = "";
        }
        /// <summary>
        /// 当前页码
        /// </summary>
        public int PageIndex { get; set; }
        /// <summary>
        /// 每页显示条数
        /// </summary>
        public int PageSize { get; set; }
        /// <summary>
        /// 查询条件
        /// </summary>
        public string StrWhere { get; set; }
    }
}
