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

        public string  BooksList()
        {
            Page page = new Page();
            page.pageindex = 1;
            page.pagesize = 1;
            page.name = "";
            page.counts = 0;
            var json = WebApiHelper.GetApiResult("post", "Books", "GetList", page);
            DataTable<Books> data = JsonConvert.DeserializeObject<DataTable<Books>>(json);
           
            var list = data.list;
            int count = data.counts;
            return JsonConvert.SerializeObject(list);
        }

    }
}