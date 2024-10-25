namespace AuthScape.AzureCloudService.Models
{
    public class CollectCertificateThumbprint
    {
        public string id { get; set; }
        public string name { get; set; }
        public string type { get; set; }
        public string location { get; set; }
        public Properties properties { get; set; }
    }

    public class Properties
    {
        //public object password { get; set; }
        public string friendlyName { get; set; }
        public string subjectName { get; set; }
        public string[] hostNames { get; set; }
        //public object pfxBlob { get; set; }
        //public object siteName { get; set; }
        //public object selfLink { get; set; }
        public string issuer { get; set; }
        public DateTime issueDate { get; set; }
        public DateTime expirationDate { get; set; }
        public string thumbprint { get; set; }
        //public object valid { get; set; }
        //public object toDelete { get; set; }
        //public object cerBlob { get; set; }
        //public object publicKeyHash { get; set; }
        //public object hostingEnvironment { get; set; }
        //public object hostingEnvironmentProfile { get; set; }
        public string keyVaultId { get; set; }
        public string keyVaultSecretName { get; set; }
        public string keyVaultSecretStatus { get; set; }
        public string webSpace { get; set; }
        //public object serverFarmId { get; set; }
        public string canonicalName { get; set; }
        //public object tags { get; set; }
        public string resourceGroup { get; set; }
    }

}