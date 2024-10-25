using Authscape.Models.Reporting;
using Authscape.Models.Reporting.Attributes;
using Authscape.Reporting.Models;
using Authscape.Reporting.Models.ReportContent;
using Authscape.Reporting.Models.Timeline;
using AuthScape.Models.Reporting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Services.Context;
using Services.Database;
using System.Reflection;

namespace Authscape.Reporting.Services
{
    public interface IReportService
    {
        Task<IReport> RunReport(AppDomain domain, Guid id, string payLoad, DbContext[] Databases);
    }

    public class ReportService : IReportService
    {
        readonly AppSettings appSettings;
        public ReportService(IOptions<AppSettings> appSettings)
        {
            this.appSettings = appSettings.Value;
        }

        public async Task<IReport> RunReport(AppDomain domain, Guid id, string payLoad, DbContext[] Databases)
        {
            var report = GetReport(domain, id);
            var instance = (IReport)Activator.CreateInstance(report.ReportType);

            instance.Databases = Databases;
            instance.RawData = await instance.OnRequest(payLoad);






            if (instance.RawData.Content.GetType() == typeof(AreaChartContent))
            {
                var areaCharts = (AreaChartContent)instance.RawData.Content;

                // get the column data
                var columnData = new List<string>();
                columnData.Add(areaCharts.XAxis.FirstOrDefault());
                foreach (var dataPoint in areaCharts.dataPoints)
                {
                    columnData.Add(dataPoint.Label);
                }
                instance.Columns = columnData;


                // get the values for the columns
                var list = new List<List<object>>();

                int columnIndex = 0;
                foreach (var columnDat in areaCharts.XAxis.Skip(1))
                {
                    var data = new List<object>();
                    data.Add(columnDat);

                    foreach (var dp in areaCharts.dataPoints)
                    {
                        data.Add(dp.Data[columnIndex]);
                    }

                    list.Add(data);

                    columnIndex++;
                }

                instance.Data = list;
                instance.ReportType = ReportType.AreaChartReport;
            }
            else if (instance.RawData.Content.GetType() == typeof(BarChartContent))
            {
                var areaCharts = (BarChartContent)instance.RawData.Content;

                // get the column data
                var columnData = new List<string>();
                columnData.Add(areaCharts.XAxis.FirstOrDefault());
                foreach (var dataPoint in areaCharts.dataPoints)
                {
                    columnData.Add(dataPoint.Label);
                }
                instance.Columns = columnData;


                // get the values for the columns
                var list = new List<List<object>>();

                int columnIndex = 0;
                foreach (var columnDat in areaCharts.XAxis.Skip(1))
                {
                    var data = new List<object>();
                    data.Add(columnDat);

                    foreach (var dp in areaCharts.dataPoints)
                    {
                        data.Add(dp.Data[columnIndex]);
                    }

                    list.Add(data);

                    columnIndex++;
                }

                instance.Data = list;
                instance.ReportType = ReportType.BarChartReport;
            }
            else if (instance.RawData.Content.GetType() == typeof(BubbleChartContent))
            {
                var areaCharts = (BubbleChartContent)instance.RawData.Content;

                // get the column data
                var columnData = new List<string>();


                // maybe change this to an array that is adjustable so the dev can add more fields
                columnData.Add("ID");
                columnData.Add(areaCharts.HorizontalText);
                columnData.Add(areaCharts.VerticalText);
                columnData.Add(areaCharts.Name);

                instance.Columns = columnData;


                // get the values for the columns
                var list = new List<object>();

                foreach (var columnDat in areaCharts.dataPoints)
                {
                    var data = new List<object>();

                    data.Add(columnDat.Id);
                    data.Add(columnDat.X);
                    data.Add(columnDat.Y);
                    data.Add(columnDat.Size);

                    list.Add(data);
                }

                instance.Data = list;
                instance.ReportType = ReportType.BubbleChartReport;
            }
            else if (instance.RawData.Content.GetType() == typeof(BarCandleStickContent))
            {
                var areaCharts = (BarCandleStickContent)instance.RawData.Content;

                // get the column data
                var columnData = new List<string>();
                columnData.Add(areaCharts.XAxis.FirstOrDefault());
                foreach (var dataPoint in areaCharts.dataPoints)
                {
                    columnData.Add(dataPoint.Label);
                }
                instance.Columns = columnData;


                // get the values for the columns
                var list = new List<List<object>>();

                int columnIndex = 0;
                foreach (var columnDat in areaCharts.XAxis.Skip(1))
                {
                    var data = new List<object>();
                    data.Add(columnDat);

                    foreach (var dp in areaCharts.dataPoints)
                    {
                        data.Add(dp.Data[columnIndex]);
                    }

                    list.Add(data);

                    columnIndex++;
                }

                instance.Data = list;
                instance.ReportType = ReportType.CandleStickChartReport;
            }
            else if (instance.RawData.Content.GetType() == typeof(GaugeChartContent))
            {
                var areaCharts = (GaugeChartContent)instance.RawData.Content;

                // get the column data
                var columnData = new List<string>();
                columnData.Add("Label");
                columnData.Add("Value");
                instance.Columns = columnData;


                // get the values for the columns
                var list = new List<object>();

                foreach (var columnDat in areaCharts.DataPoints)
                {
                    var data = new List<object>();
                    data.Add(columnDat.Label);
                    data.Add(columnDat.value);
                    list.Add(data);
                }

                instance.Data = list;
                instance.ReportType = ReportType.GaugeChartReport;
            }
            else if (instance.RawData.Content.GetType() == typeof(PieChartContent))
            {
                var areaCharts = (PieChartContent)instance.RawData.Content;

                // get the column data
                var columnData = new List<string>();
                columnData.Add("Name");
                columnData.Add("Number");
                instance.Columns = columnData;


                // get the values for the columns
                var list = new List<object>();

                foreach (var columnDat in areaCharts.DataPoints)
                {
                    var data = new List<object>();
                    data.Add(columnDat.Name);
                    data.Add(columnDat.Number);
                    list.Add(data);
                }

                instance.Data = list;
                instance.ReportType = ReportType.PieChartReport;
            }
            else if (instance.RawData.Content.GetType() == typeof(HistogramsContent))
            {
                var areaCharts = (HistogramsContent)instance.RawData.Content;

                // get the column data
                var columnData = new List<string>();
                columnData.Add("Name");
                columnData.Add("Number");
                instance.Columns = columnData;


                // get the values for the columns
                var list = new List<object>();

                foreach (var columnDat in areaCharts.DataPoints)
                {
                    var data = new List<object>();
                    data.Add(columnDat.Name);
                    data.Add(columnDat.Number);
                    list.Add(data);
                }

                instance.Data = list;
                instance.ReportType = ReportType.HistogramsReport;
            }
            else if (instance.RawData.Content.GetType() == typeof(TimelineChartContent))
            {
                var areaCharts = (TimelineChartContent)instance.RawData.Content;

                // get the column data
                var columnData = new List<TimelineHeader>();

                columnData.Add(new TimelineHeader("string", "timeline"));
                columnData.Add(new TimelineHeader("date", "Start"));
                columnData.Add(new TimelineHeader("date", "End"));
                
                instance.Columns = columnData;


                // get the values for the columns
                var list = new List<object>();

                foreach (var columnDat in areaCharts.DataPoints)
                {
                    var data = new List<object>();
                    data.Add(columnDat.Label);
                    data.Add(columnDat.StartDate.ToString("DT-yyyy-MM-dd"));
                    data.Add(columnDat.EndDate.ToString("DT-yyyy-MM-dd"));
                    list.Add(data);
                }

                instance.Data = columnData;
                instance.Data = list;
                instance.ReportType = ReportType.TimelineReport;
            }
            else if (instance.RawData.Content.GetType() == typeof(WordTreeChartContent))
            {
                var areaCharts = (WordTreeChartContent)instance.RawData.Content;

                // get the column data
                var columnData = new List<string>();
                columnData.Add(areaCharts.XAxis.FirstOrDefault());
                foreach (var dataPoint in areaCharts.dataPoints)
                {
                    columnData.Add(dataPoint.Label);
                }
                instance.Columns = columnData;


                // get the values for the columns
                var list = new List<List<object>>();

                int columnIndex = 0;
                foreach (var columnDat in areaCharts.XAxis.Skip(1))
                {
                    var data = new List<object>();
                    data.Add(columnDat);

                    foreach (var dp in areaCharts.dataPoints)
                    {
                        data.Add(dp.Data[columnIndex]);
                    }

                    list.Add(data);

                    columnIndex++;
                }

                instance.Data = list;
                instance.ReportType = ReportType.WordTree;
            }


            return instance;
        }

