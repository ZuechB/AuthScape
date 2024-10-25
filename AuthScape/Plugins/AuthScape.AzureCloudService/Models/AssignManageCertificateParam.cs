namespace AuthScape.AzureCloudService.Models
{
    public class AssignManageCertificateParam : AzureBaseDomain
    {
        public string SubscriptionId { get; set; }
        public string ResourceGroupName { get; set; }
        public string AppServiceName { get; set; }
        public string DomainName { get; set; }
        public string CertificateName { get; set; }
    }
}
