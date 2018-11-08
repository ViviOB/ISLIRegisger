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
    public class RichTextController : ControllerBase
    {
        private readonly IRichText _richtext;
        public RichTextController(IRichText richText)
        {
            _richtext = richText;
        }

        /// <summary>
        /// 显示富文本
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<RichText>GetRichTexts()
        {
            var list = _richtext.GetRichTexts();
            return list;
        }

        /// <summary>
        /// 添加富文本
        /// </summary>
        /// <param name="richText"></param>
        /// <returns></returns>
        [HttpPost]
        public int AddRichText(RichText richText)
        {
            var i = _richtext.AddRichText(richText);
            return i;
        }
    }
}