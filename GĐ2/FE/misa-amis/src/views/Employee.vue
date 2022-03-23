<template>
  <div class="m-employee-view">
    <div v-if="Loading" class="loading">
      <div class="loading__icon"></div>
    </div>
    <div class="m-employee-view__header">
      <div class="m-employee-view__tittle">Nhân viên</div>
      <Button
        :color="'#2ca01c'"
        style="border-radius: 2px"
        @handleClick="handleBtnAdd"
        >Thêm mới nhân viên</Button
      >
    </div>
    <div class="m-employee-view__body">
      <div class="grid__row" style="justify-content: right; padding: 16px 0">
        <TextInput
          :hintText="'Tìm theo mã, tên nhân viên'"
          :iconClass="'search'"
          v-model="SearchText"
        />
        <div class="btn-refresh refresh-ico" @click="handleBtnRefresh"></div>
      </div>
      <Table
        :fields="fields"
        :data="employees"
        @handleDeleteButtonClick="handleTableDelete"
        @handleEditButtonClick="updateEmployee"
      ></Table>
    </div>
    <div class="m-employee-view__footer">
      <div class="left-pagination">
        <div class="total-record">
          Tổng số: <b>{{ TotalRecord }}</b> bản ghi
        </div>
      </div>
      <div class="right-pagination">
        <ComboboxPanigaion
          :ListItem="[
            '10 bản ghi trên trang',
            '20 bản ghi trên trang',
            '30 bản ghi trên trang',
            '50 bản ghi trên trang',
            '100 bản ghi trên trang',
          ]"
          v-if="true"
          @handleSelect="changeRecordNumber"
        />
        <PageNumberPanigation
          :totalPage="TotalPage"
          @handleSelectPanigation="handleSelectPanigation"
        />
      </div>
    </div>
    <Popup
      v-if="showPopup"
      @handleClosePopup="showPopup = false"
      @handleHelpPopup="Help"
      :width="'900px'"
    >
      <template slot="body">
        <div class="grid__row" style="align-items: start">
          <div class="w-1/2 p-r-26">
            <div class="grid__row">
              <TextField
                class="w-2/5 p-r-6"
                :label="'Mã'"
                :required="true"
                v-model="EmployeeCode"
                :checkInput="checkInput('EmployeeCode', EmployeeCode)"
                :errorText="'Mã không được để trống'"
                ref="EmployeeCode"
              />
              <TextField
                v-model="FullName"
                class="w-3/5"
                :label="'Tên'"
                :required="true"
                :checkInput="checkInput('FullName', FullName)"
                :errorText="'Tên không được để trống'"
                ref="FullName"
              />
            </div>
            <Combobox
              class="grid__row"
              :label="'Đơn vị'"
              :required="true"
              :departments="Departments"
              v-model="DepartmentId"
              :checkInput="checkInput('DepartmentId', DepartmentId)"
              :errorText="'Đơn vị không được để trống'"
              ref="DepartmentId"
            />
            <TextField
              class="grid__row"
              v-model="PositionName"
              :label="'Chức danh'"
              :required="false"
            />
          </div>
          <div class="w-1/2">
            <div class="grid__row">
              <!--Ngày sinh-->
              <div class="m-text-field w-2/5 p-r-6">
                <div class="m-text-field__label">
                  <div class="m-text-tittle">Ngày sinh</div>
                </div>
                <input v-model="DateOfBirth" style="width: 100%" type="date" />
              </div>
              <!---->
              <RadioGroup
                v-model="Gender"
                class="w-3/5"
                :label="'Giới tính'"
                :items="[
                  {
                    id: '0',
                    name: 'Nam',
                  },
                  {
                    id: '1',
                    name: 'Nữ',
                  },
                  {
                    id: '2',
                    name: 'Khác',
                  },
                ]"
              />
            </div>
            <div class="grid__row">
              <TextField
                v-model="IdentityNumber"
                class="w-3/5 p-r-6"
                :label="'Số CMND'"
                :required="false"
              />
              <!--Ngày cấp CMND-->
              <div class="m-text-field w-2/5">
                <div class="m-text-field__label">
                  <div class="m-text-tittle">Ngày cấp</div>
                </div>
                <input v-model="IdentityDate" style="width: 100%" type="date" />
              </div>
              <!---->
            </div>
            <TextField
              v-model="IdentityPlace"
              class="grid__row"
              :label="'Nơi cấp'"
            />
          </div>
        </div>
        <div class="grid__row">
          <TextField v-model="Address" :label="'Địa chỉ'" :required="false" />
        </div>
        <div class="grid__row" style="justify-content: start">
          <TextField
            v-model="PhoneNumber"
            class="w-1/4 p-r-6"
            :label="'ĐT di động'"
            :required="false"
          />
          <TextField
            v-model="LandlinePhoneNumber"
            class="w-1/4 p-r-6"
            :label="'ĐT cố định'"
            :required="false"
          />
          <TextField
            v-model="Email"
            class="w-1/4 p-r-6"
            :label="'Email'"
            :required="false"
          />
        </div>
        <div class="grid__row" style="justify-content: start">
          <TextField
            v-model="BankAccount"
            class="w-1/4 p-r-6"
            :label="'Tài khoản ngân hàng'"
            :required="false"
          />
          <TextField
            v-model="BankName"
            class="w-1/4 p-r-6"
            :label="'Tên ngân hàng'"
            :required="false"
          />
          <TextField
            v-model="BankBranch"
            class="w-1/4 p-r-6"
            :label="'Chi nhánh'"
            :required="false"
          />
        </div>
      </template>
      <template slot="footer">
        <div class="grid__row">
          <div class="w-1/2">
            <Button
              class="m-popup-footer-btn"
              :color="'transparent'"
              @handleClick="showPopup = false"
              >Hủy</Button
            >
          </div>
          <div>
            <Button
              class="m-popup-footer-btn"
              :color="'transparent'"
              @handleClick="handleBtnSave"
              >Cất</Button
            >
            <Button
              class="m-popup-footer-btn"
              :color="'#2ca01c'"
              style="color: #fff; border: none"
              @handleClick="handleBtnSaveAndAdd"
              >Cất và Thêm</Button
            >
          </div>
        </div>
      </template>
    </Popup>
    <MessageBox
      v-if="showMsg"
      @handleConfirmMessage="handleConfirmMessage"
      @handleCanclemMessage="
        showMsg = false;
        doFocus();
      "
      :type="MessageBoxType"
      :width="'444px'"
      :text="MesageBoxText"
    />
    <div id="toast"></div>
  </div>
