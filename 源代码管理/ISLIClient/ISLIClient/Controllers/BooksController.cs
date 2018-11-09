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
            var json = WebApiHelper.GetApiResult("get", "Books", "GetList", null);
            return json;
        }

    }
}