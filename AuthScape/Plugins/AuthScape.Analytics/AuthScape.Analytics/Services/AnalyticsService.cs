using AuthScape.Analytics.Models;
using AuthScape.Services.Azure.Storage;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Services;
using Services.Context;
using Stripe.BillingPortal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuthScape.Analytics.Services
{
    public interface IAnalyticsService
    {
        public Task<AnalyticsSession> StartSession(AnalyticsSession session);
        public Task EndSession(Guid sessionId);
        public Task<AnalyticsSession> GetSessionById(Guid sessionId);
        public Task<IEnumerable<AnalyticsSession>> GetSessionsByIpAddress(string ipAddress);
        public Task<IEnumerable<AnalyticsSession>> GetUserSessions(long userId);
        public Task TrackPageView(AnalyticsPageView analyticsPageView);
        public Task<IEnumerable<AnalyticsPageView>> GetPageViewsByUserId(long userId);
        public Task<IEnumerable<AnalyticsPageView>> GetPageViewsBySessionId(Guid sessionId);
        public Task TrackEvent(AnalyticsEvent analyticsEvent);
        public Task<IEnumerable<AnalyticsEvent>> GetEventsBySessionId(Guid sessionId);
        public Task<IEnumerable<AnalyticsEvent>> GetEventsByCategory(string category);
        public Task TrackConversion(AnalyticsConversion analyticsConversion);
        public Task<IEnumerable<AnalyticsConversion>> GetConversionsBySessionId(Guid sessionId);
        public Task<IEnumerable<AnalyticsConversion>> GetConversionsByUserId(long userId);
        public Task<decimal> GetConversionRate(string category);
        public Task<IEnumerable<IEnumerable<AnalyticsPageView>>> GetConversionPaths(string category);
        public Task<AnalyticsUserEngagement> GetUserEngagement(long userId);

    }



    public class AnalyticsService : IAnalyticsService
    {
        readonly DatabaseContext databaseContext;
        readonly IUserService userService;
        readonly IHttpContextAccessor httpContextAccessor;
        public AnalyticsService(DatabaseContext databaseContext, IUserService userService, IHttpContextAccessor httpContextAccessor) 
        { 
            this.databaseContext = databaseContext;
            this.userService = userService;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task<AnalyticsSession> StartSession(AnalyticsSession session)
        {
            if (session != null)
            {
                session.Started = DateTime.Now;
                databaseContext.Add(session);
                await databaseContext.SaveChangesAsync();

                return session;
            }

            return null;
        }

        public async Task EndSession(Guid sessionId)
        {
            var session = await databaseContext.AnalyticsSessions
                .Where(s => s.Id == sessionId).FirstOrDefaultAsync();

            if (session != null)
            {
                session.Ended = DateTime.Now;
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task<AnalyticsSession> GetSessionById(Guid sessionId)
        {
            var session = await databaseContext.AnalyticsSessions.AsNoTracking()
                .Where(s => s.Id == sessionId).FirstOrDefaultAsync();

            return session;
        }


        public async Task<IEnumerable<AnalyticsSession>> GetSessionsByIpAddress(string ipAddress)
        {
            var sessions = await databaseContext.AnalyticsSessions.AsNoTracking()
                .Where(s => s.IPAddress == ipAddress).ToListAsync();

            return sessions;
        }

        public async Task<IEnumerable<AnalyticsSession>> GetUserSessions(long userId)
        {
            var sessions = await databaseContext.AnalyticsSessions.AsNoTracking()
               .Where(s => s.UserId == userId).ToListAsync();

            return sessions;
        }

        public async Task TrackPageView(AnalyticsPageView analyticsPageView)
        {
            if (analyticsPageView != null)
            {
                analyticsPageView.IPAddress = httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
                analyticsPageView.UserAgent = httpContextAccessor.HttpContext.Request.Headers["User-Agent"].ToString();
                analyticsPageView.Referrer = httpContextAccessor.HttpContext.Request.Headers["Referer"].ToString();
                analyticsPageView.Created = DateTime.Now;
                databaseContext.AnalyticsPageViews.Add(analyticsPageView);
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<AnalyticsPageView>> GetPageViewsByUserId(long userId)
        {
            var pageViews = await databaseContext.AnalyticsPageViews.AsNoTracking()
                .Where(e => e.UserId == userId).ToListAsync();

            return pageViews;
        }

        public async Task<IEnumerable<AnalyticsPageView>> GetPageViewsBySessionId(Guid sessionId)
        {
            var pageViews = await databaseContext.AnalyticsPageViews.AsNoTracking()
                .Where(e => e.SessionId == sessionId).ToListAsync();

            return pageViews;
        }

        public async Task TrackEvent(AnalyticsEvent analyticsEvent)
        {
            if (analyticsEvent != null)
            {
                analyticsEvent.IPAddress = httpContextAccessor.HttpContext.Connection.RemoteIpAddress.ToString();
                analyticsEvent.UserAgent = httpContextAccessor.HttpContext.Request.Headers["User-Agent"].ToString();
                analyticsEvent.Referrer = httpContextAccessor.HttpContext.Request.Headers["Referer"].ToString();

                analyticsEvent.Created = DateTime.Now;
                databaseContext.AnalyticsEvents.Add(analyticsEvent);
                await databaseContext.SaveChangesAsync();
            }
        }
        public async Task<IEnumerable<AnalyticsEvent>> GetEventsBySessionId(Guid sessionId)
        {
            var events = await databaseContext.AnalyticsEvents.AsNoTracking()
               .Where(e => e.SessionId == sessionId).ToListAsync();

            return events;
        }
        public async Task<IEnumerable<AnalyticsEvent>> GetEventsByCategory(string category)
        {
           
            var events = await databaseContext.AnalyticsEvents.AsNoTracking()
                .Where(e => e.Category == category).ToListAsync();

            return events;
            
        }

        public async Task TrackConversion(AnalyticsConversion analyticsConversion)
        {
            if (analyticsConversion != null)
            {
                analyticsConversion.Created = DateTime.Now;
                databaseContext.AnalyticsConversions.Add(analyticsConversion);
                await databaseContext.SaveChangesAsync();
            }
        }
        public async Task<IEnumerable<AnalyticsConversion>> GetConversionsBySessionId(Guid sessionId)
        {
            var conversions = await databaseContext.AnalyticsConversions.AsNoTracking()
              .Where(e => e.SessionId == sessionId).ToListAsync();

            return conversions;
        }
        public async Task<IEnumerable<AnalyticsConversion>> GetConversionsByUserId(long userId)
        {
            var conversions = await databaseContext.AnalyticsConversions.AsNoTracking()
                .Where(e => e.UserId == userId).ToListAsync();

            return conversions;
        }
        public async Task<decimal> GetConversionRate(string category)
        {
            var totalConversions = await databaseContext.AnalyticsConversions
                .AsNoTracking().CountAsync(c => c.Category == category);
            var totalSessions = await databaseContext.AnalyticsSessions
                .AsNoTracking().CountAsync();

            if (totalSessions == 0) return 0;

            return (decimal)totalConversions / totalSessions * 100;
        }

        public async Task<IEnumerable<IEnumerable<AnalyticsPageView>>> GetConversionPaths(string category)
        {
            var conversions = await databaseContext.AnalyticsConversions
                .AsNoTracking()
                .Where(c => c.Category == category)
                .Include(c => c.Session)
                .ThenInclude(s => s.PageViews)
                .ToListAsync();

            return conversions.Select(c => c.Session.PageViews.OrderBy(pv => pv.Created));
        }

        public async Task<AnalyticsUserEngagement> GetUserEngagement(long userId)
        {

            var sessions = await databaseContext.AnalyticsSessions.Where(s => s.UserId == userId).ToListAsync();
            
            var totalDuration = sessions.Sum(s => (s.Ended - s.Started).Value.TotalMinutes);
            var sessionCount = sessions.Count;

            return new AnalyticsUserEngagement 
            { 
                TotalDuration = totalDuration, 
                SessionCount = sessionCount 
            };
        }




    }
}
