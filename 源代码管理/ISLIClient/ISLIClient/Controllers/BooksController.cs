﻿using ISLI.Model;
using ISLI.Unility;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ISLIClient.Controllers
{
    public class BooksController : Controller
    {
        public IActionResult BooksIndex()
        {
            return View();
        }

        #region  /// Vue显示
        public string  BooksList()
        {
            var json = GetBooks();      
            return json;
        }
        #endregion

        #region /// 查询
        [HttpPost]
        public string BookSearch(string str="")
        {
            if(str==null)
            {
                str = "";
            }
            Page page = new Page();
            page.pageindex = 1;
            page.pagesize = 5;
            page.name = str;
            page.counts = 0;
            var json = WebApiHelper.GetApiResult("post", "Books", "GetList", page);
            return json;
        }

        #endregion
   
        [HttpPost]
        public string PageLisst(int index = 1)
        {
            Page page = new Page();
            page.pageindex = index;
            page.pagesize = 5;
            page.name = "";
            page.counts = 0;
            var json = WebApiHelper.GetApiResult("post", "Books", "GetList", page);                    
            return json;
        }

        #region /// 图书详情
        public IActionResult GeyById(int id=1)
        {
            var json = GetBooks();
            var data= JsonConvert.DeserializeObject<DataTable<Books>>(json);
            var str = data.list.FirstOrDefault(m=>m.Id==id);
            return View(str);
        }

        #endregion

        #region /// 图书申请
        public IActionResult ApplyBook()
        {
            return View();
        }
        [HttpPost]
        public IActionResult ApplyBook(Books books)
        {
            string str = Request.Form["name1"] + Request.Form["name2"] + Request.Form["name3"] + Request.Form["name3"];
            books.ISBN = str;
            books.ApplyDate = DateTime.Now.ToString("yyyy-MM-dd ");
            books.OverDate = DateTime.Now.AddDays(100).ToString("yyyy-MM-dd ");
            books.ChineseLibrary = Request.Form["ChineseLibrary"];
            books.Languages = Request.Form["Languages"];
            books.PublishPlace = Request.Form["PublishPlace"];
            books.ApplyState = 1;
            var json = WebApiHelper.GetApiResult("post", "Books", "AddBook", books);
            if (json == "1")
            {
                return Content("<script>alert('申请成功！');parent.location.href='/books/BooksIndex'</script>", "text/html;charset=utf-8");
            }
            return View();
        }
        #endregion

        #region ///编辑
        public IActionResult UpdateBook(int id = 1)
        {
            var json = GetBooks();
            var data = JsonConvert.DeserializeObject<DataTable<Books>>(json);
            var str = data.list.FirstOrDefault(m => m.Id == id);
            return View(str);
        }
        [HttpPost]
        public IActionResult UpdateBook(Books books)
        {
            var str = Request.Form["ApplyDate"];
            books.ApplyState = 1;
            books.Id= Convert.ToInt32(Request.Form["Id"]);
            var json = WebApiHelper.GetApiResult("put",
                "books", "UpdateBook", books);
            if(json=="1")
            {
                return Content("<script>alert('修改成功！');parent.location.href='/books/BooksIndex'</script>", "text/html;charset=utf-8");
            }
            return View();
        }
        #endregion

        #region /// 封装显示
        public string GetBooks()
        {
            Page page = new Page();
            page.pageindex = 1;
            page.pagesize = 5;
            page.name = "";
            page.counts = 0;
            var json = WebApiHelper.GetApiResult("post", "Books", "GetList", page);         
            return json;
        }
        #endregion

    }
}