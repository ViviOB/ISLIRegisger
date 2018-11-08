using ISLI.IService;
using ISLI.Model;
using ISLI.Unility;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Service
{
    public class AuthorizationService : IAuthorization
    {
        /// <summary>
        /// 显示授权详情表
        /// </summary>
        /// <returns></returns>
        public List<Authorize> AuthorizeList()
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var getList = db.Queryable<Authorize>().ToList();
                return getList;
            }
        }
    }
}
