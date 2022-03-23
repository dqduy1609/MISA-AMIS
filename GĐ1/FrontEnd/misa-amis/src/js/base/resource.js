const Resource = {
    VN: {
        Warning:{
            EmployeeCodeIsEmpty: "Mã nhân viên không được để trống",
            FullNameIsEmpty: "Tên không được để trống",
            DepartmentIsEmpty: "Đơn vị không được để trống",
            EmployeeCodeIsAvailable: "Mã nhân viên này đã tồn tại trong hệ thống, vui lòng kiểm tra lại !",
            DateOfBirthError: "Ngày sinh không được vượt quá ngày hiện tại",
            EmailError: "Email không đúng định dạng",
            IndentityDate: "Ngày cấp không được vượt quá ngày hiện tại",
        }
    },
    MESSAGE:{
        UpdateSuccess : "Cập nhật thành công",
        InsertSuccess : "Thêm mới thành công",
        DeleteSuccess : "Xoá thành công"
    },
    QUESTION:{
        ConfirmMultiDelete: "Bạn có thực sự muốn xoá những nhân viên đã chọn không?",
        
    },
    // đường dẫn api
    AMIS_SERVICE_URL: "http://localhost:51831/api/v1"
  
}

export default Resource;