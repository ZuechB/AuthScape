using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Cores
{
    public class CorsPolicyManager : ICorsPolicyProvider
    {
        public async Task<CorsPolicy> GetPolicyAsync(HttpContext context, string policyName)
        {
            return await Task.Run(() =>
            {
                var list = new List<string>();

                list.Add("http://localhost:3000");
                list.Add("http://localhost");

                list.Add("https://localhost:44303");
                list.Add("http://localhost:55755");


                return new CorsPolicyBuilder()
                    .WithOrigins(list.ToArray())
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .Build();
            });
        }
    }
}
