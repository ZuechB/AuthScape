namespace AuthScape.AzureCloudService.Models
{
    public class DomainAttach : AzureBaseDomain
    {
        public string subscriptionId { get; set; } // your_subscription_id
        public string resourceGroupName { get; set; } // your_resource_group_name
        public string name { get; set; } // your_site_name
        public string hostName { get; set; } // your_host_name
    }
}