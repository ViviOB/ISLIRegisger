using ISLI.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.IService
{
    public interface IUserInformation
    {
        /// <summary>
        /// 显示账户详情信息
        /// </summary>
        /// <returns></returns>
        List<Facilitator> FacilitatorList();

        /// <summary>
        /// 修改账号信息
        /// </summary>
        /// <param name="facilitator"></param>
        /// <returns></returns>
        int UpdateFacilitator(Facilitator facilitator);

        /// <summary>
        /// 修改用户密码
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        int UpdateUserPwd(User user);

        /// <summary>
        /// 下拉显示服务商代码
        /// </summary>
        /// <returns></returns>
        List<User> GetFacilitators();
    }
}
