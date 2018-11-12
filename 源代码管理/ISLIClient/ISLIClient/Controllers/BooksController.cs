using ISLI.Model;
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
            Page page = new Page();
            page.pageindex = 1;
            page.pagesize = 1;
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
            page.pagesize = 1;
            page.name = "";
            page.counts = 0;
            var json = WebApiHelper.GetApiResult("post", "Books", "GetList", page);
            DataTable<Books> data = JsonConvert.DeserializeObject<DataTable<Books>>(json);

            var list = data.list;
            int count = data.counts;
            return JsonConvert.SerializeObject(list);
        }

        public IActionResult GeyById(int id=1)
        {
            var json = GetBooks();
            var data= JsonConvert.DeserializeObject<DataTable<Books>>(json);
            var str = data.list.FirstOrDefault(m=>m.Id==id);
            return View(str);
        }

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