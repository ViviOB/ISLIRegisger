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
            var json = WebApiHelper.GetApiResult("get", "Books", "GetList", null);
            var list = JsonConvert.DeserializeObject<List<Books>>(json);
            return View(list);
        }
    }
}