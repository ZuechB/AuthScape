using AuthScape.Models.Mail;
using AuthScape.Models.Users;
using AuthScape.SendGrid;
using AuthScape.Services;
using AuthScape.TicketSystem.Modals;
using AuthScape.TicketSystem.Models;
using CoreBackpack;
using CoreBackpack.Time;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Models.Email;
using Services;
using Services.Context;
using Services.Database;
using StrongGrid.Resources;

namespace AuthScape.TicketSystem.Services
{
    public interface ITicketService
    {
        Task InboundEmail(string fromEmail, EMailAddress[] To, string text, Attachments[] attachments);
        Task<long> CreateTicket(int ticketTypeId, int ticketStatusId, string? description, string message);
        Task<long> CreateTicketPublic(string email, string firstName, string lastName, int ticketTypeId, int ticketStatusId, string? description);
        Task<PagedList<TicketMessageQuery>> GetTicketMessages(long ticketId, bool isNote, int pageNumber = 1, int pageSize = 20);
        Task<PagedList<TicketView>> GetTickets(int pageNumber = 0, int pageSize = 20, int? ticketStatusId = null, int? ticketTypeId = null);
        Task CreateTicketStatus(string name);
        Task CreateTicketType(string name);
        Task<List<TicketStatus>> GetTicketStatuses();
        Task<List<TicketType>> GetTicketTypes();
        Task<TicketViewModel> GetTicket(long ticketId);
        Task CreateTicketMessage(long ticketId, string name, string message, long? createdByUserId = null, bool isNote = false);
        Task ArchiveTicket(long id);
        Task<List<TicketAutoComplete>> FindUser(string query);
        Task UpdateParticipants(long ticketId, List<ParticipantViewModel> Participants);
        Task UpdateStatus(long ticketId, int TicketStatusId);
        Task UpdateTicketType(long ticketId, int ticketTypeId);
        Task UpdateTicketPriority(long ticketId, PriorityLevel priorityLevel);
    }

    public class TicketService : ITicketService
    {
        readonly DatabaseContext databaseContext;
        readonly IUserManagementService userManagementService;
        readonly ISendGridService sendGridService;
        readonly INotificationService notificationService;
        readonly AppSettings appSettings;

        public TicketService(DatabaseContext databaseContext, IUserManagementService userManagementService, ISendGridService sendGridService, IOptions<AppSettings> appSettings, INotificationService notificationService)
        {
            this.databaseContext = databaseContext;
            this.userManagementService = userManagementService;
            this.sendGridService = sendGridService;
            this.appSettings = appSettings.Value;
            this.notificationService = notificationService;
        }

        public async Task InboundEmail(string fromEmail, EMailAddress[] To, string text, Attachments[] attachments)
        {
            var ticketId = EmailParse.ParseEmailAddress(To, "ticket");
            if (ticketId != null)
            {
                var fromUser = await databaseContext.Users.Where(u => u.UserName.ToLower() == fromEmail.ToLower()).FirstOrDefaultAsync();

                // will attempt to parse the email text
                text = ParseEmailText(text);

                var ticket = await databaseContext.Tickets.Where(t => t.Id == ticketId).FirstOrDefaultAsync();
                if (ticket != null)
                {
                    if (fromUser != null)
                    {
                        await databaseContext.TicketMessages.AddAsync(new TicketMessage()
                        {
                            Message = text,
                            Name = (fromUser.FirstName + " " + fromUser.LastName),
                            Created = SystemTime.Now,
                            TicketId = ticket.Id,
                            CreatedByUserId = fromUser.Id
                        });

                        await notificationService.NotifyTicketMessageCreated(ticketId.Value, fromEmail, text, fromUser.FirstName, fromUser.LastName);
                    }
                    else
                    {
                        await databaseContext.TicketMessages.AddAsync(new TicketMessage()
                        {
                            Message = text,
                            Name = (ticket.FirstName + " " + ticket.LastName),
                            Created = SystemTime.Now,
                            TicketId = ticket.Id,
                            CreatedByUserId = null
                        });

                        await notificationService.NotifyTicketMessageCreated(ticketId.Value, fromEmail, text, ticket.FirstName, ticket.LastName);
                    }

                    ticket.LastUpdated = SystemTime.Now;
                    await databaseContext.SaveChangesAsync();


                    if (attachments != null)
                    {
                        foreach (var attachment in attachments)
                        {
                            await databaseContext.TicketAttachments.AddAsync(new TicketAttachment()
                            {
                                ContentType = attachment.ContentType,
                                FileName = attachment.FileName,
                                Name = attachment.Name,
                                TicketId = ticket.Id,
                                URL = "URL from the blob storage here..."
                            });
                        }
                    }
                }
            }
        }

