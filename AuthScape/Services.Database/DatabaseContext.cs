using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AuthScape.Models.Pages;
using AuthScape.Models.Stylesheets;
using AuthScape.Models.Users;
using AuthScape.Models.PaymentGateway;
using AuthScape.Models.PaymentGateway.Coupons;
using AuthScape.Models.PaymentGateway.Plans;
using OpenIddict.EntityFrameworkCore.Models;
using AuthScape.Models.Authentication;
using AuthScape.Models.Logging;
using AuthScape.Document.Mapping.Models;
using AuthScape.Document.Models;
using AuthScape.TicketSystem.Modals;
using Models.Users;
using AuthScape.Plugins.Invoices.Models;
using AuthScape.NodeService.Models;
using BackgroundServiceCore.DataModels;
using AuthScape.BackgroundServiceCore.Models;
using AuthScape.Analytics.Models;
using Models.Kanban;
using Models;
using AuthScape.PrivateLabel.Models;
using AuthScape.UserManagementSystem.Models;
using AuthScape.UserManageSystem.Models;
using AuthScape.Marketplace.Models;

namespace Services.Context
{
    public class DatabaseContext : IdentityDbContext<AppUser, Role, long>
    {
        public DatabaseContext(string connectionString) : base(GetOptions(connectionString))
        {
        }

        private static DbContextOptions GetOptions(string connectionString)
        {
            return SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), connectionString).Options;
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        
        public DbSet<UserLocations> UserLocations { get; set; }

