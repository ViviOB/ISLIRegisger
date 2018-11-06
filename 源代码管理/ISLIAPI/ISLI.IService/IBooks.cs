using System;

using System.Collections.Generic;
using ISLI.Model;
namespace ISLI.IService
{
    public interface IBooks
    {
        /// <summary>
        /// 添加图书，ISLI编码
        /// </summary>
        int Add { get; set; }

        /// <summary>
        /// 修改图书，ISLI编码
        /// </summary>
        int Update { get; set; }

        /// <summary>
        /// 显示图书，ISLI编码
        /// </summary>
        List<Books> BooksList { get; set; }
    }
}
