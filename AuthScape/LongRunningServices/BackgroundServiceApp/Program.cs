using AuthScape.BackgroundServiceCore;

var builder = WebApplication.CreateBuilder(args);
BackgroundServiceStartup.Setup(builder, "BackgroundServiceApp");