namespace AuthScape.Plugins.Invoices.Models
{
    public enum InvoiceState
    {
        Draft = 0,
        Active = 1,
        Paid = 2, // same as closed
        OnHold = 3,
        Archived = 4
    }
}