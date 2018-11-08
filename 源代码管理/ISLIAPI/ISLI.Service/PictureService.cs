using System;
using System.Collections.Generic;
using System.Text;

using ISLI.IService;
using ISLI.Model;
using SqlSugar;
using ISLI.Unility;
namespace ISLI.Service
{
    public class PictureService
    {
        /// <summary>
        /// 添加图片信息
        /// </summary>
        /// <param name="audio"></param>
        /// <returns></returns>
        public int AddPicture(Picture audio)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var i = db.Insertable<Audio>(audio).ExecuteCommand();
                return i;
            }
        }

        /// <summary>
        /// 显示图片信息
        /// </summary>
        /// <returns></returns>
        public List<Picture> GetPictures()
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var list = db.Queryable<Picture>().ToList();
                return list;
            }
        }
    }
}
