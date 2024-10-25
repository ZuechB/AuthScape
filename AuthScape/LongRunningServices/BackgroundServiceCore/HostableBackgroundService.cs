using AuthScape.BackgroundServiceCore.Interfaces;
using AuthScape.BackgroundServiceCore.Models;
using System.Reflection;

namespace AuthScape.BackgroundServiceCore
{
    public interface IHostableBackgroundService
    {
        List<Activity> GetAllActivities(AppDomain domain, string projectName = "BackgroundServiceApp");
    }

    public class HostableBackgroundService : IHostableBackgroundService
    {
        public List<Activity> GetAllActivities(AppDomain domain, string projectName = "BackgroundServiceApp")
        {
            var activitiesList = new List<Activity>();
            var activities = GetReportTypesInNamespace(domain.GetAssemblies().Where(a => a.FullName.Contains(projectName)), projectName);
            foreach (var activity in activities)
            {
                activitiesList.Add(new Activity()
                {
                    Name = activity.Name
                });
            }

            return activitiesList;
        }

        private Type[] GetReportTypesInNamespace(IEnumerable<Assembly> assemblies, string projectName)
        {
            var reports = assemblies.SelectMany(s => s.GetTypes())
                             .Where(c => typeof(IBackgroundActivityService).IsAssignableFrom(c) && c.IsClass && c.Namespace == projectName + ".Activities")
                             .ToArray();

            return reports;
        }
    }
}
