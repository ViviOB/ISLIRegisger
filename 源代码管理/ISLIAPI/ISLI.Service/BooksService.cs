using System;
using System.Collections.Generic;
using System.Text;

using ISLI.IService;
using ISLI.Model;
using SqlSugar;
using ISLI.Unility;

namespace ISLI.Service
{
    public class BooksService : IBooks
    {
        /// <summary>
        /// 添加图书，ISLI编码
        /// </summary>
        /// <param name="books"></param>
        /// <returns></returns>
        public int Add(Books books)
        {
            using (SqlSugarClient db =BaseDB.GetClient())
            {
                //插入并返回受影响行数用ExecuteCommand 
                int i = db.Insertable<Books>(books).ExecuteCommand();
                return i;
            }
        }

        /// <summary>
        /// 显示所有
        /// </summary>
        /// <returns></returns>
        public List<Books> BooksList()
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var getList = db.Queryable<Books>().ToList();
                return getList;

            }
        }

        /// <summary>
        /// 修改图书,ISLI编码
        /// </summary>
        /// <param name="books"></param>
        /// <returns></returns>

        public int Update(Books books)
        {
            using (SqlSugarClient db=BaseDB.GetClient())
            {
                var i = db.Updateable(books).ExecuteCommand();
                return i;
            }
        }
    }
}
