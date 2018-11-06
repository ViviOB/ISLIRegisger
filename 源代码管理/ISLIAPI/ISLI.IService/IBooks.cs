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
        int Add(Books books);

        /// <summary>
        /// 修改图书，ISLI编码
        /// </summary>
        int Update(Books books);

        /// <summary>
        /// 显示图书，ISLI编码
        /// </summary>
        List<Books> BooksList();
    }
}
