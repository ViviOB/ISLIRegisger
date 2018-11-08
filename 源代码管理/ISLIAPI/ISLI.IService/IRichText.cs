using System;
using System.Collections.Generic;
using System.Text;

using ISLI.Model;
namespace ISLI.IService
{
    public interface IRichText
    {
        /// <summary>
        /// 富文本
        /// </summary>
        /// <param name="richText"></param>
        /// <returns></returns>
        int AddRichText(RichText richText);

        /// <summary>
        /// 显示富文本
        /// </summary>
        /// <returns></returns>
        List<RichText> GetRichTexts();
    }
}
