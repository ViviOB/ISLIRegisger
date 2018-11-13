using System;
using System.Collections.Generic;
using System.Text;

using ISLI.Model;
namespace ISLI.IService
{
   public interface IAuthorization
    {
        /// <summary>
        /// 显示授权详情信息
        /// </summary>
        /// <returns></returns>
        List<Authorize> AuthorizeList();

        /// <summary>
        /// 提交授权
        /// </summary>
        /// <param name="authorize"></param>
        /// <returns></returns>
        int AddAuthorize(Authorize authorize);

        /// <summary>
        /// 获取分页方法
        /// </summary>
        /// <param name="pageParams"></param>
        /// <returns></returns>
        PageResult<Authorize> GetPagedList(PageParams pageParams);
    }
}
