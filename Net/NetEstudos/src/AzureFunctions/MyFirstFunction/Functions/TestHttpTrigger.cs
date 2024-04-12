using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace MyFirstFunction.Functions
{
    public class TestHttpTrigger
    {
        [Function("HttpTest")]
        public async Task<HttpResponseData> Run([HttpTrigger("POST", Route = "names/{name}")] HttpRequestData req, string name,
            FunctionContext executionContext)
        {
            var response = req.CreateResponse();
            // Configurar o corpo da resposta
            var responseBody = new Response
            {
                Name = name,
                Date = DateTime.Now.ToString()
            };
            await response.WriteAsJsonAsync(responseBody);
            return response;
        }
    }

    public sealed class Response
    {
        public string Name { get; set; }
        public string Date { get; set; }
    }
}