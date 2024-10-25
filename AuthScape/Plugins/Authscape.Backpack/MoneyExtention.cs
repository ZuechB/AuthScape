using Newtonsoft.Json.Linq;

namespace AuthScape.Backpack
{
    public static class MoneyExtention
    {
        public static async Task<decimal> GetExchangeRate(string baseCurrency, string targetCurrency, string apiKey)
        {
            using (HttpClient client = new HttpClient())
            {
                string url = $"https://v6.exchangerate-api.com/v6/{apiKey}/latest/{baseCurrency}";
                HttpResponseMessage response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();
                JObject json = JObject.Parse(responseBody);

                return json["conversion_rates"][targetCurrency].Value<decimal>();
            }
        }

        public static int ConvertToCents(this decimal amount)
        {
            var change = amount * 100;
            var newchange = Convert.ToInt32(change);
            return newchange;
        }

        public static decimal ConvertToDollars(this int cents)
        {
            decimal dollar = cents * 0.01m;
            return dollar;
        }

        public static decimal ConvertToDollars(this long cents)
        {
            decimal dollar = cents * 0.01m;
            return dollar;
        }
    }
}
