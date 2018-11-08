using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using ISLI.Model;
using ISLI.IService;
using ISLI.Service;

namespace ISLIAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PictureController : ControllerBase
    {
        private readonly IPicture _picture;
        public PictureController(IPicture picture)
        {
            _picture = picture;
        }

        /// <summary>
        /// 显示图片信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Picture> GetPictures()
        {
            var list = _picture.GetPictures();
            return list;
        }

        /// <summary>
        /// 添加图片信息
        /// </summary>
        /// <param name="picture"></param>
        /// <returns></returns>
        [HttpPost]
        public int AddPicture(Picture picture)
        {
            var i = _picture.AddPicture(picture);
            return i;
        }
    
    }
}