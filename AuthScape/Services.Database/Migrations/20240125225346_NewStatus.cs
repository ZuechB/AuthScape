using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class NewStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsArchived",
                table: "DocumentComponents");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "DocumentComponents",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "DocumentComponents");

            migrationBuilder.AddColumn<bool>(
                name: "IsArchived",
                table: "DocumentComponents",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
