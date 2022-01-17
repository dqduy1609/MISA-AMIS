<template>
  <!-- CONTENT -->
  <div class="m-content">
    <!-- CONTENT-TITLE -->
    <div class="m-content-title">
      <div class="content-title-text">Nhân viên</div>
      <div class="m-flex-space"></div>
      <ButtonAdd @openForm="openForm" />
    </div>

    <!-- CONTENT-TOOLBAR -->
    <div class="m-content-toolbar">
      <!--Thao tác hàng loạt-->
      <DropBox :selectedId="selectedId" @multiDelete="multiDelete" />
      <div class="m-flex-space"></div>

      <!--Ô tìm kiếm nhân viên-->
      <SearchBox @search="searchEmployee" />

      <!--Button refresh dữ liệu-->
      <RefreshButton @refresh="refresh" />

      <!--Button xuất dữ liệu ra file excel-->
      <ButtonExcel />
    </div>

    <div
      style="background-color: #fff; padding-left: 16px; padding-right: 30px"
    >
      <!-- CONTENT-GRID -->
      <div class="m-content-grid">
        <!-- Bảng danh sách các bản ghi -->
        <table id="tblEmployee" class="m-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  class="m-checkbox"
                  v-model="isSelectAllId"
                  @click="selectAllId"
                />
              </th>
              <th
                class="text-align-left"
                style="min-width: 140px; width: 150px"
              >
                Mã nhân viên
              </th>
              <th
                class="text-align-left"
                style="min-width: 180px; width: 250px"
              >
                Tên nhân viên
              </th>
              <th class="text-align-left" style="min-width: 120px">
                Giới tính
              </th>
              <th class="text-align-center" style="min-width: 150px">
                Ngày sinh
              </th>
              <th class="text-align-left" style="min-width: 150px">Số CMND</th>
              <th
                class="text-align-left"
                style="min-width: 250px; width: 250px"
              >
                Chức danh
              </th>
              <th class="text-align-left" style="min-width: 250px">
                Tên đơn vị
              </th>
              <th class="text-align-left" style="min-width: 150px">
                Số tài khoản
              </th>
              <th
                class="text-align-left"
                style="min-width: 200px; width: 250px"
              >
                Tên ngân hàng
              </th>
              <th
                class="text-align-left"
                style="min-width: 250px; width: 250px"
              >
                Chi nhánh TK ngân hàng
              </th>
              <th
                class="text-align-right"
                style="min-width: 120px; width: 120px; padding-right: 12px"
              >
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" v-bind:key="employee.employeeId">
              <td>
                <input
                  type="checkbox"
                  class="m-checkbox"
                  :value="employee.employeeId"
                  v-model="selectedId"
                  @click="selectId(employee.employeeId)"
                />
              </td>

              <td class="text-align-left" id="EmployeeCode">
                {{ employee.employeeCode }}
              </td>
              <td class="text-align-left">{{ employee.employeeName }}</td>
              <td class="text-align-left">
                {{ employee.genderName }}
              </td>
              <td class="text-align-center">
                {{ employee.dateOfBirth | formatDateDDMMYYYY }}
              </td>
              <td class="text-align-left">{{ employee.identityNumber }}</td>
              <td class="text-align-left">{{ employee.employeePosition }}</td>
              <td class="text-align-left">{{ employee.departmentName }}</td>
              <td class="text-align-left">{{ employee.bankAccountNumber }}</td>
              <td class="text-align-left">{{ employee.bankName }}</td>
              <td class="text-align-left">{{ employee.bankBranchName }}</td>
              <td class="text-align-center" id="m-function">
                <div class="m-utility-dropdown">
                  <div
                    class="m-dropdown-text text-align-center"
                    v-on:click="showFormEdit(employee.employeeId)"
                  >
                    Sửa
                  </div>
                  <button
                    class="dropdown-btn"
                    v-on:click="showContextMenu($event, employee.employeeId)"
                  >
                    <div class="m-icon icon-16 m-icon-arrow-up--blue"></div>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- GRID-PAGING -->
      <div class="m-table-paging">
        <div class="total-record">
          Tổng số:
          <b
            ><span id="totalRecord">{{ TotalRecord }}</span></b
          >
          bản ghi
        </div>
        <div class="m-flex-space"></div>

        <!--Combobox Phân trang thao số bản ghi trên một trang-->
        <ComboboxPanigation
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

        <!--Phân trang theo số trang-->
        <PaginationPage
          :totalPages="totalPages"
          @changePage="changePageNumber"
        />
      </div>
    </div>

    <!-- Phần menu thao tác nhân bản/xoá/ngưng sử dụng -->
    <div id="contextMenu" v-show="toogleMenu">
      <button id="duplicate" v-on:click="duplicateEmployee">Nhân bản</button>
      <button id="delete" v-on:click="showFormDelete">Xóa</button>
      <button id="stopUsing">Ngừng sử dụng</button>
    </div>

    <!--Form chi tiết nhân viên-->
    <EmployeeDetail
      v-bind:isOpen="isOpen"
      v-on:closeForm="closeForm"
      v-bind:employeeId="employeeId"
      v-bind:employee="employee"
      :formIsActive="formIsActive"
      @update-employee="updateEmployee"
      @update-employee-continue="updateEmployeeAndContinue"
      @add-employee="addEmployee"
      @add-employee-continue="addEmployeeAndContinue"
      ref="employeeDetail"
    />

    <!-- PopUp xác nhận có xoá bản ghi hay không? -->
    <PopUpConfirm
      :showPopUp="showPopUp"
      :employeeCodeDelete="employeeCodeDelete"
      :textPopUp="textPopUp"
      :isError="isError"
      :notError="notError"
      @closePopUp="closePopUp"
      @deleteEmployee="deleteEmployee"
    />

    <!--Loading icon-->
    <Loading :isLoading="isLoading" />

    <!--Toast Message-->
    <ToastMessage :isShowToast="isShowToast" :toastText="toastText" />
  </div>
