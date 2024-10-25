using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class RememberForNextTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IfFieldEmpty",
                table: "DocumentMappings");

            migrationBuilder.AddColumn<bool>(
                name: "OnlyAddRowIfColumnFound",
                table: "DocumentMappings",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "RememberForNextTime",
                table: "DocumentMappings",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OnlyAddRowIfColumnFound",
                table: "DocumentMappings");

            migrationBuilder.DropColumn(
                name: "RememberForNextTime",
                table: "DocumentMappings");

            migrationBuilder.AddColumn<int>(
                name: "IfFieldEmpty",
                table: "DocumentMappings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
