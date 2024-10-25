using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class KabanCardCollab : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RoleId",
                table: "KanbanColumns",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "KanbanCardCollaborators",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "newsequentialid()"),
                    FromRoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FromColumnId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ToRoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ToColumnId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KanbanCardCollaborators", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KanbanCardCollaborators");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "KanbanColumns");
        }
    }
}
