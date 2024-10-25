using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddAnalyticsTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IPAddress",
                table: "AnalyticsEvents");

            migrationBuilder.RenameColumn(
                name: "IPAddress",
                table: "AnalyticsPageViews",
                newName: "Referrer");

            migrationBuilder.AlterColumn<string>(
                name: "Uri",
                table: "AnalyticsPageViews",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "AnalyticsPageViews",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "newsequentialid()",
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Deleted",
                table: "AnalyticsPageViews",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Host",
                table: "AnalyticsPageViews",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "SessionId",
                table: "AnalyticsPageViews",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "AnalyticsEvents",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "newsequentialid()",
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "Deleted",
                table: "AnalyticsEvents",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Host",
                table: "AnalyticsEvents",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "SessionId",
                table: "AnalyticsEvents",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "AnalyticsSessions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "newsequentialid()"),
                    UserId = table.Column<long>(type: "bigint", nullable: true),
                    LocationId = table.Column<long>(type: "bigint", nullable: true),
                    CompanyId = table.Column<long>(type: "bigint", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Started = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    Ended = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    Deleted = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    Duration = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    UserAgent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IPAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Device = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnalyticsSessions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AnalyticsConversions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "newsequentialid()"),
                    SessionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: true),
                    LocationId = table.Column<long>(type: "bigint", nullable: true),
                    CompanyId = table.Column<long>(type: "bigint", nullable: true),
                    TransactionId = table.Column<long>(type: "bigint", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Created = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnalyticsConversions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnalyticsConversions_AnalyticsSessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "AnalyticsSessions",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnalyticsPageViews_SessionId",
                table: "AnalyticsPageViews",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_AnalyticsEvents_SessionId",
                table: "AnalyticsEvents",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_AnalyticsConversions_SessionId",
                table: "AnalyticsConversions",
                column: "SessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_AnalyticsEvents_AnalyticsSessions_SessionId",
                table: "AnalyticsEvents",
                column: "SessionId",
                principalTable: "AnalyticsSessions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AnalyticsPageViews_AnalyticsSessions_SessionId",
                table: "AnalyticsPageViews",
                column: "SessionId",
                principalTable: "AnalyticsSessions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnalyticsEvents_AnalyticsSessions_SessionId",
                table: "AnalyticsEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_AnalyticsPageViews_AnalyticsSessions_SessionId",
                table: "AnalyticsPageViews");

            migrationBuilder.DropTable(
                name: "AnalyticsConversions");

            migrationBuilder.DropTable(
                name: "AnalyticsSessions");

            migrationBuilder.DropIndex(
                name: "IX_AnalyticsPageViews_SessionId",
                table: "AnalyticsPageViews");

            migrationBuilder.DropIndex(
                name: "IX_AnalyticsEvents_SessionId",
                table: "AnalyticsEvents");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "AnalyticsPageViews");

            migrationBuilder.DropColumn(
                name: "Host",
                table: "AnalyticsPageViews");

            migrationBuilder.DropColumn(
                name: "SessionId",
                table: "AnalyticsPageViews");

            migrationBuilder.DropColumn(
                name: "Deleted",
                table: "AnalyticsEvents");

            migrationBuilder.DropColumn(
                name: "Host",
                table: "AnalyticsEvents");

            migrationBuilder.DropColumn(
                name: "SessionId",
                table: "AnalyticsEvents");

            migrationBuilder.RenameColumn(
                name: "Referrer",
                table: "AnalyticsPageViews",
                newName: "IPAddress");

            migrationBuilder.AlterColumn<string>(
                name: "Uri",
                table: "AnalyticsPageViews",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "AnalyticsPageViews",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldDefaultValueSql: "newsequentialid()");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "AnalyticsEvents",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldDefaultValueSql: "newsequentialid()");

            migrationBuilder.AddColumn<string>(
                name: "IPAddress",
                table: "AnalyticsEvents",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
