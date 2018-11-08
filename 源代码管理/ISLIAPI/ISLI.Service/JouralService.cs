using System;
using System.Collections.Generic;
using System.Text;

using ISLI.IService;
using ISLI.Model;
using SqlSugar;
using ISLI.Unility;
namespace ISLI.Service
{
    public class JouralService : Ijoural
    {
        /// <summary>
        /// 期刊申请
        /// </summary>
        /// <param name="joural"></param>
        /// <returns></returns>
        public int AddJoural(JouralApply joural)
        {
            using (SqlSugarClient db=BaseDB.GetClient())
            {
                var i = db.Insertable<JouralApply>(joural).ExecuteCommand();
                return i;
            }
        }

        /// <summary>
        /// 显示所有期刊
        /// </summary>
        /// <returns></returns>
        public List<JouralApply> GetJourals()
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var list = db.Queryable<JouralApply>();
                return list.ToList();
            }
        }

        /// <summary>
        /// 修改期刊
        /// </summary>
        /// <param name="joural"></param>
        /// <returns></returns>
        public int UpdateJoural(JouralApply joural)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var i = db.Updateable<JouralApply>(joural).ExecuteCommand();
                return i;
            }
        }
    }
}