        public async Task<PagedList<TicketMessageQuery>> GetTicketMessages(long ticketId, bool isNote, int pageNumber = 1, int pageSize = 20)
        {
            var user = await userManagementService.GetSignedInUser();
            

            return await databaseContext.TicketMessages
                .AsNoTracking()
                .Where(t => t.TicketId == ticketId && t.IsNote == isNote)
                .Select(t => new TicketMessageQuery()
                {
                    FirstName = t.Name,
                    Created = (t.Created.Convert(user.locale).ToShortDateString() + t.Created.Convert(user.locale).ToShortTimeString()),
                    Message = t.Message,
                })
                .ToPagedResultAsync(pageNumber - 1, pageSize);
        }

        public async Task CreateTicketMessage(long ticketId, string name, string message, long? createdByUserId = null, bool isNote = false)
        {
            var ticketMessage = new TicketMessage()
            {
                Name = name, 
                Created = SystemTime.Now,
                TicketId = ticketId,
                Message = message,
                CreatedByUserId = createdByUserId,
                IsNote = isNote
            };

            await databaseContext.TicketMessages.AddAsync(ticketMessage);
            await databaseContext.SaveChangesAsync();
            
            if (!isNote)
            {
                var ticket = await databaseContext.Tickets
                    .Where(t => t.Id == ticketId).FirstOrDefaultAsync();
                if (ticket != null)
                {
                    ticket.LastUpdated = SystemTime.Now;
                    await databaseContext.SaveChangesAsync();

                    var participants = await databaseContext.TicketParticipants.Where(p => p.TicketId == ticketId).ToListAsync();
                    if (participants != null)
                    {

                        foreach (var participant in participants)
                        {
                            var usr = await databaseContext.Users.AsNoTracking().Where(u => u.Id == participant.UserId).FirstOrDefaultAsync();
                            await sendGridService.Send(usr, appSettings.Ticketing.TemplateId, new SendGridTicket()
                            {
                                Title = "New message from " + appSettings.Ticketing.Name,
                                Body = message

                            }, subject: appSettings.Ticketing.Subject, ("ticket-" + ticketId + "@" + appSettings.Ticketing.Domain), appSettings.Ticketing.Name);
                        }
                    }


                    if (ticket.CreatedById != null)
                    {
                        var user = await databaseContext.Users.Where(u => u.Id == ticket.CreatedById).FirstOrDefaultAsync();
                        if (user != null)
                        {
                            await sendGridService.Send(user, appSettings.Ticketing.TemplateId, new SendGridTicket()
                            {
                                Title = "New message from " + appSettings.Ticketing.Name,
                                Body = message

                            }, subject: appSettings.Ticketing.Subject, ("ticket-" + ticketId + "@" + appSettings.Ticketing.Domain), appSettings.Ticketing.Name);
                        }
                    }
                    else
                    {
                        await sendGridService.Send(new AppUser()
                        {
                            FirstName = ticket.FirstName,
                            LastName = ticket.LastName,
                            Email = ticket.Email,
                            IsActive = true

                        }, appSettings.Ticketing.TemplateId, new SendGridTicket()
                        {
                            Title = "New message from " + appSettings.Ticketing.Name,
                            Body = message

                        }, subject: appSettings.Ticketing.Subject, ("ticket-" + ticketId + "@" + appSettings.Ticketing.Domain), appSettings.Ticketing.Name);
                    }


                }
            }

        }

        public async Task<PagedList<TicketView>> GetTickets(int pageNumber = 0, int pageSize = 20, int? ticketStatusId = null, int? ticketTypeId = null)
        {
            var user = await userManagementService.GetSignedInUser();

            var tickets = databaseContext.Tickets
                .Include(t => t.TicketStatus)
                .Include(t => t.TicketType)
                .Include(t => t.TicketParticipants)
                .Include(t => t.TicketMessages)
                .AsNoTracking();

            if (ticketStatusId != null)
            {
                tickets = tickets.Where(p => p.TicketStatusId == (int)ticketStatusId.Value);
            }

            if (ticketTypeId != null)
            {
                tickets = tickets.Where(p => p.TicketTypeId == (int)ticketTypeId.Value);
            }

            var ticketList = tickets.ToList();

            return await tickets
                .Select(t => new TicketView()
                {
                    Id = t.Id,
                    Title = t.Title,
                    TicketStatus = t.TicketStatus.Name,
                    TicketType = t.TicketType.Name,
                    FirstName = t.FirstName,
                    LastName = t.LastName,
                    Email = t.Email,
                    CompanyName = t.CompanyName,
                    LocationName = t.LocationName,
                    Created = (t.Created.Convert(user.locale).ToShortDateString() + " " + t.Created.Convert(user.locale).ToShortTimeString()),
                    TicketParticipants = t.TicketParticipants.Count(),
                    Messages = t.TicketMessages.Count()
                })
                .OrderByDescending(o => o.Id)
                .ToPagedResultAsync(pageNumber, pageSize);
        }

