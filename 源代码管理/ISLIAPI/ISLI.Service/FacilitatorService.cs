using System;
using System.Collections.Generic;
using System.Text;

using ISLI.IService;
using ISLI.Model;
using SqlSugar;
using ISLI.Unility;
namespace ISLI.Service
{
    public class FacilitatorService : IFacilitator
    {
        /// <summary>
        /// 显示关联信息回填信息
        /// </summary>
        /// <returns></returns>
        public List<Adhibition> AdhibitionList()
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                var getList = db.Queryable<Adhibition>().ToList();
                return getList;
            }
        }

        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="pageParams"></param>
        /// <returns></returns>

        public PageResult<Adhibition> GetPagedList(PageParams pageParams)
        {
            var result = BaseDB.PageList<Adhibition>(pageParams);
            return result;
        }

        /// <summary>
        /// 技术服务商个人信息并返回id
        /// </summary>
        /// <param name="fqualification"></param>
        /// <returns></returns>
        public int AddFacilitator(Facilitator_Qualification fqualification)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                Facilitator facilitator = new Facilitator()
                {
                    ApplicantEmail = fqualification.ApplicantEmail,
                    ApplicantName = fqualification.ApplicantName,
                    CellPhone = fqualification.CellPhone,
                    CompanyName = fqualification.CompanyName,
                    ContactEmail = fqualification.ContactEmail,
                    ContactName = fqualification.ContactName,
                    ContactNumber = fqualification.ContactNumber,
                    ContactPhone = fqualification.ContactPhone,
                    CreditCode = fqualification.CreditCode,
                    Email = fqualification.Email,
                    Postcode = fqualification.Postcode,
                    QualificationId = fqualification.QualificationId,
                    RegistrationAddres = fqualification.RegistrationAddres,
                    RegistrationCode = fqualification.RegistrationCode,
                    RepresentativeName = fqualification.RepresentativeName,
                    ServiceType = fqualification.ServiceType
                };
                var result = db.Insertable<Facilitator>(facilitator).ExecuteReturnIdentity();
                return result;
            }
        }

        /// <summary>
        /// 企业资质证明并返回id
        /// </summary>
        /// <param name="fqualification"></param>
        /// <returns></returns>
        public int AddQualification(Facilitator_Qualification fqualification)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                Qualification qualification = new Qualification()
                {
                    RegTime = DateTime.Now,
                    Type = fqualification.Type,
                    UnifiedSocial = fqualification.UnifiedSocial
                };
                var result = db.Insertable<Qualification>(qualification).ExecuteReturnIdentity();
                return result;
            }
        }

        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="fqualification"></param>
        /// <returns></returns>
        public int AddUser(Facilitator_Qualification fqualification)
        {
            using (SqlSugarClient db = BaseDB.GetClient())
            {
                User user = new User()
                {
                    IsEnabled = 1,
                    SubmissionState = 1,
                    UserInfoId = fqualification.UserInfoId,
                    UserName = fqualification.UserName,
                    UserPwd = fqualification.UserPwd,
                    UserTypeId = fqualification.UserTypeId
                };
                var result = db.Insertable(user).ExecuteCommand();
                return result;
            }
        }
    }
}
