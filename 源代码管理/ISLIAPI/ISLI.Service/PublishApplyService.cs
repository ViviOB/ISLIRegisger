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
                // var list = db.Queryable<User, Publisher>((st, sc) => st.UserInfoId == sc.Id).Select<PublishApply>.ToList();

                var list = db.Queryable<User, Publisher>((st, sc) => st.UserInfoId == sc.Id).Where(st=>st.UserTypeId==2).Select((st, sc) => new PublishApply[1]).Select<PublishApply>().ToList();
                var getByWhere = db.Queryable<User>().Where(m => m.Id ==2).ToList();
                //var list = db.Queryable<User, Publisher>((st, sc) => new object[] {JoinType.Inner,st.UserInfoId==sc.Id}).Select<PublishApply>().ToList();
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
    }
}
