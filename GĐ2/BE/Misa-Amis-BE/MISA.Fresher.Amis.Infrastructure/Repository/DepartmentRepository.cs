using Dapper;
using Microsoft.Extensions.Configuration;
using MiSA.Fresher.Amis.Core.Entities;
using MiSA.Fresher.Amis.Core.InterFace.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Fresher.Amis.Infrastructure.Repository
{
    public class DepartmentRepository:BaseRepository<Department>,IDepartmentRepository
    {
        
        public DepartmentRepository(IConfiguration configuration):base(configuration)
        {

        }

        /// <summary>
        /// Lọc dữ liệu phòng ban tương ứng trong cơ sở dữ liệu
        /// </summary>
        /// <param name="filterName"></param>
        /// <returns></returns>
        /// CreatedBy: DQDUY (20/12/2021)
        public IEnumerable<Department> FilterDepartment(string? filterName)
        {
            DynamicParameters dynamicParameters = new DynamicParameters();
            dynamicParameters.Add("@filterName", filterName);
            var result = _dbConnection.Query<Department>("Proc_FilterDepartment", param: dynamicParameters, commandType: System.Data.CommandType.StoredProcedure);
            return result;
        }
    }
}
