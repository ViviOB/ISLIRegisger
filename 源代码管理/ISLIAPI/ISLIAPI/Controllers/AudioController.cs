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
    [EnableCors("CorsConfig")]  //允许跨域请求
    [ApiController]
    public class AudioController : ControllerBase
    {
        private readonly IAudio _audio;

        public AudioController(IAudio audio)
        {
            _audio = audio;
        }

        /// <summary>
        /// 显示音频信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Audio> GetAudios()
        {
            var list = _audio.GetAudios();
            return list;
        }

        /// <summary>
        /// 添加音频信息
        /// </summary>
        /// <param name="audio"></param>
        /// <returns></returns>
        [HttpPost]
        public int AddAudio(Audio audio)
        {
            var i = _audio.AddAudio(audio);
            return i;
        }

    }
}