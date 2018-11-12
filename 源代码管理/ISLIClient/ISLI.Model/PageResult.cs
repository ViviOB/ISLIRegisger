using System;
using System.Collections.Generic;
using System.Text;


namespace ISLI.Model
{
    public class PageResult<T> where T : class, new()
    {
        /// <summary>
        /// 总条数
        /// </summary>
        public int TotalCount { get; set; }
        /// <summary>
        /// 总页数
        /// </summary>
        public int TotalPage { get; set; }
        /// <summary>
        /// 数据集合
        /// </summary>
        public List<T> DataList { get; set; }
    }
}
