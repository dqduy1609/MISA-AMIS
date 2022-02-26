using MiSA.Fresher.Amis.Core.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MiSA.Fresher.Amis.Core.Entities
{
    public class Department
    {
        /// <summary>
        /// Id phòng ban
        /// </summary>
        /// CreateBy: DQDUY (20/12/2021)
        [NotEmpty]
        [PropertyName("Mã phòng ban")]
        public Guid DepartmentId { get; set; }
        /// <summary>
        /// Mã phòng ban
        /// </summary>
        /// CreateBy: DQDUY (20/12/2021)
        

        public string? DepartmentName { get; set; }
        /// <summary>
        /// Mô tả
        /// </summary>
        /// CreateBy: DQDUY (20/12/2021)
        public string? Description { get; set; }
        /// <summary>
        /// Người tạo bản ghi
        /// </summary>
        /// CreateBy: DQDUY(20/12/2021)
        public string? CreatedBy { get; set; }
        /// <summary>
        /// Ngày tạo
        /// </summary>
        ///  CreateBy: DQDUY(20/12/2021)
        public DateTime CreatedDate { get; set; }
        /// <summary>
        /// Người sửa
        /// </summary>
        /// CreateBy: DQDUY(20/12/2021)
        public string? ModifiedBy { get; set; }
        /// <summary>
        /// Ngày sửa
        /// </summary>
        /// CreateBy: DQDUY(20/12/2021)
        public DateTime? ModifiedDate { get; set; }
    }
}