</template>

<script>
import Resource from "../Resource";
import axios from "axios";
import Button from "../components/base/Button.vue";
import TextInput from "../components/base/TextInput.vue";
import Table from "../components/base/CustomTable.vue";
import Popup from "../components/base/Popup.vue";
import TextField from "../components/base/TextField.vue";
import RadioGroup from "../components/base/RadioGroup.vue";
import Combobox from "../components/base/ComboboxCustom.vue";
import MessageBox from "../components/base/MessageBox.vue";
import Toast from "../js/Toast.js";
import ComboboxPanigaion from "../components/base/ComboboxPanigation.vue";
import PageNumberPanigation from "../components/base/PageNumberPanigation.vue";

export default {
  components: {
    Button,
    TextInput,
    Table,
    Popup,
    TextField,
    RadioGroup,
    Combobox,
    MessageBox,
    ComboboxPanigaion,
    PageNumberPanigation,
  },
  created() {
    this.loadData();
  },
  data() {
    return {
      Loading: true,
      // Phân trang:
      PageNumber: 1,
      RecordNumber: 10,
      TotalRecord: null,
      TotalPage: 3,
      // Tìm kiếm:
      SearchText: "",
      // Validate Mode;
      ValidateMode: false,
      FocusInput: false,
      // MessageBox:
      MesageBoxText: "",
      MessageBoxType: "warning",

      Validate: true,
      /* Thông tin cần dùng v-model */
      EmployeeCode: "", // Mã nhân viên
      FullName: "", // Họ và Tên
      DateOfBirth: null, // Ngày sinh
      Gender: null, // Giới tính
      DepartmentId: "", // Đơn vị
      IdentityNumber: "", // Số CMND
      IdentityDate: null, // Ngày cấp CMND
      IdentityPlace: "", // Nơi cấp CMND
      PositionName: "", // Chức danh
      Address: "", // Địa chỉ
      PhoneNumber: "", // SĐT Di Động
      Email: "", // Email
      BankAccount: "", // Tài khoản ngân hàng
      LandlinePhoneNumber: "",
      BankName: "",
      BankBranch: "",
      /*---------------------*/
      showMsg: false,
      EmployeeEditId: null,
      // Lưu lại Employee cần xóa
      EmployeeCodeDelete: null,
      EmployeeIdDelete: null,
      // ----------------------------
      FormMode: null,
      Departments: [],
      showPopup: false,
      employees: [],
      fields: [
        {
          text: "Mã nhân viên",
          name: "employeeCode",
        },
        {
          text: "Tên nhân viên",
          name: "fullName",
        },
        {
          text: "Giới tính",
          name: "gender",
          type: "gender",
        },
        {
          text: "Ngày sinh",
          name: "dateOfBirth",
          type: "date",
        },
        {
          text: "Số CMND",
          name: "identityNumber",
        },
        {
          text: "Chức danh",
          name: "positionName",
        },
        {
          text: "Tên đơn vị",
          name: "departmentName",
        }
      ],
    };
  },
  methods: {
    /**
     * Hàm xử lý cất và thêm
     * Author: DQDUY(22/11/2021)
     */
    async handleBtnSaveAndAdd() {
      try {
        let saveSuccess = await this.handleBtnSave();
        if (saveSuccess) {
          await this.handleBtnAdd();
        } else {
          this.ValidateMode = true;
        }
      } catch (error) {
        new Toast(
          document.getElementById("toast"),
          Resource["VN"].ToastMessage.Error,
          "error"
        );
      }
    },
    /**
     * Sự kiện khi thay đổi RecordNumber
     * Author: DQDUY(19/11/2021)
     */
    changeRecordNumber(pageRecord) {
      this.RecordNumber = pageRecord;
      this.loadData();
    },
    /**
     * Xử lý khi nhấn chọn trang
     * Author: DQDUY(22/11/2021)
     */
    handleSelectPanigation(page) {
      this.Loading = true;
      this.PageNumber = page;
      axios
        .get(
          `${Resource.AMIS_SERVICE_URL}/Employee/pagingFilter?recordNumber=${this.RecordNumber}&pageNumber=${page}`
        )
        .then((res) => {
          this.employees = res.data;
          this.Loading = false;
        });
    },
    /**
     * Hàm xử lý sự kiện Refresh
     * Author: DQDUY(22/11/2021)
     */
    async handleBtnRefresh() {
      await this.loadData();
      new Toast(
        document.getElementById("toast"),
        Resource["VN"].ToastMessage.RefreshSucess
      );
    },
    /**
     * Xử lý sự kiện khi ấn nút sửa
     * Author: DQDUY (20/11/2021)
     */
    updateEmployee(id) {
      console.log("Edit: ", id);
      this.EmployeeEditId = id;
      this.FormMode = Resource.FormMode.Edit;
      //
      axios.get(`${Resource.AMIS_SERVICE_URL}/Employee/${id}`).then((res) => {
        this.EmployeeCode = res.data.employeeCode;
        this.FullName = res.data.fullName;
        this.DateOfBirth = this.convertDate(res.data.dateOfBirth);
        this.Gender = res.data.gender;
        this.DepartmentId = res.data.departmentId;
        this.IdentityNumber = res.data.identityNumber;
        this.IdentityDate = this.convertDate(res.data.identityDate);
        this.IdentityPlace = res.data.identityPlace;
        this.PositionName = res.data.positionName;
        this.Address = res.data.address;
        this.PhoneNumber = res.data.phoneNumber;
        this.Email = res.data.email;
        this.BankAccount = res.data.bankAccount;
        this.LandlinePhoneNumber = res.data.landlinePhoneNumber;
        this.BankName = res.data.bankName;
        this.BankBranch = res.data.bankBranch;
        this.showPopup = true;
      });
    },
    /*
     * Hàm xử lý khi ấn nút xóa 1 dòng
     * Author: DQDUY (20/11/2021)
     */
    handleTableDelete(employee) {
      this.EmployeeIdDelete = employee.employeeId;
      this.EmployeeCodeDelete = employee.employeeCode;
      this.showMsg = true;
      this.MesageBoxText = Resource["VN"].DeleteConfirm(
        this.EmployeeCodeDelete
      );
      this.MessageBoxType = "warning";
    },
    /**
     * Hàm xử lý sự kiện khi ấn xác nhận MessageBox
     * Author: DQDUY(19/11/2021)
     */
    async handleConfirmMessage() {
      try {
        await this.callApiDelete(this.EmployeeIdDelete);
        this.showMsg = false;
        this.loadData();
        new Toast(
          document.getElementById("toast"),
          Resource["VN"].ToastMessage.DeleteSuccess
        );
      } catch (error) {
        new Toast(
          document.getElementById("toast"),
          Resource["VN"].ToastMessage.Error,
          "error"
        );
      }
    },
    /**
     * Hàm Load dữ liệu từ API
     * Author: DQDUY (2021/11/18)
     */
    async loadData() {
      this.Loading = true;
      await axios
        .get(`${Resource.AMIS_SERVICE_URL}/Employee/totalRecord`)
        .then((res) => {
          this.TotalRecord = res.data;
          this.TotalPage =
            Math.floor(this.TotalRecord / this.RecordNumber) +
            (this.TotalRecord % this.RecordNumber == 0 ? 0 : 1);
        });
      await axios
        .get(
          `${Resource.AMIS_SERVICE_URL}/Employee/pagingFilter?recordNumber=${this.RecordNumber}&pageNumber=${this.PageNumber}`
        )
        .then((res) => {
          this.employees = res.data;
        })
        .catch();
      await axios
        .get(`${Resource.AMIS_SERVICE_URL}/Department`)
        .then((res) => {
          this.Departments = res.data;
        })
        .catch();
      this.Loading = false;
    },
    /**
     * Hàm xử lý sự kiện nhấn nút thêm nhân viên mới
     * Author: DQDUY (2021/11/18)
     */
    handleBtnAdd() {
      // Hiển thị Form nhập liệu
      axios
        .get(`${Resource.AMIS_SERVICE_URL}/Employee/NewEmployeeCode`)
        .then((res) => {
          this.ValidateMode = false;
          this.showPopup = true;
          this.FormMode = Resource.FormMode.Add;
          this.EmployeeCode = res.data;
          this.FullName = "";
          this.DateOfBirth = null;
          this.Gender = null;
          this.DepartmentId = "";
          this.IdentityNumber = "";
          this.IdentityDate = null;
          this.IdentityPlace = "";
          this.PositionName = "";
          this.Address = "";
          this.PhoneNumber = "";
          this.Email = "";
          this.BankAccount = "";
          this.LandlinePhoneNumber = "";
          this.BankName = "";
          this.BankBranch = "";
          this.FocusInput = false;
        });
    },
    /**
     * Hàm check điều kiện và hiển thị Input báo đỏ
     * Author: DQDUY
     */
    checkInput(nameRef, value) {
      let valid = false;
      if (this.ValidateMode == true && value == "") {
        valid = true;
      } else {
        valid = false;
      }
      return valid;
    },
    /**
     * Hàm Focus
     * Author: DQDUY(22/11/2021)
     */
    doFocus() {
      let ListFocus = ["EmployeeCode", "FullName", "DepartmentId"];
      ListFocus.forEach((nameRef) => {
        if (this.FocusInput == false && this[nameRef] == "") {
          this.$refs[nameRef].$el.querySelector("input").focus();
          this.FocusInput = true;
        }
      });
    },
    /**
     * Check Date
     * Author: DQDUY(2021/11/22)
     */
    errorDate(date) {
      if (date == null) return false;
      else {
        let dateInput = new Date(date);
        let now = new Date();
        if (dateInput.getFullYear() > now.getFullYear()) return true;
        else if (dateInput.getFullYear() == now.getFullYear()) {
          if (dateInput.getMonth() > now.getMonth()) return true;
          else if (dateInput.getMonth() == now.getMonth()) {
            if (dateInput.getDate() > now.getDate()) return true;
          }
        }
      }
      return false;
    },
    /**
     * Check Email
     * Author: DQDUY(2021/11/22)
     */
    errorEmail(email) {
      console.log(email);
      if (email == "") return false;
      else {
        if (email.indexOf("@") == -1) return true;
      }
      return false;
    },
    /**
     * Hàm check validate
     * Author: DQDUY(22/11/2021)
     */
    checkValidate() {
      // Viền đỏ Input nếu không nhập và Focus
      this.ValidateMode = true;
      // Hiển thị MessageBox cảnh báo:
      if (this.EmployeeCode == "") {
        this.showMsg = true;
        this.MesageBoxText = Resource["VN"].Warning.EmployeeCodeIsEmpty;
        this.MessageBoxType = "error";
        return false;
      } else if (this.FullName == "") {
        this.showMsg = true;
        this.MesageBoxText = Resource["VN"].Warning.FullNameIsEmpty;
        this.MessageBoxType = "error";
        return false;
      } else if (this.DepartmentId == "") {
        this.showMsg = true;
        this.MesageBoxText = Resource["VN"].Warning.DepartmentIsEmpty;
        this.MessageBoxType = "error";
        return false;
      } else if (this.errorDate(this.DateOfBirth)) {
        this.showMsg = true;
        this.MesageBoxText = Resource["VN"].Warning.DateOfBirthError;
        this.MessageBoxType = "error";
        return false;
      } else if (this.errorDate(this.IdentityDate)) {
        this.showMsg = true;
        this.MesageBoxText = Resource["VN"].Warning.IndentityDate;
        this.MessageBoxType = "error";
        return false;
      }
      else if(this.Email != "" && this.Email.indexOf('@') == -1){
        this.showMsg = true;
        this.MesageBoxText = Resource["VN"].Warning.EmailError;
        this.MessageBoxType = "error";
        return false;
      }
      return true;
    },
    async checkAvailableEmployeeCode() {
      let isAvailable = false;
      await axios
        .get(
          `${Resource.AMIS_SERVICE_URL}/Employee/find?EmployeeCode=${this.EmployeeCode}`
        )
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            isAvailable = true;
          }
        });
      return isAvailable;
    },
    /**
     * Hàm gọi Api thêm mới
     * Author: DQDUY(19/11/2021)
     */
    async callApiCreate(employee) {
      try {
        const res = await axios.post(
          `${Resource.AMIS_SERVICE_URL}/Employee`,
          employee
        );
        return res;
      } catch (error) {
        throw new Error("Call Create API Failed");
      }
    },
    /**
     * Hàm gọi Api update
     * Author: DQDUY(19/11/2021)
     */
    async callApiUpdate(id, employee) {
      try {
        const res = await axios.put(
          `${Resource.AMIS_SERVICE_URL}/Employee/${id}`,
          employee
        );
        return res;
      } catch (error) {
        throw new Error("Call Update API Failed");
      }
    },
    /**
     * Hàm gọi Api xóa nhân viên
     * Author: DQDUY(19/11/2021)
     */
    async callApiDelete(id) {
      try {
        await axios.delete(`${Resource.AMIS_SERVICE_URL}/Employee/${id}`);
      } catch (error) {
        throw new Error("Call Delete Api Failed");
      }
    },
    /**
     * Hàm thêm Employee
     * Author: DQDUY(22/11/2021)
     */
    async handleBtnSave() {
      // Validate dữ liệu:
      let validate = this.checkValidate();
      this.FocusInput = false;

      //-----------------
      if (validate) {
        var employee = {
          employeeCode: this.EmployeeCode,
          fullName: this.FullName,
          dateOfBirth: this.DateOfBirth,
          gender: this.Gender,
          departmentId: this.DepartmentId,
          identityNumber: this.IdentityNumber,
          identityDate: this.IdentityDate,
          identityPlace: this.IdentityPlace,
          positionName: this.PositionName,
          address: this.Address,
          phoneNumber: this.PhoneNumber,
          email: this.Email,
          bankAccount: this.BankAccount,
          landlinePhoneNumber: this.LandlinePhoneNumber,
          bankName: this.BankName,
          bankBranch: this.BankBranch,
        };
        if (this.FormMode == Resource.FormMode.Add) {
          let isAvailable = await this.checkAvailableEmployeeCode();
          if (isAvailable) {
            this.showMsg = true;
            this.MesageBoxText = Resource["VN"].Warning.EmployeeCodeIsAvailable;
            this.MessageBoxType = "error";
          } else {
            // Thực hiện thêm nhân viên
            try {
              await this.callApiCreate(employee);
              new Toast(
                document.getElementById("toast"),
                Resource["VN"].ToastMessage.AddSuccess
              );
              this.showPopup = false;
              this.loadData();
            } catch (error) {
              new Toast(
                document.getElementById("toast"),
                Resource["VN"].ToastMessage.Error,
                "error"
              );
            }
          }
        } else if (this.FormMode == Resource.FormMode.Edit) {
          try {
            await this.callApiUpdate(this.EmployeeEditId, employee);
            new Toast(
              document.getElementById("toast"),
              Resource["VN"].ToastMessage.UpdateSuccess
            );
            this.showPopup = false;
            this.loadData();
          } catch (error) {
            new Toast(
              document.getElementById("toast"),
              Resource["VN"].ToastMessage.Error,
              "error"
            );
          }
        }
        return true;
      }
      return false;
    },
    async Help() {
      console.log("Help Popup Clicked");
    },
    /**
     * Hàm chuyển dữ liệu ngày tháng về dạng YYY-MMM-DDD
     * Author: DQDUY(22/11/2021)
     */
    // Convert Date:
    convertDate(dateString) {
      var result = null;
      if (dateString) {
        let date = new Date(dateString);
        let day =
          date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        let month =
          date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : `${date.getMonth() + 1}`;
        result = `${date.getFullYear()}-${month}-${day}`;
      }
      return result;
    },
  },
  watch: {
    /**
     * Hàm xử lý tìm kiếm
     * Author: DQDUY(22/11/2021)
     */
    SearchText: function (value) {
      if (value != "") {
        this.Loading = true;
        axios
          .get(
            `${Resource.AMIS_SERVICE_URL}/Employee/search?searchText=${value}`
          )
          .then((res) => {
            this.employees = res.data;
            this.Loading = false;
          });
      } else {
        this.loadData();
      }
    },
    DateOfBirth: function (value) {
      if (value == "") this.DateOfBirth = null;
    },
    IndentityDate: function (value) {
      if (value == "") this.IndentityDate = null;
    },
  },
};
</script>

