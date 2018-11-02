using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
    /// <summary>
    /// 音频表
    /// </summary>
    public class Audio
    {
        /// <summary>
        /// ID
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 类型ID
        /// </summary>
        public int TypeId { get; set; }

        /// <summary>
        /// 类型ID
        /// </summary>
        public string TypeName { get; set; }

        /// <summary>
        /// 创建者
        /// </summary>
        public string Creator { get; set; }

        /// <summary>
        /// 责任方式
        /// </summary>
        public string Responsibility { get; set; }

        /// <summary>
        /// /主题
        /// </summary>
        public string Theme { get; set; }

        /// <summary>
        /// 音乐载体
        /// </summary>
        public string MusicGenre { get;set;}

        /// <summary>
        /// 出版者
        /// </summary>
        public string Publisher { get; set; }

        /// <summary>
        /// 出行地
        /// </summary>
        public string PublisherPlace { get; set; }

        /// <summary>
        /// 制作者
        /// </summary>
        public string Maker { get; set; }

        /// <summary>
        /// 其他责任者
        /// </summary>
        public string OtherResponsible { get; set; }

        /// <summary>
        /// 其他责任方式
        /// </summary>
        public string OtherResponsibility { get; set; }

        /// <summary>
        /// 创建日期
        /// </summary>
        public DateTime CreationDate { get; set; }

        /// <summary>
        /// 发布日期
        /// </summary>
        public DateTime ReleaseDate { get; set; }

        /// <summary>
        /// 类型
        /// </summary>
        public string Format { get; set; }

        /// <summary>
        /// 篇幅
        /// </summary>
        public string Space { get; set; }

        /// <summary>
        /// 载体
        /// </summary>
        public string Carrier { get; set; }

        /// <summary>
        /// 标识符
        /// </summary>
        public string Identifier { get; set; }

        /// <summary>
        /// 语种
        /// </summary>
        public int LanguageId { get; set; }
    }
}
