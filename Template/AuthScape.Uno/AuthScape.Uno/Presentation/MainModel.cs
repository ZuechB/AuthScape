using Microsoft.Maui.Storage;
using Uno.Extensions.Navigation;
using Windows.ApplicationModel.Core;

namespace AuthScape.Uno.Presentation;

public partial record MainModel
{
    private INavigator _navigator;

    public MainModel(
        IStringLocalizer localizer,
        IOptions<AppConfig> appInfo,
        IAuthenticationService authentication,
        INavigator navigator)
    {
        _navigator = navigator;
        _authentication = authentication;
        Title = "Main";
        Title += $" - {localizer["ApplicationName"]}";
        Title += $" - {appInfo?.Value?.Environment}";

        Task.Run(async () =>
        {
            await Name.SetAsync(await SecureStorage.GetAsync("access_token"));
        });
        
    }

    public string? Title { get; }

    public IState<string> Name => State<string>.Value(this, () => string.Empty);

    public IState<int> Count => State<int>.Value(this, () => 0);

    public IFeed<string> CounterText => Count.Select(_currentCount => _currentCount switch
    {
        0 => "Press Me",
        1 => "Pressed Once!",
        _ => $"Pressed {_currentCount} times!"
    });

    public async Task Counter(CancellationToken ct) =>
        await Count.Update(x => ++x, ct);

    public async Task GoToSecond()
    {
        var name = await Name;
        await _navigator.NavigateViewModelAsync<SecondModel>(this, data: new Entity(name!));
    }

    public async ValueTask Logout(CancellationToken token)
    {
        SecureStorage.RemoveAll();
        await _navigator.NavigateViewModelAsync<LoginModel>(this, qualifier: Qualifiers.Root);
    }

    private IAuthenticationService _authentication;
}
