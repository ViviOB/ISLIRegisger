using System;
using System.Collections.Generic;
using System.Text;

using ISLI.IService;
using ISLI.Model;
using SqlSugar;
using ISLI.Unility;
namespace ISLI.Service
{
   public class FacilitatorService:IFacilitator
    {
        /// <summary>
        /// 显示关联信息回填信息
        /// </summary>
        /// <returns></returns>
        public List<Adhibition> AdhibitionList()
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var getList = db.Queryable<Adhibition>().ToList();
                return getList;

            }
        }
    }
}