<style scoped>
@import url("../styles/components/toast/toast.css");
.m-employee-view {
  background-color: #f4f5f8;
  flex: 1;
  max-height: calc(100vh - 48px);
  overflow: auto;
  position: relative;
}
.m-employee-view .m-employee-view__header {
  padding-left: 20px;
  padding-top: 24px;
  padding-bottom: 11px;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
}
.m-employee-view .m-employee-view__header .m-employee-view__tittle {
  color: #111;
  font-family: Notosans-Regular;
  font-size: 24px;
  font-weight: 700;
}
.m-employee-view .m-employee-view__body {
  background-clip: border-box;
  box-sizing: border-box;
  margin-left: 20px;
  margin-top: 20px;
  margin-right: 30px;
  background-color: #fff;
}
.m-employee-view .m-employee-view__footer {
  position: sticky;
  bottom: 0;
  padding: 12px;
  background-color: #fff;
  margin-left: 20px;
  margin-right: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}
.m-employee-view .m-employee-view__footer .right-pagination {
  display: flex;
  align-items: center;
}
.btn-refresh {
  width: 24px;
  height: 24px;
  padding: 0 6px;
  box-sizing: content-box;
  cursor: pointer;
}
.w-1\/2 {
  width: 50%;
}
.w-2\/5 {
  width: 40% !important;
}
.p-r-6 {
  padding-right: 6px;
}
.w-3\/5 {
  width: 60%;
}
.p-r-26 {
  padding-right: 26px;
}
.w-1\/4 {
  width: 25%;
}
.m-text-field input[type="date"] {
  outline: none;
  font-size: 13px;
  border-radius: 2px;
  border: 1px solid #babec5;
  height: var(--input-height);
  padding-left: 10px;
  padding-right: 12px;
  box-sizing: border-box;
  width: 100%;
}

.m-text-field input[type="date"]:hover:not(:focus) {
  outline: 1px solid #e2e2e2;
}
.m-text-field input[type="date"]:focus {
  border: 1px solid #2ca01c;
}
.m-popup-footer-btn {
  border: 1px solid #8d9096;
  color: #111;
  border-radius: 3px;
  height: 34px;
  padding: 6px 16px;
}
.m-popup-footer-btn + .m-popup-footer-btn {
  margin-left: 6px;
}
.m-input-error {
  border: 1px solid red !important;
}
.loading {
  position: fixed;
  background: rgba(255, 255, 255, 0.2);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading__icon {
  background: transparent url("../assets/loading.svg") no-repeat center;
  width: 50px;
  height: 50px;
  transition: all 0.3s ease;
  animation: rotate 1s ease infinite;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>>
