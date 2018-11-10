using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
    public class DataTable<T>
    {
        /// <summary>
        /// 总条数
        /// </summary>
        public int counts { get; set; }

        /// <summary>
        /// 要显示的集合
        /// </summary>
        public List<T> list { get; set; }
    }
}
