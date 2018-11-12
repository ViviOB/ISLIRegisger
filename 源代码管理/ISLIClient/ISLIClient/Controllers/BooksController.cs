using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using ISLI.Model;
using ISLI.Unility;
using Newtonsoft.Json;

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
            Page page = new Page();
            page.pageindex = 2;
            page.pagesize = 1;
            page.name = "";
            page.counts = 0;
            var json = WebApiHelper.GetApiResult("post", "Books", "GetList", page);
            DataTable<Books> data = JsonConvert.DeserializeObject<DataTable<Books>>(json);
           
            var list = data.list;
            int count = data.counts;
            return JsonConvert.SerializeObject(list);
        }
        #endregion

        #region /// 查询
        [HttpPost]
        public string BookSearch(string str="")
        {
            Page page = new Page();
            page.pageindex = 2;
            page.pagesize = 1;
            page.name = str;
            page.counts = 0;
            var json = WebApiHelper.GetApiResult("post", "Books", "GetList", page);
            DataTable<Books> data = JsonConvert.DeserializeObject<DataTable<Books>>(json);

            var list = data.list;
            int count = data.counts;
            return JsonConvert.SerializeObject(list);
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
            var str = GetBooks().FirstOrDefault(m=>m.Id==id);
            return View(str);
        }


        #region /// 封装显示
        public List<Books> GetBooks()
        {
            Page page = new Page();
            page.pageindex = 1;
            page.pagesize = 1;
            page.name = "";
            page.counts = 0;
            var json = WebApiHelper.GetApiResult("post", "Books", "GetList", page);
            var data = JsonConvert.DeserializeObject<DataTable<Books>>(json);
            var list = data.list;
            return list;
        }
        #endregion

    }
}