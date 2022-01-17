using MiSA.Fresher.Amis.Core.Attributes;
using MiSA.Fresher.Amis.Core.Common;
using MiSA.Fresher.Amis.Core.Entities;
using MiSA.Fresher.Amis.Core.Exceptions;
using MiSA.Fresher.Amis.Core.InterFace.Repository;
using MiSA.Fresher.Amis.Core.InterFace.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiSA.Fresher.Amis.Core.Service
{
    public class EmployeeService : BaseService<Employee>, IEmployeeService
    {
        #region initialization
        IEmployeeRepository _employeeRepository;
        #endregion
        #region Contructor
        public EmployeeService(IEmployeeRepository employeeRepository):base(employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        #endregion
        #region Method
        public object GetPaging(PageRequestBase pageRequest)
        {
            return _employeeRepository.GetPaging(pageRequest);
        }
        #endregion

        /// <summary>
        /// Xoá nhiều bản ghi nhân viên một lúc
        /// </summary>
        /// <param name="listId"></param>
        /// <returns></returns>
        /// CreatedBy: DQDUY (20/12/2021)
        public int DeleteMultiRecord(List<string> listId)
        {
            return _employeeRepository.DeleteMultiRecord(listId);
        }
        #region Design
       
        /// <summary>
        /// Sinh mã nhân viên mới
        /// </summary>
        /// <returns></returns>
        /// CreatedBy : DQDUY (20/12/2021)
        public string NewCodeEmployee()
        {
            return _employeeRepository.NewCodeEmployee();
        }
        #endregion
    }
}
