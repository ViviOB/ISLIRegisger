using System;
using System.Collections.Generic;
using System.Text;

using ISLI.IService;
using ISLI.Model;
using ISLI.Unility;
using SqlSugar;

namespace ISLI.Service
{
    public class PublisherService : IPublisher
    {
        /// <summary>
        /// 初始化sqlSugar对象
        /// </summary>
        SqlSugarClient db = BaseDB.GetClient();

        /// <summary>
        /// 添加企业资质证明并返回自增列
        /// </summary>
        /// <param name="pcertificate"></param>
        /// <returns></returns>
        public int AddCertificate(Publisher_Certificate pcertificate)
        {
            Certificate certificate = new Certificate() {
                CertificatePublica=pcertificate.CertificatePublica,
                PublicationQualif= pcertificate.PublicationQualif,
                RegTime= pcertificate.RegTime,
                Type= pcertificate.Type,
                UnifiedSocial= pcertificate.UnifiedSocial
            };
            var result = db.Insertable(certificate).ExecuteReturnIdentity();
            return result;
        }

        /// <summary>
        /// 添加出版单位详情并返回自增列
        /// </summary>
        /// <param name="pcertificate"></param>
        /// <returns></returns>
        public int AddPublisher(Publisher_Certificate pcertificate)
        {
            Publisher publisher = new Publisher() {
                ApplicantEmail= pcertificate.ApplicantEmail,
                ApplicantName= pcertificate.ApplicantName,
                OfficeTel= pcertificate.OfficeTel,
                MovTel= pcertificate.MovTel,
                BaseId= pcertificate.BaseId,
                PublishingEntity= pcertificate.PublishingEntity,
                PublisheChinese= pcertificate.PublisheChinese,
                PublisherEnglish= pcertificate.PublisherEnglish,
                CreditCode= pcertificate.CreditCode,
                Publication= pcertificate.Publication,
                ScopePublicati= pcertificate.ScopePublicati,
                MailingAddress= pcertificate.MailingAddress,
                Postcode= pcertificate.Postcode,
                PublisherWebsit= pcertificate.PublisherWebsit,
                Sponsor= pcertificate.Sponsor,
                GoverningBody= pcertificate.GoverningBody,
                ApplicationTime=DateTime.Now,
                RepresentativeName= pcertificate.RepresentativeName,
                RepresentativeTel= pcertificate.RepresentativeTel,
                RepresentativePhon= pcertificate.RepresentativePhon,
                RepresentativePost= pcertificate.RepresentativePost,
                RepresentativeFax= pcertificate.RepresentativeFax,
                RepresentativeEmai= pcertificate.RepresentativeEmai,
                ContactName= pcertificate.ContactName,
                ContactTel= pcertificate.ContactTel,
                ContactPhone= pcertificate.ContactPhone,
                ContactPerson= pcertificate.ContactPerson,
                ContactFax= pcertificate.ContactFax,
                ContactEmail= pcertificate.ContactEmail,
                CertificateId= pcertificate.CertificateId
            };
            var result = db.Insertable(publisher).ExecuteReturnIdentity();
            return result;
        }

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="pcertificate"></param>
        /// <returns></returns>
        public int AddUser(Publisher_Certificate pcertificate)
        {
            User user = new User() {
                IsEnabled=1,
                SubmissionState=1,
                UserInfoId= pcertificate.UserInfoId,
                UserName= pcertificate.UserName,
                UserPwd= pcertificate.UserPwd,
                UserTypeId= pcertificate.UserTypeId
            };
            var result = db.Insertable(user).ExecuteCommand();
            return result;
        }
    }
}
