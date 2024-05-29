using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PruebaADRESdev.Models;
using System.Diagnostics;
using System.Text;
using System.Text.Json;

namespace PruebaADRESdev.Controllers
{
    public class HomeController : Controller
    {
        private readonly IHttpClientFactory _httpClient;

        public HomeController(IHttpClientFactory httpClient)
        {
            _httpClient = httpClient;
        }
        JsonSerializerOptions options = new JsonSerializerOptions() { PropertyNameCaseInsensitive = true };
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        public async Task<List<Unidad>> getUnidad()
        {
            var prepare = this._httpClient.CreateClient("PruebadevADRES_api");
            var response = await prepare.GetAsync("GetUnidades");
            var content = await response.Content.ReadAsStringAsync();
            var res = JsonConvert.DeserializeObject<List<Unidad>>(content);
            return res;
        }
        public async Task<List<Proveedor>> getProvedor()
        {
            var prepare = this._httpClient.CreateClient("PruebadevADRES_api");
            var response = await prepare.GetAsync("GetProveedors");
            var content = await response.Content.ReadAsStringAsync();
            var res = JsonConvert.DeserializeObject<List<Proveedor>>(content);
            return res;
        }
        public async Task<List<RequerimientosMed>> GetRequerimientosMed()
        {
            var prepare = this._httpClient.CreateClient("PruebadevADRES_api");
            var response = await prepare.GetAsync("GetRequerimientosMed");
            var content = await response.Content.ReadAsStringAsync();
            var res = JsonConvert.DeserializeObject<List<RequerimientosMed>>(content);
            return res;
        }
        public async Task<int> DltUnidad(Unidad data)
        {
            try
            {
                var prepare = this._httpClient.CreateClient("PruebadevADRES_api");

               
                var jsonContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");

        
                var response = await prepare.PostAsync("DltUnidad", jsonContent);

                if (response.IsSuccessStatusCode)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al eliminar la unidad: " + ex.Message);
                return 0;
            }
        }
        public async Task<int> EditUnidades(Unidad data)
        {
            try
            {
                var prepare = this._httpClient.CreateClient("PruebadevADRES_api");


                var jsonContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");


                var response = await prepare.PutAsync("EditUnidades", jsonContent);

                if (response.IsSuccessStatusCode)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al eliminar la unidad: " + ex.Message);
                return 0;
            }
        }
        //hereeeee
        public async Task<int> DltProveedor(Proveedor data)
        {
            try
            {
                var prepare = this._httpClient.CreateClient("PruebadevADRES_api");


                var jsonContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");


                var response = await prepare.PostAsync("DltProveedor", jsonContent);

                if (response.IsSuccessStatusCode)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al eliminar la unidad: " + ex.Message);
                return 0;
            }
        }
        public async Task<int> EditProveedor(Proveedor data)
        {
            try
            {
                var prepare = this._httpClient.CreateClient("PruebadevADRES_api");


                var jsonContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");


                var response = await prepare.PutAsync("EditProveedor", jsonContent);

                if (response.IsSuccessStatusCode)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al eliminar la unidad: " + ex.Message);
                return 0;
            }
        }

        //requerimiento
        public async Task<int> DltRequerimiento(RequerimientosMed data)
        {
            try
            {
                var prepare = this._httpClient.CreateClient("PruebadevADRES_api");


                var jsonContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");


                var response = await prepare.PostAsync("DltRequerimiento", jsonContent);

                if (response.IsSuccessStatusCode)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al eliminar la unidad: " + ex.Message);
                return 0;
            }
        }
        public async Task<int> EditRequerimientosMed(RequerimientosMed data)
        {
            try
            {
                var prepare = this._httpClient.CreateClient("PruebadevADRES_api");


                var jsonContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");


                var response = await prepare.PutAsync("EditRequerimientosMed", jsonContent);

                if (response.IsSuccessStatusCode)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al eliminar la unidad: " + ex.Message);
                return 0;
            }
        }
        //añadir

        public async Task<int> PostRequerimientosMed(RequerimientosMed data)
        {
            try
            {
                var prepare = this._httpClient.CreateClient("PruebadevADRES_api");


                var jsonContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");


                var response = await prepare.PostAsync("PostRequerimientosMed", jsonContent);

                if (response.IsSuccessStatusCode)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al eliminar la unidad: " + ex.Message);
                return 0;
            }
        }
        public async Task<int> PostProvedores(Proveedor data)
        {
            try
            {
                var prepare = this._httpClient.CreateClient("PruebadevADRES_api");


                var jsonContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");


                var response = await prepare.PostAsync("PostProvedores", jsonContent);

                if (response.IsSuccessStatusCode)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al eliminar la unidad: " + ex.Message);
                return 0;
            }
        }
        public async Task<int> PostUnidades(Unidad data)
        {
            try
            {
                var prepare = this._httpClient.CreateClient("PruebadevADRES_api");


                var jsonContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");


                var response = await prepare.PostAsync("PostUnidades", jsonContent);

                if (response.IsSuccessStatusCode)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al eliminar la unidad: " + ex.Message);
                return 0;
            }
        }
    }
}
