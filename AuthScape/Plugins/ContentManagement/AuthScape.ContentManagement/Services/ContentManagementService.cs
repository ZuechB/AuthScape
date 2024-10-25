using AuthScape.ContentManagement.Models;
using AuthScape.Models.Pages;
using AuthScape.Services;
using CoreBackpack.Services;
using CoreBackpack.Time;
using Microsoft.EntityFrameworkCore;
using Services.Context;
using System.Text;

namespace AuthScape.ContentManagement.Services
{
    public interface IContentManagementService
    {
        Task<Page?> GetFromSlug(string slug);
        Task<List<PageSummary>> GetAllPages();
        Task<Page?> GetPage(long Id);
        Task<long> CreatePage(Page page);
        Task DeletePage(long Id);
        Task SaveChanges(EditorChanges editorChanges);
    }

    public class ContentManagementService : IContentManagementService
    {
        readonly DatabaseContext databaseContext;
        readonly IUserManagementService userService;
        readonly ISlugService slugService;

        public ContentManagementService(DatabaseContext databaseContext, IUserManagementService userService, ISlugService slugService)
        {
            this.databaseContext = databaseContext;
            this.userService = userService;
            this.slugService = slugService;
        }

        public async Task<Page?> GetFromSlug(string slug)
        {
            slug = slug.Remove(0, 1);
            return await databaseContext.Pages.Where(p => p.Slug == slug).FirstOrDefaultAsync();
        }

        public async Task<List<PageSummary>> GetAllPages()
        {
            var signedInUser = await userService.GetSignedInUser();

            return await databaseContext.Pages
                .Select(p => new PageSummary()
                {
                    Id = p.Id,
                    Title = p.Title,
                    PageType = p.PageType,
                    Slug = p.Slug != null ? p.Slug : "",
                    Created = p.Created != null ? p.Created.Value.Convert(signedInUser.locale).ToString() : "",
                    LastUpdated = p.LastUpdated != null ? p.LastUpdated.Value.Convert(signedInUser.locale).ToString() : ""
                })
                .ToListAsync();
        }

        public async Task<Page?> GetPage(long Id)
        {
            return await databaseContext.Pages.Where(p => p.Id == Id).FirstOrDefaultAsync();
        }

        public async Task<long> CreatePage(Page page)
        {
            page.Created = SystemTime.Now;
            page.LastUpdated = SystemTime.Now;
            page.Slug = slugService.GenerateSlug(page.Title);

            databaseContext.Pages.Add(page);
            await databaseContext.SaveChangesAsync();

            return page.Id;
        }

        public async Task DeletePage(long Id)
        {
            var page = await databaseContext.Pages.Where(p => p.Id == Id).FirstOrDefaultAsync();
            if (page != null)
            {
                databaseContext.Pages.Remove(page);
                await databaseContext.SaveChangesAsync();
            }
        }

        public async Task SaveChanges(EditorChanges editorChanges)
        {
            var page = await databaseContext.Pages.Where(p => p.Id == editorChanges.PageId).FirstOrDefaultAsync();
            if (page != null)
            {
                page.HtmlData = editorChanges.HtmlData;
                page.CssData = editorChanges.CssData;
                await databaseContext.SaveChangesAsync();
            }
        }
    }
}
