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
    [Route("api/[controller]/[action]")]
    [EnableCors("CorsConfig")]  //允许跨域请求
    [ApiController]
    public class AudioController : ControllerBase
    {
        private readonly IAudio _audio;
        private readonly IAdhibition _adhibition;

        public AudioController(IAudio audio)
        {
            _audio = audio;
        }

        public AudioController(IAdhibition adhibition)
        {
            _adhibition = adhibition;
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

        /// <summary>
        /// 显示关联信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Adhibition> GetAdhibitions()
        {
            var list = _adhibition.GetAdhibitions();
            return list;
        }

        /// <summary>
        /// 添加关联信息
        /// </summary>
        /// <param name="adhibition"></param>
        /// <returns></returns>
        [HttpPost]
        public int AddAdhibition(Adhibition adhibition)
        {
            var i = _adhibition.AddAdhibition(adhibition);
            return i;
        }

        /// <summary>
        /// 修改关联信息
        /// </summary>
        /// <param name="adhibition"></param>
        /// <returns></returns>
        [HttpPost]
        public int UpdateAdhibition(Adhibition adhibition)
        {
            var i = _adhibition.UpdateAdhibition(adhibition);
            return i;
        }
    }
}