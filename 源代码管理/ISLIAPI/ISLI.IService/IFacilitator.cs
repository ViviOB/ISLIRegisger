using System;
using System.Collections.Generic;
using System.Text;

using ISLI.Model;
namespace ISLI.IService
{
   public interface IFacilitator
    {
        /// <summary>
        /// 显示关联信息回填信息
        /// </summary>
        /// <returns></returns>
        List<Adhibition> AdhibitionList();
    }
}
