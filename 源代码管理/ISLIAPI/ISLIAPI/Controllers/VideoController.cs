using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using ISLI.IService;
using ISLI.Service;
using ISLI.Model;
using Microsoft.AspNetCore.Cors;

namespace ISLIAPI.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("CorsConfig")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly IVideos _videos;
        public VideoController(IVideos videos)
        {
            _videos = videos;
        }

        /// <summary>
        /// 显示视频
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Videos> GetVideos()
        {
            var list = _videos.GetVideos();
            return list;
        }

        /// <summary>
        /// 添加视频
        /// </summary>
        /// <param name="videos"></param>
        /// <returns></returns>
        [HttpPost]
        public int AddVideos(Videos videos)
        {
            var i = _videos.AddVideos(videos);
            return i;
        }
    }
}