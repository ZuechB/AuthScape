using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddedCompanyIdStuff : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "KanbanCards");

            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "KanbanCards");

            migrationBuilder.AddColumn<string>(
                name: "UserCount",
                table: "KanbanCards",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserCount",
                table: "KanbanCards");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "KanbanCards",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "KanbanCards",
                type: "datetime2",
                nullable: true);
        }
    }
}
