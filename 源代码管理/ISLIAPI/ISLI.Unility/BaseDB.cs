using System;
using System.Linq;
using SqlSugar;
using ISLI.Model;
namespace ISLI.Unility
{
    public class BaseDB
    {
        public static string DBConnectionString { get; set; }
        public static SqlSugarClient GetClient()
        {
            SqlSugarClient db = new SqlSugarClient(
                new ConnectionConfig()
                {
                    ConnectionString = DBConnectionString,
                    DbType = DbType.MySql,
                    IsAutoCloseConnection = true
                }
                );
            db.Aop.OnLogExecuting = (sql, pars) =>
            {
                Console.WriteLine(sql + "\r\n" + db.Utilities.SerializeObject(pars.ToDictionary(it => it.ParameterName, it => it.Value)));
                Console.WriteLine();
            };
            return db;
        }

        public static PageResult<T> PageList<T>(PageParams pageParams) where T : class, new()
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                int totalCount = 0;
                int totalPage = 0;
                var getList = db.Queryable<T>().Where(pageParams.StrWhere).ToPageList(pageParams.PageIndex, pageParams.PageSize, ref totalCount);
                PageResult<T> pageResult = new PageResult<T>();
                pageResult.TotalCount = totalCount;
                totalPage = totalCount / pageParams.PageSize;
                if (totalCount % pageParams.PageSize > 0)
                {
                    totalPage += 1;
                }
                pageResult.TotalPage = totalPage;
                pageResult.DataList = getList;
                return pageResult;
            }
        }
    }
}
