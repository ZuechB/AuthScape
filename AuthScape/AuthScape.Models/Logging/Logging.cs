namespace AuthScape.Models.Logging
{
	public class Logging
	{
		public Guid Id { get; set; }
		public string MachineName { get; set; }
		public DateTime Created { get; set; }
		public Level Level { get; set; }
		public string Browser { get; set; }
		public Stage Environment { get; set; }
		public string Uri { get; set; }
		public string Version { get; set; }
		public string RouteAction { get; set; }
		public string RouteController { get; set; }
		public string Runtime { get; set; }
		public string OS { get; set; }
		public string Referer { get; set; }
		public string Message { get; set; }
		public string ExceptionMessage { get; set; }
		public string InnerExceptionMessage { get; set; }
		public string ExceptionStackTrace { get; set; }
		public string InnerExceptionStackTrace { get; set; }
	}
}