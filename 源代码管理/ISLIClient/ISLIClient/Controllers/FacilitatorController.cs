using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ISLIClient.Controllers
{
    public class FacilitatorController : Controller
    {
        public IActionResult FacilitatorIndex()
        {
            return View();
        }
    }
}