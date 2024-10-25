using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddKanbanTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "KanbanColumns",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KanbanColumns", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KanbanCards",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    KanbanColumnId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KanbanCards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KanbanCards_KanbanColumns_KanbanColumnId",
                        column: x => x.KanbanColumnId,
                        principalTable: "KanbanColumns",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "KanbanAssignedTos",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    KanbanCardId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KanbanAssignedTos", x => new { x.UserId, x.KanbanCardId });
                    table.ForeignKey(
                        name: "FK_KanbanAssignedTos_KanbanCards_KanbanCardId",
                        column: x => x.KanbanCardId,
                        principalTable: "KanbanCards",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_KanbanAssignedTos_KanbanCardId",
                table: "KanbanAssignedTos",
                column: "KanbanCardId");

            migrationBuilder.CreateIndex(
                name: "IX_KanbanCards_KanbanColumnId",
                table: "KanbanCards",
                column: "KanbanColumnId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KanbanAssignedTos");

            migrationBuilder.DropTable(
                name: "KanbanCards");

            migrationBuilder.DropTable(
                name: "KanbanColumns");
        }
    }
}
