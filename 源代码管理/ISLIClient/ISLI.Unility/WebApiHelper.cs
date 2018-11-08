using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Net.Http.Formatting;

namespace ISLI.Unility
{
    public class WebApiHelper
    {

        /// <summary>
        /// 获取WebApi的数据结果
        /// </summary>
        /// <param name="verbs">执行的动作名称，get\post\put\delete</param>
        /// <param name="method"></param>
        /// <param name="obj"></param>
        /// <returns></returns>
        public static string GetApiResult(string verbs,string controller, string action, Object obj = null)
        {
            Task<HttpResponseMessage> task = null;
            string json = "";

            //创建客户端，指定uri地址访问WebApi
            HttpClient client = new HttpClient();
            Uri uri = new Uri("http://localhost:44327/api/" + controller + "/");
            client.BaseAddress = uri;

            /*根据不同的动作执行不同的方法*/
            switch (verbs.ToLower())
            {
                case "get":
                    task = client.GetAsync(action);
                    break;
                case "post":
                    task = client.PostAsJsonAsync(action, obj);
                    break;
                case "put":
                    task = client.PutAsJsonAsync(action, obj);
                    break;
                case "delete":
                    task = client.DeleteAsync(action);
                    break;
            }

            task.Wait(); 
            HttpResponseMessage response = task.Result;

            if (response.IsSuccessStatusCode)
            {
                var result = response.Content.ReadAsStringAsync();
                result.Wait();
                json = result.Result;
            }
            return json;
        }
    }
}