        public async Task<TicketViewModel> GetTicket(long ticketId)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            var ticket = await databaseContext.Tickets
                .Include(t => t.TicketStatus)
                .Include(t => t.TicketType)
                .Include(t => t.TicketAttachments)
                .AsNoTracking()
                .Where(t => t.Id == ticketId)
                .FirstOrDefaultAsync();


            var ticketStatus = await databaseContext.TicketStatuses.ToListAsync();
            var ticketTypes = await databaseContext.TicketTypes.ToListAsync();


            var created = ticket.Created.Convert(signedInUser.locale);
            var lastUpdated = ticket.LastUpdated.Convert(signedInUser.locale);

            var createdBy = await databaseContext.Users.AsNoTracking().Where(u => u.Id == ticket.CreatedById).FirstOrDefaultAsync();


            var listParticipants = new List<TicketAutoComplete>();

            var ticketParticipants = await databaseContext.TicketParticipants.Where(t => t.TicketId == ticket.Id).ToListAsync();
            foreach (var participant in ticketParticipants)
            {
                //if (createdBy != null)
                //{
                //    var usr = await databaseContext.Users.AsNoTracking().Where(u => u.Id == participant.UserId).Select(s => new TicketAutoComplete()
                //    {
                //        Id = s.Id,
                //        Label = createdBy.FirstName + " " + createdBy.LastName + " (" + createdBy.UserName + ")"
                //    }).FirstOrDefaultAsync();

                //    if (usr != null)
                //    {
                //        listParticipants.Add(usr);
                //    }
                //}
                //else
                //{
                    var usr = await databaseContext.Users.AsNoTracking().Where(u => u.Id == participant.UserId).Select(s => new TicketAutoComplete()
                    {
                        Id = s.Id,
                        Label = s.FirstName + " " + s.LastName + " (" + s.UserName + ")"
                    }).FirstOrDefaultAsync();

                    if (usr != null)
                    {
                        listParticipants.Add(usr);
                    }
                //}
            }

            return new TicketViewModel() {
                Created = created.ToShortDateString() + " " + created.ToShortTimeString(),
                LastUpdated = lastUpdated.ToShortDateString() + " " + lastUpdated.ToShortTimeString(),
                Id = ticket.Id,
                CompanyName = ticket.CompanyName,
                PriorityLevel = ticket.PriorityLevel,
                TicketStatuses = ticketStatus,
                CustomTabPayload = ticket.CustomTabPayload,
                Name = ticket.TicketType.Name,
                Description = ticket.Description,
                AssignedFirstName = ticket.FirstName,
                AssignedLastName = ticket.LastName,
                AssignedEmail = ticket.Email,
                TicketTypes = ticketTypes,
                SelectedTicketStatusId = ticket.TicketStatusId,
                SelectedTicketTypeId = ticket.TicketTypeId,
                SelectedPriortyId = (int)ticket.PriorityLevel,

                selectedCreatedBy = createdBy != null ? new TicketAutoComplete()
                {
                    Id = createdBy.Id,
                    Label = createdBy.FirstName + " " + createdBy.LastName + " (" + createdBy.UserName + ")",
                } : null,
                Participants = listParticipants,
                Attachments = ticket.TicketAttachments.Select(t => new TicketAttachment() {
                    FileName = t.FileName,
                    Name = t.Name,
                    URL = t.URL,
                    ContentType = t.ContentType
                }).ToList()
            };
        }

        public async Task<long> CreateTicket(int ticketTypeId, int ticketStatusId, string? description, string message)
        {
            var signedInUser = await userManagementService.GetSignedInUser();

            var newTicket = new Ticket()
            {
                Email = signedInUser.Email,
                Title = description + " from " + signedInUser.FirstName,
                FirstName = signedInUser.FirstName,
                LastName = signedInUser.LastName,
                TicketTypeId = ticketTypeId,
                TicketStatusId = ticketStatusId,
                CreatedById = signedInUser.Id,
                Description = description,
                PriorityLevel = PriorityLevel.Medium,
                Created = SystemTime.Now,
                LastUpdated = SystemTime.Now,
            };

            await databaseContext.Tickets.AddAsync(newTicket);
            await databaseContext.SaveChangesAsync();

            await databaseContext.TicketMessages.AddAsync(new TicketMessage()
            {
                TicketId = newTicket.Id,
                CreatedByUserId = signedInUser.Id,
                Message = message,
                Created = SystemTime.Now,
                Name = (signedInUser.FirstName + " " + signedInUser.LastName),
                IsNote = false
            });
            await databaseContext.SaveChangesAsync();

            return newTicket.Id;
        }

