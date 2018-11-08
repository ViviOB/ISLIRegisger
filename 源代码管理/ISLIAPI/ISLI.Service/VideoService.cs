using System;
using System.Collections.Generic;
using System.Text;

using ISLI.IService;
using ISLI.Model;
using SqlSugar;
namespace ISLI.Service
{
    public class VideoService : IVideos
    {
        /// <summary>
        /// 添加视频信息
        /// </summary>
        /// <param name="videos"></param>
        /// <returns></returns>
        public int AddVideos(Videos videos)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 显示视频信息
        /// </summary>
        /// <returns></returns>
        public List<Videos> GetVideos()
        {
            throw new NotImplementedException();
        }
    }
}
