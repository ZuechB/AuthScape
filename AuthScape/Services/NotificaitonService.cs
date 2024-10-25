using AuthScape.SendGrid;
using AuthScape.TicketSystem.Modals;
using Models.Email;
using Stripe;

namespace Services
{
    public interface INotificationService
    {
        Task NotifyTicketCreated(Ticket ticket);
        Task NotifyTicketMessageCreated(long ticketId, string fromEmail, string message, string firstName, string lastName);
        Task SendInvoice(long companyId, long LocationId, InvoiceEmail invoiceEmail);
    }

    public class NotificationService : INotificationService
    {
        public async Task NotifyTicketCreated(Ticket ticket)
        {
            // Notify your team that a ticket was created via email or teams]
        }

        public async Task NotifyTicketMessageCreated(long ticketId, string fromEmail, string message, string firstName, string lastName)
        {
            // Notify your team that a ticket message was created via email or teams
        }

        public async Task SendInvoice(long companyId, long LocationId, InvoiceEmail invoiceEmail)
        {
            //await sendGridService.Send(users, "", new InvoiceEmail()
            //{
            //    amountdue = invoice.BalanceDue.ToString("C"),
            //    paylink = paymentLink
            //});
        }
    }
}
