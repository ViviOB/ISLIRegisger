using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
    public class RichText
    {
        /// <summary>
        /// 富文本表
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 类型id
        /// </summary>
        public int TypeId { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string TypeName { get; set; }

        /// <summary>
        /// 简介
        /// </summary>
        public string Introduction { get; set; }

        /// <summary>
        /// 分类
        /// </summary>
        public string Classification { get; set; }

        /// <summary>
        /// 标签
        /// </summary>
        public string TextLabel { get; set; }

        /// <summary>
        /// 资源清单
        /// </summary>
        public string ResourceList { get; set; }

        /// <summary>
        /// 大小
        /// </summary>
        public string FileSize { get; set; }
    }
}
