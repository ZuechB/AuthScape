namespace AuthScape.AzureCloudService.Models
{
    public class DomainSSL : AzureBaseDomain
    {
        public string DomainName { get; set; }
        public string SubscriptionId { get; set; }
        public string ResourceGroupName { get; set; }
        public string WebAppName { get; set; }
        public string CertificateName { get; set; }
        public string AppServicePlanName { get; set; }
    }
}