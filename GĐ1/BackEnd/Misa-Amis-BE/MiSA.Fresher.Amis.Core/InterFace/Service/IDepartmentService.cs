using MiSA.Fresher.Amis.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiSA.Fresher.Amis.Core.InterFace.Service
{
    /// <summary>
    /// Kế thừa lại IBaseService và thêm các phần riêng cho phòng ban
    /// </summary>
    /// CreatedBy: DQDUY (20/12/2021)
    public interface IDepartmentService: IBaseService<Department>
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
