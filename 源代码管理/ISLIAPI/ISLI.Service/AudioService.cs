using System;
using System.Collections.Generic;
using System.Text;

using ISLI.IService;
using ISLI.Model;
using SqlSugar;
using ISLI.Unility;
namespace ISLI.Service
{
    public class AudioService : IAudio
    {
        /// <summary>
        /// 添加音频信息
        /// </summary>
        /// <param name="audio"></param>
        /// <returns></returns>
        public int AddAudio(Audio audio)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var i = db.Insertable<Audio>(audio).ExecuteCommand();
                return i;
            }
        }

        /// <summary>
        /// 显示音频信息
        /// </summary>
        /// <returns></returns>
        public List<Audio> GetAudios()
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var list = db.Queryable<Audio>().ToList();
                return list;
            }
        }
    }
}