</template>

<script>
import axios from "axios";
import { Common } from "../../../js/base/common";
import $ from "jquery";
import EmployeeDetail from "./EmployeeDetail.vue";
import Loading from "../../Base/Loading.vue";
import ToastMessage from "../../Base/ToastMessage.vue";
import ComboboxPanigation from "../../Base/ComboboxPanigation.vue";
import Resource from "../../../js/base/resource";
import PaginationPage from "../../Base/PaginationPage.vue";
import ButtonExcel from "../../Base/ButtonExcel.vue";
import PopUpError from "../../Base/PopUpError.vue";
import PopUpConfirm from "../../Base/PopUpConfirm.vue";
import DropBox from "../../Base/DropBox.vue";
import SearchBox from "../../Base/SearchBox.vue";
import RefreshButton from "../../Base/RefreshButton.vue";
import ButtonAdd from "../../Base/ButtonAdd.vue";

export default {
  data() {
    return {
      newEmployeeCode: "",
      employees: [],
      isOpen: false,
      employeeId: "",
      employeeCodeDelete: "",
      showPopUp: false,
      toogleMenu: false,
      isLoading: true,
      isShowToast: false,
      toastText: "",
      TotalRecord: 0,
      isError: false,
      notError: false,
      DepartmentId: "",
      employee: {
        employeeCode: "",
        employeeName: "",
        departmentId: null,
        employeePosition: "",
        gender: 0,
        dateOfBirth: null,
        phoneNumber: "",
        telephoneNumber: "",
        email: "",
        address: "",
        identityNumber: "",
        identityDate: null,
        identityPlace: "",
        bankAccountNumber: "",
        bankName: "",
        bankBranchName: "",
      },
      searchText: "",
      // số bản ghi trên một trang
      pageSize: 10,
      // trang hiện tại
      pageNumber: 1,
      // tổng số trang
      totalPages: 0,
      // danh sách Id nhân viên khi ấn input checkbox -> xoá nhiều
      selectedId: [],
      // có check toàn bộ ô checkbox hay không -> để lấy toàn bộ Id của nhân viên -> xoá toàn bộ
      isSelectAllId: false,
      // nội dung của popup xác nhận xoá một nhân viên hoặc nhiều nhân viên
      textPopUp: "",
      // có phải chức năng xoá nhiều hay không ?
      isMultiDelete: false,
      formIsActive: true,
    };
  },
  components: {
    EmployeeDetail,
    Loading,
    ToastMessage,
    ComboboxPanigation,
    PaginationPage,
    ButtonExcel,
    PopUpError,
    PopUpConfirm,
    SearchBox,
    DropBox,
    RefreshButton,
    ButtonAdd,
  },

  /**
   * Load dữ liệu lên
   * CreatedBy: DQDuy (09/12/2021)
   */
  created() {
    this.loadData();
  },
  filters: {
    /**
     * Hàm format dữ liệu ngày/tháng/năm
     * CreatedBy: DQDuy (10/12/2021)
     * */
    formatDateDDMMYYYY(date) {
      return Common.formatDateDDMMYYYY(date);
    },

    /**
     * Format giới tính
     * CreatedBy: DQDuy (10/12/2021)
     */
    formatGender(val) {
      return Common.formatGender(val);
    },
  },
  methods: {
    /**
     * Gọi Api để lấy dữ liệu
     * CreatedBy: DQDuy (09/12/2021)
     */
    loadData() {
      try {
        axios
          .get(
            `${Resource.AMIS_SERVICE_URL}/Employees/filter?pageSize=${this.pageSize}&pageIndex=${this.pageNumber}&entityFilter=${this.searchText}`
          )
          .then((res) => {
            this.employees = res.data.data;
            this.TotalRecord = res.data.totalRecord;
            this.totalPages = res.data.totalPage;
            this.isLoading = false;
          })
          .catch((err) => {
            this.isLoading = true;
            console.error(err);
          });
        this.employeeId = "";
      } catch (error) {}
    },
    /**
     * Thêm mới nhân viên nhưng không đóng form để tiếp tục thao tác
     * CreatedBy: DQDuy (09/12/2021)
     */
    addEmployeeAndContinue() {
      this.formIsActive = true;
      try {
        axios
          .post(`${Resource.AMIS_SERVICE_URL}/Employees`, this.employee)
          .then(() => {
            this.showToastMessage();
            this.toastText = `${Resource["MESSAGE"].InsertSuccess}`;
            this.loadData();
            this.employee = {
              employeeCode: "",
            };
            this.getNewEmployeeCode();
            this.formIsActive = false;
          })
          .catch((e) => {
            var error = e.response.data;
            this.showPopUp = true;
            this.isError = true;
            this.notError = false;
            this.textPopUp = error.data[0];
          });
      } catch (error) {}
    },
    /**
     * Thêm mới nhân viên và đóng form
     * CreatedBy: DQDuy (09/12/2021)
     */
    addEmployee() {
    
      this.formIsActive = true;
      try {
        axios
          .post(`${Resource.AMIS_SERVICE_URL}/Employees`, this.employee)
          .then(() => {
            this.showToastMessage();
            this.toastText = `${Resource["MESSAGE"].InsertSuccess}`;
            this.loadData();
            this.closeForm();
            this.isSuccess = true;
          })
          .catch((e) => {
            var error = e.response.data;
            this.showPopUp = true;
            this.isError = true;
            this.notError = false;
            this.textPopUp = error.data[0];
          });
      } catch (error) {}
    },
    /**
     * Hiện thị form gồm những thông tin chi tiết của nhân viên
     * CreatedBy: DQDuy (10/12/2021)
     */
    showFormEdit(employeeid) {
      this.employeeId = employeeid;
      this.isOpen = true;
      try {
        axios
          .get(`${Resource.AMIS_SERVICE_URL}/Employees/` + employeeid)
          .then((response) => {
            this.employee = response.data;
            this.employee.gender = Common.formatGender(this.employee.gender);
            console.log(response.data);
            this.DepartmentId = response.data.departmentId;
            /* Format lại dữ liệu ngày tháng năm */
            if (response.data.dateOfBirth != "") {
              this.employee.dateOfBirth = Common.formatDateYYYYMMDD(
                response.data.dateOfBirth
              );
            }
            if (response.data.identityDate != "") {
              this.employee.identityDate = Common.formatDateYYYYMMDD(
                response.data.identityDate
              );
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {}
    },
    /**
     * Update Nhân viên và đóng form
     * CreatedBy: DQDuy (10/12/2021)
     */
    updateEmployee() {
      this.formIsActive = true;
      try {
        axios
          .put(
            `${Resource.AMIS_SERVICE_URL}/Employees/` + this.employeeId,
            this.employee
          )
          .then(() => {
            this.showToastMessage();
            this.toastText = `${Resource["MESSAGE"].UpdateSuccess}`;
            this.closeForm();
            this.loadData();
          })
          .catch((e) => {
            var error = e.response.data;
            this.showPopUp = true;
            this.isError = true;
            this.notError = false;
            this.textPopUp = error.data[0];
          });
      } catch (error) {}
    },
    /**
     * Update Nhân viên nhưng không đóng form để tiếp tục thao tác
     * CreatedBy: DQDuy (25/12/2021)
     */
    updateEmployeeAndContinue() {
      this.formIsActive = true;
      try {
        axios
          .put(
            `${Resource.AMIS_SERVICE_URL}/Employees/` + this.employeeId,
            this.employee
          )
          .then(() => {
            this.showToastMessage();
            this.toastText = `${Resource["MESSAGE"].UpdateSuccess}`;
            this.loadData();

            this.formIsActive = false;
            this.employee = {
              employeeCode: "",
            };
            this.getNewEmployeeCode();
          })
          .catch((e) => {
            var error = e.response.data;
            this.showPopUp = true;
            this.isError = true;
            this.notError = false;
            this.textPopUp = error.data[0];
          });
      } catch (error) {}
    },
    /**
     * Hiển thị menu chức năng: xoá, nhân bản, ngưng sử dụng
     * CreatedBy: DQDuy (10/12/2021)
     */
    showContextMenu(e, employeeId) {
      try {
        this.toogleMenu = true;
        var positionMenu = e.target;
        let contextMenu = $("#contextMenu");
        this.employeeCodeDelete = $(positionMenu)
          .parent()
          .parent()
          .parent()
          .siblings("#EmployeeCode")
          .text();
        contextMenu.toggle();
        let top_pos = $(positionMenu).offset().top;
        let left_pos = $(positionMenu).offset().left;
        if (top_pos + 24 <= window.innerHeight - 90) {
          contextMenu.css("top", `calc(${top_pos}px + 24px)`);
        } else {
          contextMenu.css("top", `calc(${top_pos}px - 88px)`);
        }
        contextMenu.css("left", `calc(${left_pos}px - 86px)`);

        this.employeeId = employeeId;
        console.log(this.employeeId);
      } catch (error) {}
    },

    /**
     * Tự động sinh mã nhân viên mới
     * CreatedBY: DQDuy (09/12/2021)
     */

    getNewEmployeeCode() {
      try {
        axios
          .get(`${Resource.AMIS_SERVICE_URL}/Employees/NewEmployeeCode`)
          .then((response) => {
            this.employee.employeeCode = response.data;
            this.isOpen = true;
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {}
    },
    /**
     * Hiển thị Form thêm mới
     * CreatedBy: DQDuy (09/12/2021)
     */
    openForm() {
      this.formIsActive = false;
      this.getNewEmployeeCode();
    },
    /*
     * Ẩn Form
     * CreatedBy: DQDuy (09/12/2021)
     */
    closeForm() {
      this.isOpen = false;
      this.loadData();
      this.employee = {};
      this.toogleMenu = false;
    },

    /**
     * Lấy ra Id nhân viên
     * CreatedBy: DQDuy (11/12/2021)
     */
    getEmployeeId(employeeId) {
      this.isOpen = true;
      this.employeeId = employeeId;
    },

    /**
     * Hiển thị form xác nhận xoá
     * CreatedBy: DQDuy (11/12/2021)
     */
    showFormDelete() {
      this.showPopUp = true;
      this.isError = false;
      this.notError = true;
      this.textPopUp = `Bạn có thực sự muốn xóa Nhân viên <${this.employeeCodeDelete}> không?`;
      this.employeeCode = $("#EmployeeCode").text();
      console.log(this.employeeCode);
    },

    /**
     * Xoá một hoặc nhiều nhân viên
     * CreatedBy: DQDuy (11/12/2021)
     */
    deleteEmployee() {
      this.showPopUp = false;
      try {
        // nếu isMultiDelete là false thì sẽ là xoá duy nhất một bản ghi
        if (this.isMultiDelete == false) {
          axios
            .delete(`${Resource.AMIS_SERVICE_URL}/Employees/` + this.employeeId)
            .then(() => {
              this.showToastMessage();
              this.toastText = `${Resource["MESSAGE"].DeleteSuccess}`;
              this.toogleMenu = false;
              this.loadData();
              this.employeeId = "";
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          // isMultiDelete là true thì tức là xoá nhiều bản ghi
          axios
            .post(
              `${Resource.AMIS_SERVICE_URL}/Employees/MultiDelete/`,
              this.selectedId
            )
            .then((res) => {
              this.showToastMessage();
              this.toastText = `${Resource["MESSAGE"].DeleteSuccess}`;
              this.toogleMenu = false;
              this.selectedId = [];
              this.isMultiDelete = false;
              this.loadData();
            })
            .catch((e) => {
              console.log(e);
            });
        }
      } catch (error) {}
    },

    /**
     * Xoá nhiều nhân viên
     * CreatedBy: DQDuy (23/12/2021)
     */
    multiDelete() {
      this.showPopUp = true;
      this.textPopUp = `${Resource["QUESTION"].ConfirmMultiDelete}`;
      this.isMultiDelete = true;
      this.notError = true;
    },

    /**
     * Nhân bản nhân viên
     * CreatedBy: DQDuy (26/12/2021)
     */
    duplicateEmployee() {
      this.getNewEmployeeCode();

      axios
        .get(`${Resource.AMIS_SERVICE_URL}/Employees/` + this.employeeId)
        .then((response) => {
          this.employee = response.data;
          this.employee = {
            employeeCode: "",
            employeeName: response.data.employeeName,
            departmentId: response.data.departmentId,
            employeePosition: response.data.employeePosition,
            phoneNumber: response.data.phoneNumber,
            telephoneNumber: response.data.telephoneNumber,
            email: response.data.email,
            address: response.data.address,
            identityNumber: response.data.identityNumber,
            identityPlace: response.data.identityPlace,
            bankAccountNumber: response.data.bankAccountNumber,
            bankName: response.data.bankName,
            bankBranchName: response.data.bankBranchName,
          };
          this.employee.gender = Common.formatGender(response.data.gender);
          console.log(response.data);
          this.DepartmentId = response.data.departmentId;
          /* Format lại dữ liệu ngày tháng năm */
          if (response.data.dateOfBirth != "") {
            this.employee.dateOfBirth = Common.formatDateYYYYMMDD(
              response.data.dateOfBirth
            );
          }
          if (response.data.identityDate != "") {
            this.employee.identityDate = Common.formatDateYYYYMMDD(
              response.data.identityDate
            );
          }
          this.employeeId = "";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    /**
     * Refresh lại dữ liệu
     * CreatedBy: DQDuy (10/12/2021)
     */
    refresh() {
      this.employeeId = "";
      this.loadData();
      setTimeout(() => {
        this.isLoading = true;
      }, 0);
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    },
    /**
     * Hiển thị toast message
     * CreatedBy: DQDuy (10/12/2021)
     */
    showToastMessage() {
      setTimeout(() => {
        this.isShowToast = true;
      }, 0);
      setTimeout(() => {
        this.isShowToast = false;
      }, 3000);
    },
    /**
     * Đóng PopUp thông báo lỗi
     * CreatedBy: DQDuy (12/12/2021)
     */
    closePopUp() {
      this.isError = false;
      this.showPopUp = false;
      this.employeeCodeDelete = "";
      this.toogleMenu = false;
    },

    /**
     * Thay đổi số lượng bản ghi trên một trang
     * CreatedBy: DQDuy (14/12/2021)
     */
    changeRecordNumber(pageRecord) {
      this.pageSize = pageRecord;
      this.refresh();
    },

    /**
     * Chuyển trang
     * CreatedBy: DQDuy (17/12/2021)
     */
    changePageNumber(pageNumber) {
      this.pageNumber = pageNumber;
      this.refresh();
    },

    /**
     * Thực hiện lấy toàn bộ Id nhân viên ô checkbox
     * CreatedBy: DQDuy (22/12/2021)
     */
    selectAllId() {
      try {
        if (!this.isSelectAllId) {
          for (let i in this.employees) {
            this.selectedId.push(this.employees[i].employeeId);
          }
        } else {
          this.selectedId = [];
        }
        console.log(this.selectedId);
      } catch (error) {}
    },

    /**
     * Thực hiện lấy từng giá trị Id nhân viên một, tham số truyền vào là một EmployeeId
     * CreatedBy: DQDuy (22/12/2021)
     */
    selectId(employeeId) {
      try {
        // kiểm tra xem Id đã tồn tại trong mảng selectedId hay chưa
        if (!this.selectedId.includes(employeeId)) {
          this.selectedId.push(employeeId);
        } else {
          // nếu Id đã tồn tại trong mảng selectedId thì sẽ xoá Id đó khỏi mảng - tức là khi 2 lần vào ô checkbox
          this.selectedId.forEach((item, index) => {
            if (employeeId == item) {
              this.selectedId.splice(index, 1);
            }
          });
        }
        console.log(this.selectedId);
      } catch (error) {}
    },
    /**
     * Tìm kiếm nhân viên theo tên, mã
     * CreatedBy: DQDuy (15/12/2021)
     */
    searchEmployee(value) {
      this.searchText = value;
      this.loadData();
    },

    /**
     * Làm mới các trường theo ý muốn
     * CreatedBy: DQDuy (26/12/2021)
     */
    customEmpty() {
      console.log("1");
    },
  },
};
</script>

<style>
@import url("../../../style/page/employee.css");
</style>

 