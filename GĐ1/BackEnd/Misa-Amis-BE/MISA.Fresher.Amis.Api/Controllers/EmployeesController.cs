using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiSA.Fresher.Amis.Core.Common;
using MiSA.Fresher.Amis.Core.Entities;
using MiSA.Fresher.Amis.Core.InterFace.Service;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace MISA.Fresher.Amis.Api.Controllers
{
    /// <summary>
    /// Kế thừa lại Base Controller và thêm các chức năng riêng cho phần nhân viên
    /// </summary>
    /// CreatedBy: DQDUY (20/12/2021)
    public class EmployeesController : BaseController<Employee>
    {
        IEmployeeService _employeeService;
        public EmployeesController(IEmployeeService employeeService):base(employeeService)
        {
            _employeeService = employeeService;
        }

        /// <summary>
        /// Phương thức GET, lọc dữ liệu nhân viên
        /// </summary>
        /// <param name="pageRequest"></param>
        /// <returns></returns>
        /// CreatedBy: DQDUY (20/12/2021)
        [HttpGet("filter")]
        public IActionResult GetAllPaging([FromQuery] PageRequestBase pageRequest)
        {
            try
            {
               var result = _employeeService.GetPaging(pageRequest);
                return Ok(result);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Xoá nhiều nhân viên
        /// </summary>
        /// <param name="listId"></param>
        /// <returns></returns>
        /// CreatedBy: DQDUY (20/12/2021)
        [HttpPost("MultiDelete")]
        public IActionResult DeleteMulti([FromBody] List<string> listId)
        {
            try
            {
                var result = _employeeService.DeleteMultiRecord(listId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        /// <summary>
        /// Phương thức GET, sinh mã nhân viên mới
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: DQDUY (20/12/2021)
        [HttpGet("NewEmployeeCode")]
        public IActionResult GetNewCode()
        {
            var result = _employeeService.NewCodeEmployee();
            return Ok(result);
        }

        /// <summary>
        /// Xuất dữ liệu ra file excel, lấy toàn bộ dữ liệu
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: DQDUY (20/12/2021)
        [HttpGet("Export2")]
        public IActionResult Export2()
        {
            var result = _employeeService.GetAll();
            var stream = new MemoryStream();

            using(var package = new ExcelPackage(stream))
            {
                var sheet = package.Workbook.Worksheets.Add("NhanVien");
                // đổ dữ liệu vào sheet
                sheet.Cells.LoadFromCollection(result, true);
                //save
                package.Save();
            }

            stream.Position = 0;
            var fileName = $"NhanVien_{DateTime.Now.ToString("yyyyMMddHHmmss")}.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                fileName);
        }

        /// <summary>
        /// Xuất file excel, chỉ lấy những trường mong muốn
        /// </summary>
        /// <returns></returns>
        /// CreatedBy: DQDUY (20/12/2021)
        [HttpGet("ExportToExcel")]
        public IActionResult Export()
        {
            var result = _employeeService.GetAll();
            var stream = new MemoryStream();
            var filePath = Path.GetFullPath(Path.Combine(Environment.CurrentDirectory, @"..\MiSA.Fresher.Amis.Core\ExcelTemplate\Danh_sach_nhan_vien.xlsx"));
            FileInfo existingFile = new FileInfo(filePath);
            ExcelPackage.LicenseContext = LicenseContext.Commercial;
            //Format Ctrl+A -> Home -> Format -> Column(with, height)

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            using (ExcelPackage package = new ExcelPackage(existingFile))
            {
                // lấy trang tính đầu tiên
                ExcelWorksheet sheet = package.Workbook.Worksheets[0];
                // đổ dữ liệu vào sheet

                int rowId = 4;
                int stt = 1;
                foreach (var row in result)
                {
                    sheet.Cells[rowId, 1].AutoFitColumns(10, 10);
                    for (int i = 1; i <= 9; i++)
                    {
                        // Thêm border cho cột
                        sheet.Cells[rowId, i].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                        sheet.Cells[rowId, i].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                        sheet.Cells[rowId, i].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        sheet.Cells[rowId, i].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                        // Thêm width vs height cho cột
                        sheet.Cells[rowId, i + 1].AutoFitColumns(20, 20);
                        sheet.Cells[rowId, i + 1].Merge = true;
                    }

                    sheet.Cells[rowId, 1].Value = stt;
                    sheet.Cells[rowId, 2].Value = row.EmployeeCode;
                    sheet.Cells[rowId, 3].Value = row.EmployeeName;
                    sheet.Cells[rowId, 4].Value = row.GenderName;
                    sheet.Cells[rowId, 5].Value = row.DateOfBirth;
                    sheet.Cells[rowId, 6].Value = row.EmployeePosition;
                    sheet.Cells[rowId, 7].Value = row.DepartmentName;
                    sheet.Cells[rowId, 8].Value = row.BankAccountNumber;
                    sheet.Cells[rowId, 9].Value = row.BankName;
                    stt++;
                    rowId++;
                }
                stream = new MemoryStream(package.GetAsByteArray());
            }
                   
              
            
            stream.Position = 0;
            var fileName = $"DanhSachNhanVien_{DateTime.Now.ToString("dd-MM-yyyy")}.xlsx";
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                fileName);
        }
    }
}
