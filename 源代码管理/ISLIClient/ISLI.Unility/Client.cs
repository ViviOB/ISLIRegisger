using System;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net;

namespace ISLI.Unility
{
    public class Client
    {
        /// <summary>
        /// 连接api
        /// </summary>
        /// <param name="verb">请求方式</param>
        /// <param name="conn">控制器</param>
        /// <param name="action">方法名</param>
        /// <param name="obj">对象</param>
        /// <returns></returns>
        public  static string GetApi(string verb,string conn,string action,Object obj=null)
        {           
            string json = string.Empty;
            Task<HttpResponseMessage> task = null;
            HttpResponseMessage respose = null;
            HttpClientHandler handler = new HttpClientHandler()
            {
                AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
            };
            using (HttpClient client=new HttpClient(handler)){
                client.BaseAddress = new Uri("http://localhost:44326/api/" + conn+"/");
                switch (verb.ToLower())
                {
                    case "get": task = client.GetAsync(action);
                        break;
                    case "post": task = client.PostAsJsonAsync(action, obj);
                        break;
                    case "put": task = client.PutAsJsonAsync(action, obj);
                        break;
                    case "delete": task = client.DeleteAsync(action);
                        break;
                }
                //Task.WhenAny(Task.Delay(3000), task);
                task.Wait();
                respose = task.Result;
                if (respose.IsSuccessStatusCode)
                {
                    var res = respose.Content.ReadAsStringAsync();
                    json = res.Result;
                }
            }
            return json;
        }
    }
}
