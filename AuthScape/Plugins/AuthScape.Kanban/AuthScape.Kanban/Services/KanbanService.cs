using AuthScape.Services;
using Microsoft.EntityFrameworkCore;
using Models.Kanban;
using Services.Context;

namespace AuthScape.Kanban.Services
{
    public interface IKanbanService
    {
        Task<IEnumerable<KanbanColumnQuery>> GetKanban(long? identifier = null);
        Task AssignColumnOrder(List<Guid> columnsIds);
        Task AssignCardToColumn(AssignedCardToColumn assignedCardToColumn);
        Task AssignCardsBasedOnOrder(Guid CardId, Guid ColumnId, List<Guid> cards);
    }

    public class KanbanService : IKanbanService
    {
        readonly DatabaseContext databaseContext;
        readonly IUserManagementService userManagementService;
        public KanbanService(DatabaseContext databaseContext, IUserManagementService userManagementService)
        {
            this.databaseContext = databaseContext;
            this.userManagementService = userManagementService;
        }

        public async Task<IEnumerable<KanbanColumnQuery>> GetKanban(long? identifier = null)
        {
            var kanbanCards = new List<KanbanColumnQuery>();

            var signedInUser = await userManagementService.GetSignedInUser();
            var roleIds = signedInUser.Roles.Select(s => s.Id).ToList();

            var columns = databaseContext.KanbanColumns
                .AsNoTracking()
                .Include(k => k.Cards)
                .Where(s => s.RoleId != null ? roleIds.Contains(s.RoleId.Value) : true)
                //.Where(s => s.CompanyId == signedInUser.CompanyId) // come back to this one
                .OrderBy(s => s.Index)
                .Select(s => new KanbanColumnQuery()
                {
                    Id = s.Id,
                    Name = s.Name,
                    Slug = s.Slug,
                    Cards = s.Cards.Where(c => c.Identifier != null ? c.Identifier == identifier : true)
                        //.Select(z => new KanbanCard()
                        //{
                        //    Id = z.Id,
                        //    Name = z.Name,
                        //    Index = z.Index
                        //})
                        .OrderBy(c => c.Index)
                        .ToList(),
                })
                .AsSingleQuery();


            // card collaborators
            foreach (var column in columns)
            {
                await AssignCollaborators(column, roleIds, identifier);
                kanbanCards.Add(column);
            }

            return kanbanCards;
        }



        private async Task AssignCollaborators(KanbanColumnQuery column, List<long> roleIds, long? identifier = null)
        {
            var collaborator = await databaseContext.KanbanCardCollaborators
                    .Where(s => roleIds.Contains(s.ToRoleId) && s.ToColumnId == column.Id)
                    .FirstOrDefaultAsync();

            if (collaborator != null)
            {
                var cards = databaseContext.KanbanCards
                    .Where(c => c.KanbanColumnId == collaborator.FromColumnId)
                    .AsSingleQuery();
                

                if (identifier != null)
                {
                    cards = cards.Where(c => c.Identifier == identifier);
                }

                var results = await cards.OrderBy(c => c.Index)
                    .ToListAsync();

                int index = 1;
                foreach (var card in results)
                {
                    card.Index = index;
                    card.KanbanColumnId = collaborator.ToColumnId;

                    index++;
                }

                column.Cards.AddRange(results);
            }



            var collaborator2 = await databaseContext.KanbanCardCollaborators
                    .Where(s => roleIds.Contains(s.FromRoleId) && s.FromColumnId == column.Id)
                    .FirstOrDefaultAsync();

            if (collaborator2 != null)
            {
                var cards = databaseContext.KanbanCards
                    .Where(c => c.KanbanColumnId == collaborator2.ToColumnId)
                    .AsSingleQuery();

                if (identifier != null)
                {
                    cards = cards.Where(c => c.Identifier == identifier);
                }

                var results = await cards.OrderBy(c => c.Index)
                    .ToListAsync();

                int index = 1;
                foreach (var card in results)
                {
                    card.Index = index;
                    card.KanbanColumnId = collaborator2.FromColumnId;

                    index++;
                }

                column.Cards.AddRange(results);
            }
        }



        public async Task AssignColumnOrder(List<Guid> columnsIds)
        {
            int index = 0;
            foreach (var columnId in columnsIds)
            {
                var column = await databaseContext.KanbanColumns
                    .Where(k => k.Id == columnId)
                    .FirstOrDefaultAsync();

                if (column != null)
                {
                    column.Index = index;
                    await databaseContext.SaveChangesAsync();
                }

                index++;
            }
        }

        public async Task AssignCardToColumn(AssignedCardToColumn assignedCardToColumn)
        {
            var card = await databaseContext.KanbanCards
                .Where(c => c.Id == assignedCardToColumn.CardId)
                .FirstOrDefaultAsync();

            if (card != null)
            {
                card.KanbanColumnId = assignedCardToColumn.ColumnId;
                await databaseContext.SaveChangesAsync();
            }

            // now that we have added the card to the column, we need to make sure it is in the correct position
            var cards = await databaseContext.KanbanCards
                .Where(c => c.KanbanColumnId == assignedCardToColumn.ColumnId)
                .ToListAsync();

            int index = 0;
            foreach (var kanbanCard in cards)
            {
                if (card != null)
                {
                    if (index == card.Index)
                    {
                        continue;
                    }
                    card.Index = index;
                    index++;
                }
            }
            await databaseContext.SaveChangesAsync();
        }

        public async Task AssignCardsBasedOnOrder(Guid CardId, Guid ColumnId, List<Guid> cards)
        {
            var queryCard = await databaseContext.KanbanCards.Where(c => c.Id == CardId).FirstOrDefaultAsync();
            if (queryCard != null) 
            {
                queryCard.KanbanColumnId = ColumnId;
                await databaseContext.SaveChangesAsync();
            }

            int index = 0;
            foreach (var card in cards)
            {
                var kanbanCard = await databaseContext.KanbanCards
                    .Where(c => c.KanbanColumnId == ColumnId && c.Id == card)
                    .FirstOrDefaultAsync();

                if (kanbanCard != null)
                {
                    kanbanCard.Index = index;
                }

                index++;
            }
            await databaseContext.SaveChangesAsync();
        }
    }
}