using System;
using System.Collections.Generic;
using System.Text;

using ISLI.Model;

namespace ISLI.IService
{
    public interface IPublisher
    {
        /// <summary>
        /// 添加企业资质证明
        /// </summary>
        /// <param name="pcertificate"></param>
        /// <returns></returns>
        int AddCertificate(Publisher_Certificate pcertificate);

        /// <summary>
        /// 添加出版单位
        /// </summary>
        /// <param name="pcertificate"></param>
        /// <returns></returns>
        int AddPublisher(Publisher_Certificate pcertificate);

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="pcertificate"></param>
        /// <returns></returns>
        int AddUser(Publisher_Certificate pcertificate);
    }
}
