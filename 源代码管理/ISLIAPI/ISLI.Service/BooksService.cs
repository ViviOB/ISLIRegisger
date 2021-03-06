﻿using System;
using System.Collections.Generic;
using System.Text;

using ISLI.IService;
using ISLI.Model;
using SqlSugar;
using ISLI.Unility;
using System.Data;

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
            using (SqlSugarClient db = BaseDB.GetClient())
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
        public DataTable<Books> BooksList(Page page)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                // var getList = db.Queryable<Books>().ToList();
                //return getList;  
                var parm1 = new SugarParameter("@pageindex", page.pageindex);
                var parm2 = new SugarParameter("@pagesize", page.pagesize);
                var parm3 = new SugarParameter("@nname", page.name);
                var parm4 = new SugarParameter("@ccount", 0);//isOutput=true
                parm4.Direction = ParameterDirection.Output;
                DataTable<Books> data = new DataTable<Books>();
                data.list = db.Ado.UseStoredProcedure().SqlQuery<Books>("pages", parm1, parm2, parm3, parm4);
                data.counts = Convert.ToInt32(parm4.Value);
                return data;
            }
        }

        /// <summary>
        /// 修改图书,ISLI编码
        /// </summary>
        /// <param name="books"></param>
        /// <returns></returns>

        public int Update(Books books)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var i = db.Updateable(books).ExecuteCommand();
                return i;
            }
        }

        /// <summary>
        /// 根据iD获取对象
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Books BooksUpdateById(int id)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                //根据条件查询
                var books = db.Queryable<Books>().Where(m=>m.Id==id).First();
                return books;
            }
        }

        /// <summary>
        /// 修改提交状态(通过)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int UpdateBooksSbumissionStateToPass(Books books)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var m = db.Updateable<Books>().UpdateColumns(it => new Books() { ApplyState = 2 }).Where(it => it.Id == books.Id).ExecuteCommand();
                return m;
            }
        }

        /// <summary>
        /// 修改提交状态(拒绝)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int UpdateBooksSbumissionStateToDeny(Books books)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var m = db.Updateable<Books>().UpdateColumns(it => new Books() { ApplyState = 0 }).Where(it => it.Id == books.Id).ExecuteCommand();
                return m;
            }
        }
    }
}
