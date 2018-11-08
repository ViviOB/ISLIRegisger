using System;
using System.Collections.Generic;
using System.Text;

using ISLI.Model;
namespace ISLI.IService
{
    public interface IVideos
    {
        /// <summary>
        /// 添加视频信息
        /// </summary>
        /// <param name="videos"></param>
        /// <returns></returns>
        int AddVideos(Videos videos);

        /// <summary>
        /// 显示视频信息
        /// </summary>
        /// <returns></returns>
        List<Videos> GetVideos();
    }
}
