using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class ProductCategoryField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductCategoryFields",
                table: "ProductCategoryFields");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "ProductCategoryFields",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "newsequentialid()");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductCategoryFields",
                table: "ProductCategoryFields",
                columns: new[] { "Id", "ProductId", "ProductFieldId" });

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategoryFields_ProductId",
                table: "ProductCategoryFields",
                column: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ProductCategoryFields",
                table: "ProductCategoryFields");

            migrationBuilder.DropIndex(
                name: "IX_ProductCategoryFields_ProductId",
                table: "ProductCategoryFields");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ProductCategoryFields");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProductCategoryFields",
                table: "ProductCategoryFields",
                columns: new[] { "ProductId", "ProductFieldId" });
        }
    }
}
