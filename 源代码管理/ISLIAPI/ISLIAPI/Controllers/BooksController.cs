using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using ISLI.Model;
using ISLI.IService;
using ISLI.Service;
namespace ISLIAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class BooksController : ControllerBase
    {

        private readonly IBooks _books;


        public BooksController(IBooks books)
        {
            _books = books;
        }

        /// <summary>
        /// 显示所有
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Books> GetList()
        {
            var  list=  _books.BooksList();
            return list;
        }

        /// <summary>
        /// 添加图书，ISLI编码
        /// </summary>
        /// <param name="books"></param>
        /// <returns></returns>
        [HttpPost]
        public int AddBook(Books books)
        {
            var i = _books.Add(books);
            return i;
        }

        /// <summary>
        /// 修改图书
        /// </summary>
        /// <param name="books"></param>
        /// <returns></returns>
        [HttpPut]
        public int UpdateBook(Books books)
        {
            var i = _books.Update(books);
            return i;
        }
    }
}