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
        int totalCount = 0;
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
        public PublishApply UpdateById(int id)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                //根据条件查询
                var publishApply = db.Queryable<User, Publisher>((st, sc) => new object[] { JoinType.Inner, st.UserInfoId == sc.PId }).Select<PublishApply>().Where(sc => sc.PId == id).First();
                return publishApply;
            }
        }

        /// <summary>
        /// 分页方法
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pagesize"></param>
        /// <param name="totalCount"></param>
        /// <returns></returns>
        public PageResult<PublishApply> Paging(PageParams pageParams)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
               // List<PublishApply> page = db.Queryable<PublishApply>().ToPageList(pageIndex, pageSize, ref totalCount);
                var page = db.Queryable<User, Publisher>((st, sc) => new object[] {JoinType.Inner,st.UserInfoId==sc.PId}).Select<PublishApply>().Where(st => st.UserTypeId == 2).ToPageList(pageParams.PageIndex, pageParams.PageSize, ref totalCount);
                PageResult<PublishApply> pageResult = new PageResult<PublishApply>();
                pageResult.TotalCount = totalCount;
                int i = totalCount / pageParams.PageSize;
                pageResult.TotalPage = totalCount % pageParams.PageSize == 0 ? i : i + 1;
                pageResult.DataList = page;
                return pageResult;
            }
        }

        /// <summary>
        /// 修改提交状态(通过)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int UpdateSbumissionStateToPass(PublishApply publishApply)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var m = db.Updateable<User>().UpdateColumns(it => new User() { SubmissionState = 0 }).Where(it => it.Id == publishApply.PId).ExecuteCommand();
                return m;
            }
        }

        /// <summary>
        /// 修改提交状态(拒绝)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int UpdateSbumissionStateToDeny(PublishApply publishApply)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var m = db.Updateable<User>().UpdateColumns(it => new User() { SubmissionState = 2 }).Where(it => it.Id == publishApply.PId).ExecuteCommand();
                return m;
            }
        }

        /// <summary>
        /// 修改用户启用状态
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int UpdateEnableState(PublishApply publishApply)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                //修改为冻结
                var m = db.Updateable<User>().UpdateColumns(it => new User() { IsEnabled = 0 }).Where(it => it.Id == publishApply.PId).ExecuteCommand();
                return m;
            }
        }
    }
}
