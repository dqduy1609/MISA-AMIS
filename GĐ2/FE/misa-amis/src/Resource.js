const Resource = {
    VN: {
        Gender: {
            Male: "Nam",
            Female: "Nữ",
            Other: "Khác"
        },
        DeleteConfirm: function (input) {
            return `Bạn có thực sự muốn xóa nhân viên <${input}> không?`;
        },
        ToastMessage: {
            RefreshSucess: "Làm mới dữ liệu thành công !",
            DeleteSuccess: "Xóa thành công !",
            Error: "Có lỗi trong quá trình xử lý",
            AddSuccess: "Thêm mới thành công !",
            UpdateSuccess: "Sửa dữ liệu thành công !"
        },
        WorkStatus: {
            Working: "Đang làm việc",
            NotWorking: "Đã nghỉ việc",
            Trying: "Đang thử việc"
        },
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
    EN: {
        Gender: {
            Male: "Male",
            Female: "Female",
            Other: "Other"
        }
    },
    AMIS_SERVICE_URL: "http://localhost:51831/api/v1",
    FormMode: {
        Add: 0,
        Edit: 1
    }
}

export default Resource;