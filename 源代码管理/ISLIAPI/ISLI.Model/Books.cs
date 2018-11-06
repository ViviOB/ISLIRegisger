using System;
using System.Collections.Generic;
using System.Text;

namespace ISLI.Model
{
    public class Books
    {
        /// <summary>
        /// 图书表
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// 图书ISBN编码
        /// </summary>
        public string ISBN { get; set; }

        /// <summary>
        /// 书名
        /// </summary>
        public string BookName { get; set; }

        /// <summary>
        /// 书名的拼音
        /// </summary>
        public string EnglishName { get; set; }

        /// <summary>
        /// 丛书名
        /// </summary>
        public string Series { get; set; }

        /// <summary>
        /// 套书名
        /// </summary>
        public string SeriesBooks { get; set; }

        /// <summary>
        /// 产品形式
        /// </summary>
        public string ProductType { get; set; }

        /// <summary>
        /// 责任编辑
        /// </summary>
        public string Editor { get; set; }

        /// <summary>
        /// 中图分类法
        /// </summary>
        public string ChineseLibrary { get; set; }

        /// <summary>
        /// 出版日期
        /// </summary>
        public DateTime PublishDate { get; set; }

        /// <summary>
        /// 语种
        /// </summary>
        public string Languages { get; set; }

        /// <summary>
        /// 制作日期
        /// </summary>
        public DateTime MakeDate { get; set; }

        /// <summary>
        /// 出版者
        /// </summary>
        public string Publisher { get; set; }

        /// <summary>
        /// 关键字
        /// </summary>
        public string KeyWord { get; set; }

        /// <summary>
        /// 出版地 
        /// </summary>
        public string PublishPlace { get; set; }

        /// <summary>
        /// 图幅数
        /// </summary>
        public string NumberOfGraohs { get; set; }

        /// <summary>
        /// 著作者
        /// </summary>
        public string Writer { get; set; }

        /// <summary>
        /// 出版标记
        /// </summary>
        public string PublishMaket { get; set; }

        /// <summary>
        /// 印刷者
        /// </summary>
        public string Printer { get; set; }

        /// <summary>
        /// 纸材
        /// </summary>
        public string PaperWood { get; set; }

        /// <summary>
        /// 版本类型
        /// </summary>
        public string VersionType { get; set; }

        /// <summary>
        /// 页数
        /// </summary>
        public string PageCount { get; set; }

        /// <summary>
        /// 字数
        /// </summary>
        public string WordCount { get; set; }

        /// <summary>
        /// 印色
        /// </summary>
        public string Colour { get; set; }

        /// <summary>
        /// 内容摘要
        /// </summary>
        public string Content { get; set; }


        /// <summary>
        /// 编码类型
        /// </summary>
        public string CodeType { get; set; }

        /// <summary>
        /// 目标资源类型
        /// </summary>
        public string TargetResource { get; set; }

        /// <summary>
        /// 服务商代码
        /// </summary>
        public string ServiceCode { get; set; }
    }
}
