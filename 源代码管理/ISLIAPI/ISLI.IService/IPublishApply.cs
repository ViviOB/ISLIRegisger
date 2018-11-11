using System;
using System.Collections.Generic;
using System.Text;

using ISLI.Model;
namespace ISLI.IService
{
    public interface IPublishApply
    {
        /// <summary>
        /// 获取列表
        /// </summary>
        /// <returns></returns>
        List<PublishApply> GetPublishApplysList();

        /// <summary>
        /// 根据ID获取
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        PublishApply UpdateById(int id);

        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="authorize"></param>
        /// <returns></returns>
        int Update(Publisher publisher);

        /// <summary>
        /// 分页方法
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="totalCount"></param>
        /// <returns></returns>
        List<PublishApply> Paging(int pageIndex, int pageSize, int totalCount);

        /// <summary>
        /// 修改提交状态（通过）
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        int UpdateSbumissionStateToPass(PublishApply publishApply);

        /// <summary>
        /// 修改提交状态（拒绝）
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        int UpdateSbumissionStateToDeny(PublishApply publishApply);

        /// <summary>
        /// 修改用户启用状态
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        int UpdateEnableState(PublishApply publishApply);


    }
}
