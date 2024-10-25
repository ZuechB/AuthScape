namespace AuthScape.AzureCloudService.Models
{
    public class AzureWebAppBadRequest
    {
        public string Code { get; set; }
        public string Message { get; set; }
    }

    //public class Detail
    //{
    //    public string Message { get; set; }
    //    public string Code { get; set; }
    //    public Errorentity ErrorEntity { get; set; }
    //}

    //public class Errorentity
    //{
    //    public string ExtendedCode { get; set; }
    //    public string MessageTemplate { get; set; }
    //    public string[] Parameters { get; set; }
    //    public string Code { get; set; }
    //    public string Message { get; set; }
    //}
}