using System;
using System.Collections.Generic;
using System.Text;

using ISLI.Model;
namespace ISLI.IService
{
    public interface IAudio
    {
        /// <summary>
        /// 添加音频信息
        /// </summary>
        /// <param name="audio"></param>
        /// <returns></returns>
        int AddAudio(Audio audio);

        /// <summary>
        /// 显示音频信息
        /// </summary>
        /// <returns></returns>
        List<Audio> GetAudios();
    }
}