        public DbSet<Page> Pages { get; set; }
        public DbSet<Stylesheet> Stylesheets { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Location> Locations { get; set; }

        #region Marketplace

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<ProductField> ProductFields { get; set; }
        public DbSet<ProductCategoryField> ProductCategoryFields { get; set; }

        #endregion

        #region UserManagement

        public DbSet<CustomField> CustomFields { get; set; }
        public DbSet<UserCustomField> UserCustomFields { get; set; }
        public DbSet<CompanyCustomField> CompanyCustomFields { get; set; }
        public DbSet<CustomFieldTab> CustomFieldsTab { get; set; }
        public DbSet<Permission> Permissions { get; set; }

        #endregion


        #region PaymentGateway

        public DbSet<Plan> Plans { get; set; }
        public DbSet<Wallet> Wallets { get; set; }
        public DbSet<WalletPaymentMethod> WalletPaymentMethods { get; set; }
        public DbSet<StoreCredit> StoreCredits { get; set; }
        public DbSet<StripeConnectAccount> StripeConnectAccounts { get; set; }

        #endregion

        #region OpenIdDict

        public DbSet<OpenIddictEntityFrameworkCoreApplication> OpenIddictApplications { get; set; }
        public DbSet<OpenIddictEntityFrameworkCoreAuthorization> OpenIddictAuthorizations { get; set; }
        public DbSet<OpenIddictEntityFrameworkCoreScope> OpenIddictScopes { get; set; }
        public DbSet<OpenIddictEntityFrameworkCoreToken> OpenIddictTokens { get; set; }

        #endregion

        #region Coupons

        public DbSet<Coupon> Coupons { get; set; }
        //public DbSet<ProductCoupon> ProductCoupons { get; set; }

        #endregion

        #region Invoice System

        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceLineItem> InvoiceLineItems { get; set; }
        public DbSet<InvoiceLineItemsName> InvoiceLineItemNames { get; set; }
        public DbSet<InvoicePayment> InvoicePayments { get; set; }

        #endregion

        #region Inventory / Products

        //public DbSet<Product> Products { get; set; }
        //public DbSet<ProductCategory> ProductCategories { get; set; }

        #endregion

        #region Ticket System

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketMessage> TicketMessages { get; set; }
        public DbSet<TicketStatus> TicketStatuses { get; set; }
        public DbSet<TicketType> TicketTypes { get; set; }
        public DbSet<TicketParticipant> TicketParticipants { get; set; }
        public DbSet<TicketAttachment> TicketAttachments { get; set; }

        #endregion


        #region Documents

        public DbSet<DocumentItem> Documents { get; set; }
        public DbSet<DocumentFolder> DocumentFolders { get; set; }
        public DbSet<DocumentSegment> DocumentSegments { get; set; }
        public DbSet<SharedDocument> SharedDocuments { get; set; }

        #endregion


        public DbSet<SomeSheet> SomeSheet { get; set; }

        //public DbSet<Sheet> Sheets { get; set; }
        public DbSet<DocumentSheet> Sheets { get; set; }
        public DbSet<Attribute> Attributes { get; set; }
        public DbSet<SheetAttribute> SheetAttributes { get; set; }

        #region MappingSystem 

        //public DbSet<DocumentAttributeHeader> DocumentAttributeHeader { get; set; }
        //public DbSet<DocumentAttributeValue> DocumentAttributeValue { get; set; }
        public DbSet<DocumentMapping> DocumentMappings { get; set; }
        public DbSet<DocumentType> DocumentTypes { get; set; }
        public DbSet<DocumentComponent> DocumentComponents { get; set; }
        public DbSet<DocumentMatchMemory> DocumentMatchMemories { get; set; }

        #endregion

        #region Analytics Module

        public DbSet<AnalyticsEvent> AnalyticsEvents { get; set; }
        public DbSet<AnalyticsPageView> AnalyticsPageViews { get; set; }
        public DbSet<AnalyticsSession> AnalyticsSessions { get; set; }
        public DbSet<AnalyticsConversion> AnalyticsConversions { get; set; }
        public DbSet<AnalyticsMailTracking> AnalyticsMailTrackings { get; set; }
        public DbSet<AnalyticsMail> AnalyticsMails { get; set; }

        #endregion

        #region Logging

        public DbSet<Logging> Loggings { get; set; }

        #endregion

        #region OEM Module

        public DbSet<DnsRecord> DnsRecords { get; set; }
        public DbSet<PrivateLabelField> PrivateLabelFields { get; set; }
        public DbSet<PrivateLabelSelectedFields> PrivateLabelSelectedFields { get; set; }


        #endregion

        #region NodeService Module

        public DbSet<FlowProject> FlowProjects { get; set; }
        public DbSet<FlowNode> FlowNodes { get; set; }
        public DbSet<FlowEdge> FlowEdges { get; set; }
        public DbSet<FlowViewport> FlowViewports { get; set; }

        #endregion

        #region BackgroundServiceApp

        public DbSet<QueuedActivity> QueuedActivity { get; set; }
        public DbSet<QueuedActivityLog> QueuedActivityLogs { get; set; }

        #endregion

        #region Kanban

        public DbSet<KanbanCard> KanbanCards { get; set; }
        public DbSet<KanbanColumn> KanbanColumns { get; set; }
        public DbSet<KanbanAssignedTo> KanbanAssignedTos { get; set; }
        public DbSet<KanbanCardCollaborator> KanbanCardCollaborators { get; set; }

        #endregion

        #region ThirdPartyAuthentication

        public DbSet<ThirdPartyAuthentication> ThirdPartyAuthentications { get; set; }

        #endregion

        protected override void OnModelCreating(ModelBuilder builder)
        {
            TicketContextSetup.OnModelCreating(builder);

            DocumentContextSetup.OnModelCreating(builder);

            RegisterUserManagementService.OnModelCreating(builder);

            UserMangementContextSetup.OnModelCreating(builder);

            MarketplaceContextSetup.OnModelCreating(builder);



            builder.Entity<ThirdPartyAuthentication>(entity =>
            {
                entity.HasKey(e => e.ThirdPartyAuthenticationType);
            });

            #region Documents

            builder.Entity<SharedDocument>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.DocumentId });
            });

            #endregion

            #region Private Label Module

            builder.Entity<DnsRecord>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });

            builder.Entity<PrivateLabelField>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });

            builder.Entity<PrivateLabelSelectedFields>(entity =>
            {
                entity.HasKey(e => new { e.DnsRecordId, e.PrivateLabelFieldId });

                entity.HasOne(e => e.DnsRecord)
                  .WithMany(u => u.PrivateLabelSelectedFields)
                  .HasForeignKey(rf => rf.DnsRecordId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.PrivateLabelField)
                  .WithMany(u => u.PrivateLabelSelectedFields)
                  .HasForeignKey(rf => rf.PrivateLabelFieldId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });



            #endregion

            #region Invoices

            builder.Entity<Invoice>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            builder.Entity<InvoiceLineItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");

                entity.HasOne(e => e.Invoice)
                  .WithMany(u => u.InvoiceLineItems)
                  .HasForeignKey(rf => rf.InvoiceId)
                  .OnDelete(DeleteBehavior.ClientSetNull);


                entity.HasOne(e => e.InvoiceLineItemName)
                  .WithMany(u => u.InvoiceLineItems)
                  .HasForeignKey(rf => rf.InvoiceLineItemNameId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<InvoiceLineItemsName>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            builder.Entity<InvoicePayment>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Invoice)
                  .WithMany(u => u.InvoicePayments)
                  .HasForeignKey(rf => rf.InvoiceId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            #endregion

            #region FlowService

            builder.Entity<FlowNode>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");

                entity.HasOne(e => e.FlowProject)
                    .WithMany(m => m.Nodes)
                    .HasForeignKey(rf => rf.FlowProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<FlowEdge>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");

                entity.HasOne(e => e.FlowProject)
                    .WithMany(m => m.Edges)
                    .HasForeignKey(rf => rf.FlowProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<FlowViewport>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");

                entity.HasOne(e => e.FlowProject)
                    .WithMany(m => m.Viewports)
                    .HasForeignKey(rf => rf.FlowProjectId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });


            #endregion

            #region BackgroundServiceApp


            builder.Entity<QueuedActivity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });

            builder.Entity<QueuedActivityLog>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });

            #endregion

            #region Analytics

            builder.Entity<AnalyticsSession>(entity =>
            {
               
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");

            });


            builder.Entity<AnalyticsMailTracking>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
                entity.HasOne(e => e.AnalyticsMail)
                   .WithMany(s => s.AnalyticsMailTracking)
                   .HasForeignKey(s => s.AnalyticsMailId)
                   .OnDelete(DeleteBehavior.ClientSetNull);
            });


            builder.Entity<AnalyticsMail>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });


            builder.Entity<AnalyticsEvent>(entity =>
            {

                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()"); 
                entity.HasOne(e => e.Session)
                   .WithMany(s => s.Events)
                   .HasForeignKey(s => s.SessionId)
                   .OnDelete(DeleteBehavior.ClientSetNull);

            });

            builder.Entity<AnalyticsConversion>(entity =>
            {

                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
                entity.HasOne(e => e.Session)
                  .WithMany(s => s.Conversions)
                  .HasForeignKey(s => s.SessionId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

            });

            builder.Entity<AnalyticsPageView>(entity =>
            {

                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
                entity.HasOne(e => e.Session)
                  .WithMany(s => s.PageViews)
                  .HasForeignKey(s => s.SessionId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

            });

            #endregion

            #region Product and Mapping



            builder.Entity<DocumentSheet>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });

            builder.Entity<Attribute>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");

                entity.HasOne(e => e.DocumentComponent)
                    .WithMany(m => m.Attributes)
                    .HasForeignKey(rf => rf.DocumentComponentId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<SheetAttribute>(entity =>
            {
                entity.HasKey(e => new { e.ProductId, e.AttributeId });

                entity.HasOne(e => e.Attribute)
                    .WithMany(m => m.SheetAttributes)
                    .HasForeignKey(rf => rf.AttributeId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.Sheet)
                    .WithMany(m => m.SheetAttributes)
                    .HasForeignKey(rf => rf.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });


            #endregion

            #region Kanban Setup

            builder.Entity<KanbanColumn>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });


            builder.Entity<KanbanCard>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");

                entity.HasOne(e => e.KanbanColumn)
                    .WithMany(m => m.Cards)
                    .HasForeignKey(rf => rf.KanbanColumnId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<KanbanCardCollaborator>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });

            builder.Entity<KanbanAssignedTo>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.KanbanCardId });

                entity.HasOne(e => e.KanbanCard)
                    .WithMany(m => m.KanbanAssignedTos)
                    .HasForeignKey(rf => rf.KanbanCardId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            #endregion


            builder.Entity<Wallet>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            builder.Entity<WalletPaymentMethod>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Wallet)
                    .WithMany(m => m.WalletPaymentMethods)
                    .HasForeignKey(rf => rf.WalletId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });


            

            builder.Entity<SomeSheet>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });


            builder.Entity<CustomField>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });

            builder.Entity<UserCustomField>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.CustomFieldId });

                entity.HasOne(e => e.CustomField)
                    .WithMany(m => m.UserCustomFields)
                    .HasForeignKey(rf => rf.CustomFieldId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });


            builder.Entity<CompanyCustomField>(entity =>
            {
                entity.HasKey(e => new { e.CompanyId, e.CustomFieldId });

                entity.HasOne(e => e.CustomField)
                    .WithMany(m => m.CompanyCustomFields)
                    .HasForeignKey(rf => rf.CustomFieldId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });


            




            #region Document Mapping


            builder.Entity<DocumentMatchMemory>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });

            builder.Entity<DocumentMapping>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.DocumentComponents)
                    .WithMany(m => m.DocumentMappings)
                    .HasForeignKey(rf => rf.DocumentComponentId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });


            builder.Entity<DocumentType>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            builder.Entity<DocumentComponent>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.HeaderRow).HasDefaultValue(1);

                entity.HasOne(e => e.DocumentType)
                    .WithMany(m => m.DocumentComponents)
                    .HasForeignKey(rf => rf.DocumentTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });


            #endregion







            builder.Entity<AppUser>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Company)
                    .WithMany(m => m.Users)
                    .HasForeignKey(rf => rf.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.Location)
                    .WithMany(m => m.Users)
                    .HasForeignKey(rf => rf.LocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<Company>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            builder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });

            builder.Entity<ProductCategory>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasDefaultValueSql("newsequentialid()");
            });

            builder.Entity<Location>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Company)
                  .WithMany(u => u.Locations)
                  .HasForeignKey(rf => rf.CompanyId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<UserLocations>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LocationId });

                entity.HasOne(e => e.User)
                    .WithMany(m => m.UserLocations)
                    .HasForeignKey(rf => rf.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.Location)
                    .WithMany(m => m.UserLocations)
                    .HasForeignKey(rf => rf.LocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<Wallet>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.User)
                  .WithMany(u => u.Cards)
                  .HasForeignKey(rf => rf.UserId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<StoreCredit>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.User)
                  .WithMany(u => u.StoreCredits)
                  .HasForeignKey(rf => rf.UserId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.GiftFromUser)
                  .WithMany(u => u.GiftedCredit)
                  .HasForeignKey(rf => rf.GiftFromId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            // keep at the bottom
            base.OnModelCreating(builder);
        }
    }
}
