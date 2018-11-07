using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
    public class Videos
    {
        /// <summary>
        /// 视频表
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 类型id
        /// </summary>
        public string TypeID { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string TypeName { get; set; }

        /// <summary>
        /// 创建者
        /// </summary>
        public string Creator { get; set; }

        /// <summary>
        /// 主题
        /// </summary>
        public string Theme { get; set; }

        /// <summary>
        /// 摘要/描述
        /// </summary>
        public string Desription { get; set; }

        /// <summary>
        /// 出版者
        /// </summary>
        public string Publisher { get; set; }

        /// <summary>
        /// 出版地
        /// </summary>
        public string PublisherPlace { get; set; }

        /// <summary>
        /// 创建日期
        /// </summary>
        public DateTime CreationDate { get; set; }

        /// <summary>
        /// 发布日期
        /// </summary>
        public DateTime ReleaseDate { get; set; }

        /// <summary>
        /// 格式
        /// </summary>
        public string Format { get; set; }

        /// <summary>
        /// 标识符
        /// </summary>
        public string Identifier { get; set; }

        /// <summary>
        /// 语种
        /// </summary>
        public string LanguageId { get; set; }

        /// <summary>
        /// 压缩比率
        /// </summary>
        public string CompressionRatio { get; set; }

        /// <summary>
        /// 相关资源
        /// </summary>
        public string RelatedResources { get; set; }

        /// <summary>
        /// 片长
        /// </summary>
        public string VideoLength { get; set; }

        /// <summary>
        /// 色彩
        /// </summary>
        public int Color { get; set; }

        /// <summary>
        /// 大小
        /// </summary>
        public string FileSize { get; set; }
    }
}
