using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class NewTemplateCollection : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "AnalyticsMailTrackings",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "newsequentialid()",
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "AnalyticsMailId",
                table: "AnalyticsMailTrackings",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "AnalyticsMails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "newsequentialid()"),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Html = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TemplateId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TemplateName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MessageId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnalyticsMails", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnalyticsMailTrackings_AnalyticsMailId",
                table: "AnalyticsMailTrackings",
                column: "AnalyticsMailId");

            migrationBuilder.AddForeignKey(
                name: "FK_AnalyticsMailTrackings_AnalyticsMails_AnalyticsMailId",
                table: "AnalyticsMailTrackings",
                column: "AnalyticsMailId",
                principalTable: "AnalyticsMails",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnalyticsMailTrackings_AnalyticsMails_AnalyticsMailId",
                table: "AnalyticsMailTrackings");

            migrationBuilder.DropTable(
                name: "AnalyticsMails");

            migrationBuilder.DropIndex(
                name: "IX_AnalyticsMailTrackings_AnalyticsMailId",
                table: "AnalyticsMailTrackings");

            migrationBuilder.DropColumn(
                name: "AnalyticsMailId",
                table: "AnalyticsMailTrackings");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "AnalyticsMailTrackings",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldDefaultValueSql: "newsequentialid()");
        }
    }
}
