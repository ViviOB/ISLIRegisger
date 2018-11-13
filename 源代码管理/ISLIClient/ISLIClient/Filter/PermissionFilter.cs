using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ISLIClient.Filter
{
    public class PermissionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //获取访问路径
            var path = filterContext.HttpContext.Request.Path.ToString();

            var user = filterContext.HttpContext.User;
            if (user.Claims.Count() > 0)
            {
                var result = user.Claims.Where(m => m.Type == "keykey").First().Value;
                if (result != "qqq")
                {
                    filterContext.Result = new RedirectResult("/Account/Index");
                    base.OnActionExecuting(filterContext);
                    return;
                }
            }
            filterContext.Result = new RedirectResult("/Account/Index");
            base.OnActionExecuting(filterContext);
        }
    }
}
