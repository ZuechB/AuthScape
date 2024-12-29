global using System.Collections.Immutable;
global using Microsoft.Extensions.DependencyInjection;
global using Microsoft.Extensions.Hosting;
global using Microsoft.Extensions.Localization;
global using Microsoft.Extensions.Logging;
global using Microsoft.Extensions.Options;
global using AuthScape.Uno.Models;
global using AuthScape.Uno.Presentation;
global using AuthScape.Uno.DataContracts;
global using AuthScape.Uno.DataContracts.Serialization;
global using AuthScape.Uno.Services.Caching;
global using AuthScape.Uno.Services.Endpoints;
#if MAUI_EMBEDDING
global using AuthScape.Uno.MauiControls;
#endif
global using ApplicationExecutionState = Windows.ApplicationModel.Activation.ApplicationExecutionState;
[assembly: Uno.Extensions.Reactive.Config.BindableGenerationTool(3)]
