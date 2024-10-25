using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class UpgradeCustomTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "CustomFields",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "newsequentialid()",
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_UserCustomFields_CustomFieldId",
                table: "UserCustomFields",
                column: "CustomFieldId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserCustomFields_CustomFields_CustomFieldId",
                table: "UserCustomFields",
                column: "CustomFieldId",
                principalTable: "CustomFields",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserCustomFields_CustomFields_CustomFieldId",
                table: "UserCustomFields");

            migrationBuilder.DropIndex(
                name: "IX_UserCustomFields_CustomFieldId",
                table: "UserCustomFields");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "CustomFields",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldDefaultValueSql: "newsequentialid()");
        }
    }
}
