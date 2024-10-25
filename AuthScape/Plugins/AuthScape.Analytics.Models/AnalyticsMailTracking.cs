namespace AuthScape.Analytics.Models
{
    public class AnalyticsMailTracking
    {
        public Guid Id { get; set; }
        public MailEventType EventType { get; set; }
        public long? MarketingCampaignId { get; set; }
        public string? MarketingCampaignName { get; set; }
        public string Email { get; set; }
        public string? Arguments { get; set; } // JSON Payload of a dictionary
        public string? InternalEventId { get; set; }
        public string? InternalMessageId { get; set; }
        public long? MarketingCampaignSplitId { get; set; }
        public DateTime Timestamp { get; set; }
        public long? ExternalUserId { get; set; } // user id from sendgrid
        public string? MarketingCampaignVersion { get; set; }
        public string? MessageId { get; set; }




        public Guid AnalyticsMailId { get; set; }

        public AnalyticsMail AnalyticsMail { get; set; }

        // user within our platform
        public long? UserId { get; set; }
    }

    public enum MailEventType
    {
        processed = 0, // Message has been received and is ready to be delivered.

        /// <summary>
        /// You may see the following drop reasons:
        ///     - Invalid SMTPAPI header,
        ///     - Spam Content (if spam checker app enabled),
        ///     - Unsubscribed Address,
        ///     - Bounced Address,
        ///     - Spam Reporting Address,
        ///     - Invalid,
        ///     - Recipient List over Package Quota.
        /// </summary>
        Dropped = 1,

        /// <summary>
		/// Message has been successfully delivered to the receiving server.
		/// </summary>
        Delivered = 2,

        /// <summary>
		/// Recipient’s email server temporarily rejected message.
		/// </summary>
        Deferred = 3,

        /// <summary>
		/// Receiving server could not or would not accept message.
		/// </summary>
        Bounce = 4,

        /// <summary>
		/// Recipient has opened the HTML message. You need to enable Open Tracking for getting this type of event.
		/// </summary>
        Open = 5,

        /// <summary>
		/// Recipient clicked on a link within the message. You need to enable Click Tracking for getting this type of event.
		/// </summary>
        Click = 6,

        /// <summary>
		/// Recipient marked message as spam.
		/// </summary>
        SpamReport = 7,

        /// <summary>
		/// Recipient clicked on the 'Opt Out of All Emails' link (available after clicking the message's subscription management link).
		/// You need to enable Subscription Tracking for getting this type of event.
		/// </summary>
        Unsubscribe = 8,

        /// <summary>
		/// Recipient unsubscribed from specific group, by either direct link or updating preferences.
		/// You need to enable Subscription Tracking for getting this type of event.
		/// </summary>
        GroupUnsubscribe = 9,

        /// <summary>
		/// Recipient resubscribes to specific group by updating preferences.
		/// You need to enable Subscription Tracking for getting this type of event.
		/// </summary>
        GroupResubscribe = 10,
    }
}