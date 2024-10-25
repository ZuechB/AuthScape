using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddedTabs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CompanyId",
                table: "CustomFields",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TabId",
                table: "CustomFields",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CustomFieldsTab",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "newsequentialid()"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomFieldsTab", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomFields_TabId",
                table: "CustomFields",
                column: "TabId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomFields_CustomFieldsTab_TabId",
                table: "CustomFields",
                column: "TabId",
                principalTable: "CustomFieldsTab",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomFields_CustomFieldsTab_TabId",
                table: "CustomFields");

            migrationBuilder.DropTable(
                name: "CustomFieldsTab");

            migrationBuilder.DropIndex(
                name: "IX_CustomFields_TabId",
                table: "CustomFields");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "CustomFields");

            migrationBuilder.DropColumn(
                name: "TabId",
                table: "CustomFields");
        }
    }
}
