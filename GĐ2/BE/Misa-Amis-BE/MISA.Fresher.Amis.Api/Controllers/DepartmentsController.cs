using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MiSA.Fresher.Amis.Core.Entities;
using MiSA.Fresher.Amis.Core.InterFace.Service;
using MiSA.Fresher.Amis.Core.Service;

namespace MISA.Fresher.Amis.Api.Controllers
{

    /// <summary>
    /// Kế thừa từ base controller, và thêm các chức năng dùng riêng cho phòng ban
    /// </summary>
    /// CreatedBy: DQDUY (20/12/2021)
    public class DepartmentsController : BaseController<Department>
    {
        private IDepartmentService _departmentsService;
        public DepartmentsController(IDepartmentService departmentService):base(departmentService)
        {
            _departmentsService = departmentService;
        }

        /// <summary>
        /// Phương thức GET, lọc dữ liệu phòng ban
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        /// CreatedBy: DQDUY (20/12/2021)
        [HttpGet("filter")]
        public IActionResult Filter(string? filter)
        {
            try
            {
                var result = _departmentsService.FilterDepartment(filter);
                return Ok(result);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
    }
}
