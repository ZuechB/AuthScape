using Google.Apis.SmartDeviceManagement.v1;
using Google.Apis.SmartDeviceManagement.v1.Data;

namespace AuthScape.GoogleServices
{
    public interface IGoogleSmartHomeService
    {
        IList<GoogleHomeEnterpriseSdmV1Device> ListDevices();
    }

    public class GoogleSmartHomeService : IGoogleSmartHomeService
    {
        private static readonly string[] Scopes = { SmartDeviceManagementService.Scope.SdmService };
        private static SmartDeviceManagementService service;

        public GoogleSmartHomeService()
        {
            //GoogleCredential credential = GoogleCredential.FromFile("D:\\Development\\AuthScape\\AuthScape\\API\\authscape-856812bd8f1a.json").CreateScoped(Scopes);
            //service = new SmartDeviceManagementService(new BaseClientService.Initializer()
            //{
            //    HttpClientInitializer = credential,
            //    ApplicationName = "AuthScape",
            //});
        }


        public IList<GoogleHomeEnterpriseSdmV1Device> ListDevices()
        {
            var request = service.Enterprises.Devices.List("enterprises/your-enterprise-id");
            var response = request.Execute();

            return response.Devices;

            //foreach (var device in response.Devices)
            //{
            //    Console.WriteLine($"Device ID: {device.Name}");
            //}
        }



        // TurnOnLight("enterprises/your-enterprise-id/devices/your-device-id");

        private static void TurnOnLight(string deviceId)
        {
            var request = new GoogleHomeEnterpriseSdmV1ExecuteDeviceCommandRequest
            {
                Command = "sdm.devices.commands.OnOff",
                Params__ = new Dictionary<string, object> { { "on", true } }
            };

            var response = service.Enterprises.Devices.ExecuteCommand(request, deviceId).Execute();
            //Console.WriteLine("Light turned on: " + response.Status);
        }

        private static void TurnOffLight(string deviceId)
        {
            var request = new GoogleHomeEnterpriseSdmV1ExecuteDeviceCommandRequest
            {
                Command = "sdm.devices.commands.OnOff",
                Params__ = new Dictionary<string, object> { { "on", false } }
            };

            var response = service.Enterprises.Devices.ExecuteCommand(request, deviceId).Execute();
            //Console.WriteLine("Light turned off: " + response.Status);
        }

    }
}
