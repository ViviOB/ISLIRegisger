using System;
using System.Collections.Generic;
using System.Text;

using ISLI.Model;
namespace ISLI.IService
{
    public interface IAuthorize
    {
        /// <summary>
        /// 获取列表
        /// </summary>
        /// <returns></returns>
        List<Authorize> GetAuthorizesList();
        
        /// <summary>
        /// 根据ID获取
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Authorize UpdateById(int id);

        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="authorize"></param>
        /// <returns></returns>
        int Update(Authorize authorize);
    }
}
