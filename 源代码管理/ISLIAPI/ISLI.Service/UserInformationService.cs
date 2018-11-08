using System;
using System.Collections.Generic;
using System.Text;
using ISLI.IService;
using ISLI.Model;
using ISLI.Unility;
using SqlSugar;

namespace ISLI.Service
{
    public class UserInformationService : IUserInformation
    {
        /// <summary>
        /// 显示关联信息回填信息
        /// </summary>
        /// <returns></returns>
        public List<Facilitator> FacilitatorList()
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var getList = db.Queryable<Facilitator>().ToList();
                return getList;
            }
        }

        /// <summary>
        /// 修改账号信息
        /// </summary>
        /// <param name="facilitator"></param>
        /// <returns></returns>
        public int UpdateFacilitator(Facilitator facilitator)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var i = db.Updateable(facilitator).ExecuteCommand();
                return i;
            }
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        public int UpdateUserPwd(User user)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var i = db.Updateable(user).ExecuteCommand();
                return i;
            }
        }
    }
}
