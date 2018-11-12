using System;
using System.Collections.Generic;
using System.Text;

using ISLI.Model;
namespace ISLI.IService
{
    public interface IFacilitator
    {
        /// <summary>
        /// 显示关联信息回填信息
        /// </summary>
        /// <returns></returns>
        List<Adhibition> AdhibitionList();

        /// <summary>
        /// 技术服务商个人信息并返回id
        /// </summary>
        /// <param name="fqualification"></param>
        /// <returns></returns>
        int AddFacilitator(Facilitator_Qualification fqualification);

        /// <summary>
        /// 企业资质证明并返回id
        /// </summary>
        /// <param name="fqualification"></param>
        /// <returns></returns>
        int AddQualification(Facilitator_Qualification fqualification);

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="pcertificate"></param>
        /// <returns></returns>
        int AddUser(Facilitator_Qualification fqualification);
    }
}
