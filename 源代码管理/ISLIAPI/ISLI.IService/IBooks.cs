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
        /// 根据ID获取
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Books BooksUpdateById(int id);

        /// <summary>
        /// 显示图书，ISLI编码
        /// </summary>
        DataTable<Books> BooksList(Page page);

        /// <summary>
        /// 修改提交状态（通过）
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        int UpdateBooksSbumissionStateToPass(Books books);

        /// <summary>
        /// 修改提交状态（拒绝）
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        int UpdateBooksSbumissionStateToDeny(Books books);
    }
}
