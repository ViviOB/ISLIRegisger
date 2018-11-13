using System;
using System.Collections.Generic;
using System.Text;

using ISLI.Model;
namespace ISLI.IService
{
    public interface IAdhibition
    {
        /// <summary>
        /// 显示关联信息
        /// </summary>
        /// <returns></returns>
        List<Adhibition> GetAdhibitions();

        /// <summary>
        /// 添加关联信息应用
        /// </summary>
        /// <param name="adhibition"></param>
        /// <returns></returns>
        int AddAdhibition(Adhibition adhibition);

        /// <summary>
        /// 编辑关联信息
        /// </summary>
        /// <param name="adhibition"></param>
        /// <returns></returns>
        int UpdateAdhibition(Adhibition adhibition);
    }
}
