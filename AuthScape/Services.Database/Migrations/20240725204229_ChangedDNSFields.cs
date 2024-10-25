using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class ChangedDNSFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DnsRecordFields");

            migrationBuilder.CreateTable(
                name: "PrivateLabelFields",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "newsequentialid()"),
                    FieldType = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CSSSelector = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CSSProperty = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivateLabelFields", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PrivateLabelSelectedFields",
                columns: table => new
                {
                    DnsRecordId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PrivateLabelFieldId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CSSValue = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrivateLabelSelectedFields", x => new { x.DnsRecordId, x.PrivateLabelFieldId });
                    table.ForeignKey(
                        name: "FK_PrivateLabelSelectedFields_DnsRecords_DnsRecordId",
                        column: x => x.DnsRecordId,
                        principalTable: "DnsRecords",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PrivateLabelSelectedFields_PrivateLabelFields_PrivateLabelFieldId",
                        column: x => x.PrivateLabelFieldId,
                        principalTable: "PrivateLabelFields",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PrivateLabelSelectedFields_PrivateLabelFieldId",
                table: "PrivateLabelSelectedFields",
                column: "PrivateLabelFieldId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PrivateLabelSelectedFields");

            migrationBuilder.DropTable(
                name: "PrivateLabelFields");

            migrationBuilder.CreateTable(
                name: "DnsRecordFields",
                columns: table => new
                {
                    DnsRecordId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CSSSelector = table.Column<int>(type: "int", nullable: false),
                    CSSProperty = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CSSValue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FieldType = table.Column<int>(type: "int", nullable: false),
                    Selector = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DnsRecordFields", x => new { x.DnsRecordId, x.CSSSelector });
                });
        }
    }
}