        public async Task<long> CreateTicketPublic(string email, string firstName, string lastName, int ticketTypeId, int ticketStatusId, string? description)
        {
            var newTicket = new Ticket()
            {
                Email = email,
                Title = description + " from " + firstName,
                FirstName = firstName,
                LastName = lastName,
                TicketTypeId = ticketTypeId,
                TicketStatusId = ticketStatusId,
                CreatedById = null,
                Description = description,
                PriorityLevel = PriorityLevel.Medium,
                Created = SystemTime.Now,
                LastUpdated = SystemTime.Now,
            };

            await databaseContext.Tickets.AddAsync(newTicket);
            await databaseContext.SaveChangesAsync();

            await databaseContext.TicketMessages.AddAsync(new TicketMessage()
            {
                TicketId = newTicket.Id,
                CreatedByUserId = null,
                Message = description,
                Created = SystemTime.Now,
                Name = (firstName + " " + lastName),
                IsNote = false
            });
            await databaseContext.SaveChangesAsync();

            await notificationService.NotifyTicketCreated(newTicket);

            return newTicket.Id;
        }

        public async Task CreateTicketStatus(string name)
        {
            databaseContext.TicketStatuses.Add(new TicketStatus()
            {
                Name= name,
            });
            await databaseContext.SaveChangesAsync();
        }

        public async Task CreateTicketType(string name)
        {
            databaseContext.TicketTypes.Add(new TicketType()
            {
                Name = name,
            });
            await databaseContext.SaveChangesAsync();
        }

        public async Task<List<TicketStatus>> GetTicketStatuses()
        {
            return await databaseContext.TicketStatuses.AsNoTracking().ToListAsync();
        }

        public async Task<List<TicketType>> GetTicketTypes()
        {
            return await databaseContext.TicketTypes.AsNoTracking().ToListAsync();
        }

        public async Task ArchiveTicket(long id)
        {
            var ticketStatus = await databaseContext.TicketStatuses.Where(t => t.ArchiveStep).FirstOrDefaultAsync();

            var ticket = await databaseContext.Tickets.Where(t => t.Id == id).FirstOrDefaultAsync();
            if (ticket != null)
            {
                ticket.TicketStatusId = ticketStatus.Id;
                await databaseContext.SaveChangesAsync();
            }
        }

        private string ParseEmailText(string text)
        {
            var emailLine = text.ToLower().IndexOf("____");
            if (emailLine != -1)
            {
                text = text.Remove(emailLine);
            }

            emailLine = text.ToLower().IndexOf("from: ");
            if (emailLine != -1)
            {
                text = text.Remove(emailLine);
            }

            return text;
        }

        public async Task<List<TicketAutoComplete>> FindUser(string query)
        {
            var user = await databaseContext.Users
                .Where(u => u.UserName.ToLower().Contains(query) || (u.FirstName + " " + u.LastName).ToLower().Contains(query))
                .Take(10)
                .Select(u => new TicketAutoComplete()
                {
                    Id = u.Id,
                    Label = (u.FirstName + " " + u.LastName + " (" + u.UserName + ")")
                })
                .ToListAsync();

            return user;
        }

        public async Task UpdateParticipants(long ticketId, List<ParticipantViewModel> Participants)
        {
            databaseContext.TicketParticipants.RemoveRange(databaseContext.TicketParticipants.Where(t => t.TicketId == ticketId));
            await databaseContext.SaveChangesAsync();
            
            foreach (var participant in Participants.GroupBy(g => g.Id))
            {
                await databaseContext.TicketParticipants.AddAsync(new TicketParticipant()
                {
                    TicketId = ticketId,
                    UserId = participant.First().Id
                });
            }

            await databaseContext.SaveChangesAsync();
        }

        public async Task UpdateStatus(long ticketId, int TicketStatusId)
        {
            var ticket = await databaseContext.Tickets.Where(t => t.Id == ticketId).FirstOrDefaultAsync();
            if (ticket != null)
            {
                ticket.TicketStatusId = TicketStatusId;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task UpdateTicketType(long ticketId, int ticketTypeId)
        {
            var ticket = await databaseContext.Tickets.Where(t => t.Id == ticketId).FirstOrDefaultAsync();
            if (ticket != null)
            {
                ticket.TicketTypeId = ticketTypeId;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task UpdateTicketPriority(long ticketId, PriorityLevel priorityLevel)
        {
            var ticket = await databaseContext.Tickets.Where(t => t.Id == ticketId).FirstOrDefaultAsync();
            if (ticket != null)
            {
                ticket.PriorityLevel = priorityLevel;
                await databaseContext.SaveChangesAsync();
            }
        }
    }
}