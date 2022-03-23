using MISA.AMIS.CORE.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.AMIS.CORE.Modal
{
    public class AccountObjectCustom : BaseEntity
    {
        /// <summary>
        /// Khóa chính
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public Guid AccountObjectId { get; set; }
        /// <summary>
        /// Mã số thuế
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string TaxCode { get; set; }
        /// <summary>
        /// Mã nhà cung cấp
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string AccountObjectCode { get; set; }
        /// <summary>
        /// Tên nhà cung cấp
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string AccountObjectName { get; set; }
        /// <summary>
        /// Số điện thoại
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string Phone { get; set; }
        /// <summary>
        /// Tên miền website
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string Website { get; set; }
        /// <summary>
        /// Danh sách id nhóm nhà cung cấp
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string AccountObjectGroupListId { get; set; }
        /// <summary>
        /// địa chỉ
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string Address { get; set; }
        /// <summary>
        /// Id của nhân viên
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public Guid? EmployeeId { get; set; }
        /// <summary>
        /// Xưng hô
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string Prefix { get; set; }
        /// <summary>
        /// Họ và tên người liên hệ
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string EinvoiceContactName { get; set; }
        /// <summary>
        /// Số điện thoại người liên hệ
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string EinvoiceContactMobile { get; set; }
        /// <summary>
        /// Email người liên hệ
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string EinvoiceContactEmail { get; set; }
        /// <summary>
        /// Đại diện theo PL
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string LegalRepresentative { get; set; }
        /// <summary>
        /// Id của điều khoản
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public Guid? PaymentTermId { get; set; }
        /// <summary>
        /// Tài khoản nợ công phải trả
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string PayAccount { get; set; }
        /// <summary>
        /// NỢ tối đa
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string MaximizeDebtAmount { get; set; }
        /// <summary>
        /// Số ngày được nợ
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public int DueTime { get; set; }
        /// <summary>
        /// Danh sách tài khoản ngân hàng
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string AccountObjectBankAccount { get; set; }
        /// <summary>
        /// Danh sách địa chỉ
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string AccountObjectShippingAddress { get; set; }
        /// <summary>
        /// Đất Nước
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)

        public string Country { get; set; }
        /// <summary>
        /// Quận huyện
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string District { get; set; }
        /// <summary>
        /// Phường xã
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string WardOrCommune { get; set; }
        /// <summary>
        /// Thành phố
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string ProvinceOrCity { get; set; }
        /// <summary>
        /// Ghi chú
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string Description { get; set; }
        /// <summary>
        /// Người tạo bản ghi
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string CreatedBy { get; set; }
        /// <summary>
        /// Ngày tạo
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public DateTime CreatedDate { get; set; }
        /// <summary>
        /// Người sửa
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public string ModifiedBy { get; set; }
        /// <summary>
        /// Ngày sửa
        /// </summary>
        /// CreatedBy: DQDUY(1/3/2022)
        public DateTime ModifiedDate { get; set; }
    }
}