        private List<string> GetColumnNames(IEnumerable<object> Objs)
        {
            var columns = new List<string>();
            if (Objs != null)
            {
                var first = Objs.FirstOrDefault();
                if (first != null)
                {
                    foreach (var prop in first.GetType().GetProperties())
                    {
                        columns.Add(prop.Name);
                    }
                }
            }
            return columns;
        }

        private List<List<object>> GetValues(IEnumerable<object> Objs)
        {
            var data = new List<List<object>>();
            if (Objs != null)
            {
                foreach (var obj in Objs)
                {
                    var data2 = new List<object>();
                    foreach (var prop in obj.GetType().GetProperties())
                    {
                        var test = prop.GetValue(obj);
                        data2.Add(test);
                    }
                    data.Add(data2);
                }
            }
            return data;
        }


        public Report GetReport(AppDomain domain, Guid id)
        {
            return GetReports(domain).Where(r => r.Id == id).FirstOrDefault();
        }

        public IList<Report> GetReports(AppDomain domain, long? UserId = null)
        {
            var reports = new List<Report>();

            var assemblies = domain.GetAssemblies();

            var reportTypes = GetReportTypesInNamespace(assemblies.Where(a => a.FullName.Contains("Reports")));

            foreach (var report in reportTypes)
            {
                var reportAttribute = report.GetCustomAttribute<ReportNameAttribute>();
                var Id = Guid.Parse(reportAttribute.ReportId);

                reports.Add(new Report()
                {
                    Id = Id,
                    ReportType = report,
                });
            }
            return reports.ToList();
        }


        private Type[] GetReportTypesInNamespace(IEnumerable<Assembly> assemblies)
        {
            var reports = assemblies.SelectMany(s => s.GetTypes())
                             .Where(c => typeof(IReport).IsAssignableFrom(c) && c.IsClass)
                             .ToArray();

            return reports;
        }
    }
}
