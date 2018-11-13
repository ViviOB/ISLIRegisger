using System;
using System.Collections.Generic;
using System.Text;

using ISLI.IService;
using ISLI.Model;
using ISLI.Unility;
using SqlSugar;

namespace ISLI.Service
{
    public class AdhibitionService : IAdhibition
    {
        /// <summary>
        /// 显示关联信息
        /// </summary>
        /// <returns></returns>
        public int AddAdhibition(Adhibition adhibition)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var i = db.Insertable<Adhibition>(adhibition).ExecuteCommand();
                return i;
            }
        }

        /// <summary>
        /// 添加关联信息应用
        /// </summary>
        /// <param name="adhibition"></param>
        /// <returns></returns>
        public List<Adhibition> GetAdhibitions()
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var list = db.Queryable<Adhibition>().ToList();
                return list;
            }
        }

        /// <summary>
        /// 编辑关联信息
        /// </summary>
        /// <param name="adhibition"></param>
        /// <returns></returns>
        public int UpdateAdhibition(Adhibition adhibition)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var i = db.Updateable(adhibition).ExecuteCommand();
                return i;
            }
        }
    }
}
