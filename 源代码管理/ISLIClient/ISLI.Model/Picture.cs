using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
    public class Picture
    {
        /// <summary>
        /// 图片表
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
        /// 作者
        /// </summary>
        public string Author { get; set; }

        /// <summary>
        /// 主题
        /// </summary>
        public string Theme { get; set; }

        /// <summary>
        /// 图片分类
        /// </summary>
        public string Classification { get; set; }

        /// <summary>
        /// 色彩
        /// </summary>
        public string Color { get; set; }

        /// <summary>
        /// 分辨率
        /// </summary>
        public string Resolution { get; set; }

        /// <summary>
        /// 分辨率类型
        /// </summary>
        public string ResolutionType { get; set; }

        /// <summary>
        /// 像素大小x
        /// </summary>
        public string PixelSizeX { get; set; }

        /// <summary>
        /// 像素大小y
        /// </summary>
        public string PixelSizeY { get; set; }

        /// <summary>
        /// 文件格式
        /// </summary>
        public string FileFormat { get; set; }

        /// <summary>
        /// 大小
        /// </summary>
        public string FileSize { get; set; }
    }
}
