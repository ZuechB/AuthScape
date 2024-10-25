
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddWindowsService();
builder.Services.AddHostedService<ServiceA>();

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenAnyIP(5000); // http
});

var app = builder.Build();

app.MapRazorPages();