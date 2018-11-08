using System;
using System.Collections.Generic;
using System.Text;

using ISLI.IService;
using ISLI.Model;
using ISLI.Unility;
using SqlSugar;

namespace ISLI.Service
{
    public class RichTextService : IRichText
    {
        /// <summary>
        /// 添加富文本
        /// </summary>
        /// <param name="richText"></param>
        /// <returns></returns>
        public int AddRichText(RichText richText)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var i = db.Insertable<RichText>(richText).ExecuteCommand();
                return i;
            }
        }

        /// <summary>
        /// 显示富文本
        /// </summary>
        /// <returns></returns>
        public List<RichText> GetRichTexts()
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var list = db.Queryable<RichText>().ToList();
                return list;

            }
        }
    }
}
