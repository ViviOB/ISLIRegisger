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
        /// 提交授权
        /// </summary>
        /// <param name="authorize"></param>
        /// <returns></returns>
        public int AddAuthorize(Authorize authorize)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var i = db.Insertable(authorize).ExecuteCommand();
                return i;
            }
        }

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

        /// <summary>
        /// 分页显示
        /// </summary>
        /// <param name="pageParams"></param>
        /// <returns></returns>
        public PageResult<Authorize> GetPagedList(PageParams pageParams)
        {
            var result = BaseDB.PageList<Authorize>(pageParams);
            return result;
        }
    }
}
