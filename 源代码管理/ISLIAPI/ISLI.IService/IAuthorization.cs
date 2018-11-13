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
    }
}
