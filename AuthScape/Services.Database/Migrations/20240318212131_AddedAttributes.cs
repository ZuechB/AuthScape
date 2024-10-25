using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddedAttributes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "DocumentComponentId",
                table: "Attributes",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsRequired",
                table: "Attributes",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Attributes_DocumentComponentId",
                table: "Attributes",
                column: "DocumentComponentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attributes_DocumentComponents_DocumentComponentId",
                table: "Attributes",
                column: "DocumentComponentId",
                principalTable: "DocumentComponents",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attributes_DocumentComponents_DocumentComponentId",
                table: "Attributes");

            migrationBuilder.DropIndex(
                name: "IX_Attributes_DocumentComponentId",
                table: "Attributes");

            migrationBuilder.DropColumn(
                name: "DocumentComponentId",
                table: "Attributes");

            migrationBuilder.DropColumn(
                name: "IsRequired",
                table: "Attributes");
        }
    }
}
