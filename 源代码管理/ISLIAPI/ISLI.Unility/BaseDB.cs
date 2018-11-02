using System;
using System.Linq;
using SqlSugar;
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
    }
}
