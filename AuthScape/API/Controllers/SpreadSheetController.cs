using AuthScape.Spreadsheet;
using AuthScape.Spreadsheet.Models.Elements;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Spreadsheet;
using AuthScape.Spreadsheet.Models.Images;
using Microsoft.AspNetCore.Http;
using CoreBackpack.Pagination;
using CoreBackpack;
using Services.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using AuthScape.Marketplace.Models;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SpreadSheetController : ControllerBase
    {
        readonly ISpreadsheetService spreadsheetService;
        readonly DatabaseContext databaseContext;

        public SpreadSheetController(ISpreadsheetService spreadsheetService, DatabaseContext databaseContext)
        {
            this.spreadsheetService = spreadsheetService;
            this.databaseContext = databaseContext;
        }

        [HttpPost]
        public async Task<IActionResult> UploadPhoto([FromForm]UploadPhotoParam param)
        {

            return Ok();
        }


        [HttpPost]
        public async Task<IActionResult> GetRecords([FromBody] PagniationModel? pagniationModel)
        {
           var sampleData = new List<Product>();

            //var totalData = databaseContext.Products.ToList().Count;

            if (pagniationModel != null)
            {
                sampleData = GenerateSampleDataWithPagination(pagniationModel.Offset, pagniationModel.Length, pagniationModel.Search, pagniationModel.IsArchived);
            } else
            {
                sampleData = GenerateSampleData();
            }

            var speadsheetData = spreadsheetService.GenerateSpreadsheet(sampleData, typeof(Product), (header) =>
            {
                if (header.columnId == "Category")
                {
                    header.width = 550;
                    header.resizable = true;
                }
                //else if (header.columnId == "Qty" || header.columnId == "Price")
                //{
                //    header.isHidden = true;
                //    header.width = 100;
                //}
                else
                {
                    header.width = 100;
                    header.resizable = true;
                }
            }, (cell) =>
            {
                if (cell.ColumnId == "Id")
                {
                    return new TextCellElement()
                    {
                        Text = "Hello World!",
                    };
                }
                else if (cell.ColumnId == "Name")
                {
                    return new TextCellElement()
                    {
                        Text = "Hello World!",
                        ReadOnly = true,
                    };
                }
                else if (cell.ColumnId == "Description")
                {
                    return new RichTextCellElement() { };
                }
                else if (cell.ColumnId == "Photo")
                {
                    return new ImageCellElement() { };
                }
                else if (cell.ColumnId == "Photos")
                {
                    return new ImageCellElement() { };
                }
                else if (cell.ColumnId == "WhenToRelease") // not finished!
                {
                    return new DateCellElement() { };
                }
                else if (cell.ColumnId == "Remove")
                {
                    return new ButtonCellElement() { Text = "Remove" };
                }
                else if (cell.ColumnId == "Qty")
                {
                    return new NumberCellElement() { };
                }
                else if (cell.ColumnId == "Price")
                {
                    return new NumberCellElement() { }; // MoneyCellElement() { };
                }
                else if (cell.ColumnId == "ProductType")
                {
                    var options = new List<OptionType>();

                    var productTypes = Enum.GetNames(typeof(ProductType));
                    foreach (var item in productTypes)
                    {
                        options.Add(new OptionType()
                        {
                            Label = item,
                            Value = ((int)(ProductType)Enum.Parse(typeof(ProductType), item)).ToString()
                        });
                    }


                    return new DropdownCellElement()
                    {
                        IsDisabled = false,
                        IsOpen = false,
                        InputValue = null,
                        SelectedValue = null,
                        Values = options
                    };
                }
                else if (cell.ColumnId == "FromWeeks")
                {
                    return new NumberCellElement()
                    {
                        HideZero = false,
                        NanToZero = true,
                    };
                }
                else if (cell.ColumnId == "WorkFromHome")
                {
                    return new CheckboxCellElement()
                    {
                        Checked = false
                    };
                }
                else if (cell.ColumnId == "HasCompleted")
                {
                    return new CheckboxCellElement()
                    {
                        Checked = false
                    };
                }
                else if (cell.ColumnId == "Category")
                {
                    //var subCategories = await databaseContext.ProductCategories
                    //    .Include(p => p.ParentCategory)
                    //    .Where(p => p.Deactivated == null && p.ParentId != null)
                    //    .Select(p => new DropDownCellValues()
                    //    {
                    //        value = p.Id.ToString(),
                    //        label = p.ParentCategory.Name + " > " + p.Name,
                    //    })
                    //    .ToListAsync();


                    return new DropdownCellElement()
                    {
                        IsDisabled = false,
                        IsOpen = false,
                        InputValue = null,
                        SelectedValue = null,
                        Values = new List<OptionType>()
                    };
                }
                else
                {
                    return new TextCellElement();
                }

            }, (row) =>
            {
                row.Height = 100;

                return row;
            });

            //speadsheetData.totalCount = totalData;

            return Ok(speadsheetData);
        }

        private PagedList<Product> GenerateSampleDataWithPagination(int offset, int length, string search, bool isArchived)
        {
            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim().ToLower();
            }

            //var productQuery = databaseContext.Products.AsNoTracking()
            //   .Where(p => string.IsNullOrWhiteSpace(search) || p.Name.Contains(search));


            //var products = productQuery.ToPagedResult(offset - 1, length);

            //foreach ( var product in products )
            //{
            //    var photos = new List<SheetPhoto>();

            //    photos.Add(new SheetPhoto("1", "photourlhere"));

            //    product.Photos = photos;
            //}

            //return products;

            return new PagedList<Product>();
        }

        private List<Product> GenerateSampleData()
        {
            //var datas = databaseContext.Products.AsNoTracking().ToList();

            //foreach (var data in datas)
            //{
            //    var photos = new List<SheetPhoto>();
            //    photos.Add(new SheetPhoto("1", "photourlhere"));
            //    data.Photos = photos;
            //}

            //return datas;

            return new List<Product>();
        }
    }

    public class UploadPhotoParam
    {
        public IFormFile File { get; set; }
        public string Identifier { get; set; }
    }

    public class PagniationModel
    {
        public int Offset { get; set; }
        public int Length { get; set; }
        public string Search { get; set; }
        public bool IsArchived { get; set; }
    }
}
