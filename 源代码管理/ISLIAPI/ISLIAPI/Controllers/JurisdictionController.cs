using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using ISLI.Model;
using ISLI.IService;
using Microsoft.AspNetCore.Cors;

namespace ISLIAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors("CorsConfig")]
    [ApiController]
    public class JurisdictionController : ControllerBase
    {
        private readonly IJurisdiction _jurisdiction;
        private readonly IPublisher _publisher;
        private readonly IFacilitator _facilitator;

        /// <summary>
        /// 构造函数注入
        /// </summary>
        /// <param name="jurisdiction"></param>
        public JurisdictionController(IJurisdiction jurisdiction, IPublisher publisher, IFacilitator facilitator)
        {
            _jurisdiction = jurisdiction;
            _publisher = publisher;
            _facilitator = facilitator;
        }

        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost]
        public UserInfo Login(User user)
        {
            return _jurisdiction.Login(user);
        }

        /// <summary>
        /// 出版社注册
        /// </summary>
        /// <param name="pcertificate"></param>
        /// <returns></returns>
        [HttpPost]
        public int PublisherAdd(Publisher_Certificate pcertificate)
        {
            //添加资质证明并返回自增id
            var certificateid = _publisher.AddCertificate(pcertificate);
            //赋值
            pcertificate.CertificateId = certificateid;
            //添加个人信息并返回自增id
            var publisherid = _publisher.AddPublisher(pcertificate);
            //赋值
            pcertificate.UserInfoId = publisherid;
            pcertificate.UserTypeId = 1;
            //添加账户
            var result = _publisher.AddUser(pcertificate);
            return result;
        }

        /// <summary>
        /// 技术服务商注册
        /// </summary>
        /// <param name="fqualification"></param>
        /// <returns></returns>
        [HttpPost]
        public int FacilitatorAdd(Facilitator_Qualification fqualification)
        {
            //添加资质证明并返回自增id
            var qualificationid = _facilitator.AddQualification(fqualification);
            //赋值
            fqualification.QualificationId = qualificationid;
            //添加个人信息并返回自增id
            var facilitatorid = _facilitator.AddFacilitator(fqualification);
            fqualification.UserInfoId = facilitatorid;
            fqualification.UserTypeId = 2;
            //添加账户
            var result = _facilitator.AddUser(fqualification);
            return result;
        }
    }
}