using AuthScape.Spreadsheet.Models;
using AuthScape.Spreadsheet.Models.Elements;
using AuthScape.Spreadsheet.Models.FileUploader;
using AuthScape.Spreadsheet.Models.Images;
using System.Reflection;

namespace AuthScape.Spreadsheet
{
    public interface ISpreadsheetService
    {
        SpreadSheetData GenerateSpreadsheet<T>(List<T> elements, Type type, Action<SpreadSheetColumn> Header, Func<CellElement, object> Cell, Func<SpreadSheetRow, SpreadSheetRow>? Row);
    }

    public class SpreadsheetService : ISpreadsheetService
    {
        public SpreadSheetData GenerateSpreadsheet<T>(List<T> elements, Type type, Action<SpreadSheetColumn> Header, Func<CellElement, object> Cell, Func<SpreadSheetRow, SpreadSheetRow>? Row)
        {
            var spreadSheetData = new SpreadSheetData();

            var headerCell = new List<SpreadSheetCellType>();
            var sscolumns = new List<SpreadSheetColumn>();

            var properties = type.GetProperties();
            foreach (var property in properties)
            {
                var column = new SpreadSheetColumn();
                column.columnId = property.Name;

                if (Header != null)
                {
                    Header(column);
                }

                sscolumns.Add(column);

                headerCell.Add(new SpreadSheetCellType()
                {
                    type = "header",
                    text = property.Name,
                    isHidden = column.isHidden
                });
            }

            var rows = new List<SpreadSheetRow>();
            int rowId = 0;
            foreach (var elementItem in elements)
            {
                var columns = new List<object>();

                Type type2 = elementItem.GetType();
                PropertyInfo[] properties2 = type2.GetProperties();

                foreach (var property in properties2)
                {
                    string propertyName = property.Name;
                    object propertyValue = property.GetValue(elementItem);

                    #region Add base element

                    var cellElement = new CellElement();
                    cellElement.ColumnId = property.Name;

                    var element = new Object();

                    if (Cell != null)
                    {
                        element = Cell(cellElement);
                    }

                    var _element = (CellElement)element;
                    _element.ColumnId = property.Name;
                    _element.RowId = rowId;


                    if (element is TextCellElement)
                    {
                        var textCell = (_element as TextCellElement);
                        textCell.Text = propertyValue != null ? propertyValue.ToString() : "";
                    }
                    else if (element is DropdownCellElement)
                    {
                        var dropdownCellElement = (_element as DropdownCellElement);
                        dropdownCellElement.SelectedValue = propertyValue != null ? propertyValue.ToString() : "";
                    }
                    else if (element is CheckboxCellElement)
                    {
                        var checkBoxCellElement = (_element as CheckboxCellElement);
                        checkBoxCellElement.Checked = propertyValue != null ? (bool)propertyValue : false;
                    }
                    else if (element is ImageCellElement)
                    {
                        var imageCellElement = (_element as ImageCellElement);

                        if (propertyValue.GetType() != null && propertyValue.GetType() == typeof(SheetPhoto))
                        {
                            var urls = new List<SheetPhoto>();
                            var value = (SheetPhoto)propertyValue;
                            if (propertyValue != null)
                            {
                                urls.Add(value);
                                imageCellElement.urls = urls;
                            }
                            else
                            {
                                imageCellElement.urls = null;
                            }
                        }
                        else
                        {
                            var value = (List<SheetPhoto>)propertyValue;
                            imageCellElement.urls = propertyValue != null ? value : new List<SheetPhoto>();
                        }
                    }
                    else if (element is ButtonCellElement)
                    {
                        //var buttonCellElement = (_element as ButtonCellElement);

                        //if (propertyValue.GetType() == typeof(string))
                        //{
                        //    var value = (string)propertyValue;
                        //    if (propertyValue != null)
                        //    {
                        //        buttonCellElement.Text = value;
                        //    }
                        //    else
                        //    {
                        //        buttonCellElement.Text = "";
                        //    }
                        //}
                        //else
                        //{
                        //    var value = (string)propertyValue;
                        //    buttonCellElement.Text = propertyValue != null ? value : "Text Not Assigned";
                        //}
                    }
                    else if (element is SheetFileElement)
                    {
                        var sheetFileElement = (_element as SheetFileElement);

                        if (propertyValue.GetType() == typeof(SheetFile))
                        {
                            var urls = new List<SheetFile>();
                            var value = (SheetFile)propertyValue;
                            if (propertyValue != null)
                            {
                                urls.Add(value);
                                sheetFileElement.urls = urls;
                            }
                            else
                            {
                                sheetFileElement.urls = null;
                            }
                        }
                        else
                        {
                            var value = (List<SheetFile>)propertyValue;
                            sheetFileElement.urls = propertyValue != null ? value : new List<SheetFile>();
                        }

                    }
                    else if (element is NumberCellElement)
                    {
                        var imageCellElement = (_element as NumberCellElement);
                        imageCellElement.Value = propertyValue != null ? (decimal)propertyValue : null;
                    }
                    else if (element is MoneyCellElement)
                    {
                        var imageCellElement = (_element as MoneyCellElement);
                        imageCellElement.Value = propertyValue != null ? (decimal)propertyValue : null;
                    }
                    else if (element is DateCellElement)
                    {
                        var imageCellElement = (_element as DateCellElement);
                        imageCellElement.Date = propertyValue != null ? (DateTime)propertyValue : null;
                    }
                    else if (element is RichTextCellElement)
                    {
                        var imageCellElement = (_element as RichTextCellElement);
                        if (propertyValue != null && !String.IsNullOrWhiteSpace(propertyValue.ToString()))
                        {
                            imageCellElement.Text = propertyValue.ToString();
                        }
                    }


                    columns.Add(element);

                    #endregion
                }

                if (Row != null)
                {
                    rows.Add(Row(new SpreadSheetRow()
                    {
                        Cells = columns,
                        RowId = rowId,
                    }));
                }
                else
                {
                    rows.Add(new SpreadSheetRow()
                    {
                        Cells = columns,
                        RowId = rowId,
                    });
                }

                rowId++;
            }

            spreadSheetData.Rows = rows;
            spreadSheetData.columns = sscolumns;
            spreadSheetData.HeaderCell = headerCell;

            return spreadSheetData;
        }
    }
}
