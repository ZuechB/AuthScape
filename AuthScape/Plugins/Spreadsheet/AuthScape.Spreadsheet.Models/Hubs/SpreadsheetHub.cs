using Microsoft.AspNetCore.SignalR;

namespace AuthScape.Spreadsheet.Models.Hubs
{
    public class SpreadsheetHub : Hub
    {
        public static HashSet<UserSession> CurrentConnections = new HashSet<UserSession>();

        public override Task OnConnectedAsync()
        {
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var connection = CurrentConnections.FirstOrDefault(x => x.ConnectionId == Context.ConnectionId);

            if (connection != null)
            {
                CurrentConnections.Remove(connection);
            }

            OnUpdateUserSession();

            return base.OnDisconnectedAsync(exception);
        }

        /// <summary>
        /// Connect to a document
        /// </summary>
        /// <param name="name"></param>
        /// <param name="documentId"></param>
        public void Connect(string name, Guid documentId, long userId, string borderColor)
        {
            var id = Context.ConnectionId;
            CurrentConnections.Add(new UserSession()
            {
                Name = name,
                ConnectionId = id,
                DocumentId = documentId,
                UserId = userId,
                BorderColor = borderColor
            });

            OnUpdateUserSession();
        }

        /// <summary>
        /// Get All Sessions
        /// </summary>
        /// <returns></returns>
        public void GetAllActiveConnections(Guid documentId)
        {
            var activeSessions = CurrentConnections.Where(d => d.DocumentId == documentId).ToList();
        }

        public void CellChanged(Guid documentId, long userId, long rowId, string fieldName, string value)
        {
            foreach (var currentConnection in CurrentConnections.Where(d => d.DocumentId == documentId && d.UserId == userId))
            {
                Clients.Others.SendAsync("onChangeValue", userId, rowId, fieldName, value);
            }
        }

        public void OnUpdateUserSession()
        {
            Clients.Others.SendAsync("onUpdateUserSession");
        }

        public void FocusLocationChanged(Guid documentId, long UserId, int RowId, string columnId)
        {
            foreach (var currentConnection in CurrentConnections.Where(d => d.DocumentId == documentId && d.UserId == UserId))
            {
                Clients.All.SendAsync("onClickSpreadsheet", currentConnection.UserId, currentConnection.BorderColor, RowId, columnId);
            }
        }
    }

    public class UserSession
    {
        public long UserId { get; set; }
        public string Name { get; set; }
        public Guid DocumentId { get; set; }
        public string ConnectionId { get; set; }
        public string BorderColor { get; set; }
    }
}
