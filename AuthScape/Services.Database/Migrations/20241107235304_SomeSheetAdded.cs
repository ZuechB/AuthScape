using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class SomeSheetAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InboundSheets");

            migrationBuilder.CreateTable(
                name: "SomeSheet",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "newsequentialid()"),
                    CustomerNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TestAccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Supplier = table.Column<long>(type: "bigint", nullable: true),
                    DealerId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GrossSales = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Rebatable = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PONumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TransactionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PublishedToPlatformDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    UploadId = table.Column<long>(type: "bigint", nullable: false),
                    RemoveRecord = table.Column<bool>(type: "bit", nullable: false),
                    UpdateRecord = table.Column<bool>(type: "bit", nullable: false),
                    AddRecord = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SomeSheet", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SomeSheet");

            migrationBuilder.CreateTable(
                name: "InboundSheets",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Dealer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GrossSales = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IndealAccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InvoiceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PONumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rebatable = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SalesDataId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Supplier = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InboundSheets", x => x.Id);
                });
        }
    }
}
