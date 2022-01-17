using MiSA.Fresher.Amis.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiSA.Fresher.Amis.Core.InterFace.Repository
{
    /// <summary>
    /// Kế thừa lại IBaseRepository, và thêm phần riêng cho phòng ban
    /// </summary>
    /// CreatedBy : DQDUY (20/12/2021)
    public interface IDepartmentRepository:IBaseRepository<Department>
    {
        /// <summary>
        /// Lấy ra phòng ban dựa vào filterName
        /// </summary>
        /// <param name="filterName">Tên phòng ban</param>
        /// <returns>Trả về phòng ban tương ứng</returns>
        /// CreateBy:DQDUY (26/12/2021)
        IEnumerable<Department> FilterDepartment(string? filterName);
    }
}
