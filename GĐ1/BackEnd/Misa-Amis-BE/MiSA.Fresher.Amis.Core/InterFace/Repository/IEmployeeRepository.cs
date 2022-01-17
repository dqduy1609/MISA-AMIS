﻿using MiSA.Fresher.Amis.Core.Common;
using MiSA.Fresher.Amis.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiSA.Fresher.Amis.Core.InterFace.Repository
{
    /// <summary>
    /// Kế thừa lại IBaseRepository và thêm các phần dùng riêng cho nhân viên
    /// </summary>
    /// CreatedBy: DQDUY (20/12/2021)
    public interface IEmployeeRepository:IBaseRepository<Employee>
    {
        /// <summary>
        /// Phân trang cho nhân viên
        /// </summary>
        /// <param name="pageSize">số bản ghi</param>
        /// <param name="pageNumber">số trang</param>
        /// <param name="employeeFilter">Dữ liệu tìm kiếm(chứa ký tự nhập vào theo mã, tên hoặc số điện thoại)</param>
        /// <returns>Trả về danh sách với số bản ghi</returns>
        /// CreateBy: DQDUY(20/12/2021)
        object GetPaging(PageRequestBase pageRequest);
        /// <summary>
        /// Xóa danh sách nhân viên theo id
        /// </summary>
        /// <param name="listId">danh sách id</param>
        /// <returns></returns>
        /// CreateBy: DQDUY(20/12/2021)
        int DeleteMultiRecord(List<string> listId);
        /// <summary>
        /// Tạo ra mã nhân viên mới
        /// </summary>
        /// <returns>Mã nhân viên</returns>
        /// CreateBy: DQDUY(20/12/2021)
        string NewCodeEmployee();
    }
}
