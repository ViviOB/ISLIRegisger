using System;
using System.Collections.Generic;
using System.Text;

using ISLI.Model;
namespace ISLI.IService
{
    public interface IPicture
    {
        /// <summary>
        /// 添加图片信息
        /// </summary>
        /// <param name="audio"></param>
        /// <returns></returns>
        int AddPicture(Picture audio);

        /// <summary>
        /// 显示图片信息
        /// </summary>
        /// <returns></returns>
        List<Picture> GetPicture();
    }
}
