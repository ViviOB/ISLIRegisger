using System;
using System.Collections.Generic;
using System.Text;

using ISLI.IService;
using ISLI.Model;
using SqlSugar;
using ISLI.Unility;
namespace ISLI.Service
{
    public class PublishApplyService : IPublishApply
    {
        /// <summary>
        /// 获取数据
        /// </summary>
        /// <returns></returns>
        public List<PublishApply> GetPublishApplysList()
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var list = db.Queryable<User, Publisher>((st, sc) => new object[] { JoinType.Inner, st.UserInfoId == sc.PId }).Select<PublishApply>().Where(st => st.UserTypeId == 2).ToList();
                return list;
            }
        }

        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="authorize"></param>
        /// <returns></returns>
        public int Update(Publisher publisher)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 根据iD获取对象
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Publisher UpdateById(int id)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                //根据主键查询
                var getByPrimaryKey = db.Queryable<Publisher>().InSingle(id);
                //根据条件查询
                // var getByWhere = db.Queryable<Student>().Where(it => it.Id == 1 || it.Name == "a").ToList();
                return getByPrimaryKey;
            }
        }

        /// <summary>
        /// 分页方法
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pagesize"></param>
        /// <param name="totalCount"></param>
        /// <returns></returns>
        public List<PublishApply> Paging(int pageIndex,int pageSize,int totalCount)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                List<PublishApply> page = db.Queryable<PublishApply>().ToPageList(pageIndex, pageSize, ref totalCount);
                return page;
            }
        }
    }

}
