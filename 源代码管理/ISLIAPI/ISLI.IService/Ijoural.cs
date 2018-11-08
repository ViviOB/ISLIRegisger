using System;
using System.Collections.Generic;
using System.Text;

using ISLI.Model;
namespace ISLI.IService
{
    public interface Ijoural
    {
        /// <summary>
        /// 期刊申请
        /// </summary>
        /// <param name="joural"></param>
        /// <returns></returns>
        int AddJoural(JouralApply joural);

        /// <summary>
        /// 修改期刊
        /// </summary>
        /// <param name="joural"></param>
        /// <returns></returns>
        int UpdateJoural(JouralApply joural);

        /// <summary>
        /// 显示所有
        /// </summary>
        /// <returns></returns>
        List<JouralApply> GetJourals();

    }
}
