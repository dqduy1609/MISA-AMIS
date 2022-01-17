<template>
  <div>
    <!-- DIALOG POPUP: INSERT, UPDATE EMPLOYEE -->
    <div id="dlgPopup" class="m-dialog-modal" v-show="isOpen">
      <div class="m-dialog-box">
        <div class="m-dialog-header">
          <div class="m-dialog-header-body">
            <div class="m-dialog-title">Thông tin nhân viên</div>
            <div class="show-dialog-customer">
              <input type="checkbox" class="m-checkbox" /> Là khách hàng
            </div>
            <div class="show-dialog-vendor">
              <input type="checkbox" class="m-checkbox" /> Là nhà cung cấp
            </div>
          </div>

          <div class="m-dialog-header-close">
            <div class="m-icon m-icon-help icon-24"></div>
            <div
              id="btnClosePopup"
              class="m-icon m-icon-close icon-24"
              v-on:click="popUpToCloseForm"
            ></div>
          </div>
        </div>

        <div class="m-dialog-content">
          <div class="m-dialog-content-left">
            <div class="m-row m-row-flex">
              <div class="m-col w40">
                <input
                  type="text"
                  id="nothing"
                  style="width: 0%; height: 0%; position: fixed; top: -100%"
                />
                <div class="m-info-text">
                  Mã <span style="color: red">*</span>
                </div>
                <input
                  type="text"
                  id="txtEmployeeCode"
                  ref="txtEmployeeCode"
                  class="m-input w100"
                  v-model="employee.employeeCode"
                  :class="{
                    'm-input-error':
                      isSubmit &&
                      $v.employee.employeeCode.$error &&
                      formIsActive,
                  }"
                  :title="
                    isSubmit && $v.employee.employeeName.$error
                      ? titleCodeError
                      : null
                  "
                />
              </div>
              <div class="m-col w60">
                <div class="m-info-text">
                  Tên <span style="color: red">*</span>
                </div>
                <input
                  type="text"
                  id="txtEmployeeName"
                  class="m-input w100"
                  v-model="employee.employeeName"
                  :class="{
                    'm-input-error':
                      isSubmit &&
                      $v.employee.employeeName.$error &&
                      formIsActive,
                  }"
                  :title="
                    isSubmit && $v.employee.employeeName.$error
                      ? titleNameError
                      : null
                  "
                />
              </div>
            </div>
            <div class="m-row m-row-flex">
              <div class="m-col w100">
                <div class="m-info-text">
                  Đơn vị <span style="color: red">*</span>
                </div>
                <!--Combobox Component-->

                <Combobox
                  v-model="employee.departmentId"
                  ref="departmentDropDown"
                />

                <!-- <v-select
                  :options="Departments"
                  label="departmentName"
                  :reduce="(ontion) => ontion.departmentId"
                  v-model="employee.departmentId"
                  :class="{
                    'm-input-error':
                      isSubmit && $v.employee.departmentId.$error,
                  }"
                  @click="showCbbItem"
                >
                 
                  <template v-slot:option="option">
                    <div>
                   
                      <div class="vs__option">{{ option.departmentName }}</div>
                    </div>
                  </template>
                  <template v-slot:no-options="{ search, searching }">
                    <template v-if="searching">
                      Không tìm thấy <em>{{ search }}</em
                      >.
                    </template>
                    <em v-else style="opacity: 0.5"
                      >Điền vào ô để tìm kiếm tên đơn vị.</em
                    >
                  </template>
                </v-select> -->
              </div>
            </div>
            <div class="m-row m-row-flex">
              <div class="m-col w100">
                <div class="m-info-text">Chức danh</div>
                <input
                  type="text"
                  id="txtPositionName"
                  class="m-input w100"
                  v-model="employee.employeePosition"
                />
              </div>
            </div>
          </div>
          <div class="m-dialog-content-right">
            <div class="m-row m-row-flex">
              <div class="m-col w40">
                <div class="m-info-text">Ngày sinh</div>
                <input
                  type="date"
                  class="m-input w100"
                  v-model="employee.dateOfBirth"

                />
              </div>
              <div class="m-col w60" style="padding-left: 10px">
                <div class="m-info-text">Giới tính</div>
                <div
                  class="m-radio-box"
                  style="align-items: center; height: 32px"
                >
                  <div class="m-radio-option">
                    <input
                      type="radio"
                      name="Gender"
                      value="1"
                      v-model="employee.gender"
                    />
                    <label class="m-radio-label">Nam</label>
                  </div>
                  <div class="m-radio-option">
                    <input
                      type="radio"
                      name="Gender"
                      value="0"
                      v-model="employee.gender"
                    />
                    <label class="m-radio-label">Nữ</label>
                  </div>
                  <div class="m-radio-option">
                    <input
                      type="radio"
                      name="Gender"
                      value="2"
                      v-model="employee.gender"
                    />
                    <label class="m-radio-label">Khác</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="m-row m-row-flex">
              <div class="m-col w60">
                <div class="m-info-text">Số CMTND/Căn cước</div>
                <input
                  type="text"
                  id="txtIdentityNumber"
                  class="m-input w100"
                  fieldName="IdentityNumber"
                  v-model="employee.identityNumber"
                  title="Số Chứng minh nhân dân hoặc Căn cước công dân"
                />
              </div>
              <div class="m-col w40">
                <div class="m-info-text">Ngày cấp</div>
                <input
                  type="date"
                  id="dtIdentityDate"
                  class="m-input w100"
                  fieldName="IdentityDate"
                  v-model="employee.identityDate"
                />
              </div>
            </div>

            <div class="m-row m-row-flex">
              <div class="m-col w100">
                <div class="m-info-text">Nơi cấp</div>
                <input
                  type="text"
                  id="dtIdentityPlace"
                  class="m-input w100"
                  v-model="employee.identityPlace"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="m-dialog-content-bottom">
          <div class="m-row m-row-flex">
            <div class="m-col w100">
              <div class="m-info-text text-align-left">Địa chỉ</div>
              <input
                type="text"
                id="txtAddress"
                class="m-input w100"
                v-model="employee.address"
              />
            </div>
          </div>
          <div class="m-row m-row-flex">
            <div class="m-col w25">
              <div class="m-info-text text-align-left">ĐT di động</div>
              <input
                type="text"
                id="txtTelephoneNumber"
                class="m-input w100"
                v-model="employee.telephoneNumber"
              />
            </div>
            <div class="m-col w25">
              <div class="m-info-text text-align-left">ĐT cố định</div>
              <input
                type="text"
                id="txtPhoneNumber"
                class="m-input w100"
                v-model="employee.phoneNumber"
              />
            </div>
            <div class="m-col w25">
              <div class="m-info-text text-align-left">Email</div>
              <input
                type="text"
                id="txtEmail"
                class="m-input w100"
                placeholder="abc@xyz"
                v-model="employee.email"
              />
            </div>
          </div>

          <div class="m-row m-row-flex">
            <div class="m-col w25">
              <div class="m-info-text text-align-left">Tài khoản ngân hàng</div>
              <input
                type="text"
                id="txtBankAccountNumber"
                class="m-input w100"
                v-model="employee.bankAccountNumber"
              />
            </div>
            <div class="m-col w25">
              <div class="m-info-text text-align-left">Tên ngân hàng</div>
              <input
                type="text"
                id="txtBankName"
                class="m-input w100"
                v-model="employee.bankName"
              />
            </div>
            <div class="m-col w25">
              <div class="m-info-text text-align-left">Chi nhánh</div>
              <input
                type="text"
                id="txtBankBranchName"
                class="m-input w100"
                v-model="employee.bankBranchName"
              />
            </div>
          </div>
          <div
            class="m-row m-row-flex"
            style="height: 50px; border-bottom: 1px solid #e0e0e0"
          ></div>
        </div>

        <div class="m-dialog-footer">
          <button
            id="btnCancelPopup"
            class="m-second-btn"
            v-on:click="closeForm"
          >
            Hủy
          </button>
          <div class="m-flex-space"></div>
          <button
            class="m-second-btn"
            style="margin: 0 10px"
            v-on:click="submitAndClose"
          >
            Cất
          </button>
          <button class="m-btn" id="btnSaveData" v-on:click="submitAndContinue">
            Cất và Thêm
          </button>
        </div>
      </div>
    </div>

    <!--PopUp xác nhận có lưu dữ liệu hay không-->
    <div class="m-modal" v-show="isShowAlert">
      <div class="m-message-box">
        <div class="m-message-content">
          <div class="m-message-icon">
            <div class="m-icon m-icon-question icon-48"></div>
          </div>
          <span class="m-message-text">
            Dữ liệu đã được thay đổi. Bạn có muốn lưu?
          </span>
        </div>
        <div class="m-mess-line"></div>
        <div class="m-message-footer">
          <button class="m-second-btn" @click="cancelForm">Huỷ</button>
          <div class="m-flex-space"></div>
          <button
            class="m-second-btn"
            style="margin-right: 10px"
            @click="clearForm"
          >
            Không
          </button>
          <button class="m-btn" @click="submitAndClose">Có</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Resource from "../../../js/base/resource";

import { required } from "vuelidate/lib/validators";
import $ from "jquery";
import axios from "axios";
import Combobox from "../../Base/Combobox.vue";

export default {
  data() {
    return {
      isShowAlert: false,
      value: "",
      isSubmit: false,
      titleNameError: Resource["VN"].Warning.FullNameIsEmpty,
      titleCodeError: Resource["VN"].Warning.EmployeeCodeIsEmpty,
      inputChanged: 0,
      Departments: [],
      dateIsError : false
    };
  },
  components: { Combobox },
  props: {
    isOpen: {
      Type: Boolean,
      default: false,
    },
    employeeId: {
      Type: String,
      default: "",
    },
    employee: {
      Type: Object,
      default: {},
    },
    formIsActive: {
      Type: Boolean,
      default: true,
    },
  },
  validations: {
    employee: {
      employeeCode: { required },
      employeeName: { required },
      departmentId: { required },
    },
  },
  methods: {
    /**
     * Đóng form detail khi ấn button Huỷ
     * CreatedBy: DQDuy (10/12/2021)
     */
    closeForm() {
      this.$emit("closeForm");
    },
    /**
     * Hiển thị popup khi ấn Close (X)-> đóng Form
     * CreatedBy: DQDuy (10/12/2021)
     */
    popUpToCloseForm() {
      try {
        this.isSubmit = false;
        this.$refs.departmentDropDown.departmentIdIsNull = false;
        if (this.inputChanged > 1) {
          this.isShowAlert = true;
        } else {
          this.$emit("closeForm");
          this.inputChanged = 0;
        }
      } catch (error) {}
    },
    /**
     * Khi ấn Huỷ ở popup sẽ giữ lại form và các trường đã điền
     * CreatedBy: DQDuy (25/12/2021)
     */
    cancelForm() {
      this.isShowAlert = false;
    },

    /**
     * Khi ấn Không ở popup sẽ reset các ô input và đóng form
     * CreatedBy: DQDuy (25/12/2021)
     */
    clearForm() {
      this.isShowAlert = false;
      this.$emit("closeForm");
      this.inputChanged = 0;
    },
    /**
     * Submit form và tiếp tục nhập
     * CreatedBy: DQDuy (10/12/2021)
     */
    submitAndContinue() {
      this.$v.$touch();
      this.isSubmit = true;
      this.$refs.departmentDropDown.departmentIdIsNull =
        this.$v.employee.departmentId.$error;
      if (this.employeeId != "") {
        this.$emit("update-employee-continue", this.employee);
      } else {
        this.$emit("add-employee-continue", this.employee);
      }
    },

    /**
     * Submit form và đóng form
     * CreatedBy: DQDuy (10/12/2021)
     */
    submitAndClose() {
      this.$v.$touch();
      this.isSubmit = true;
      this.$refs.departmentDropDown.departmentIdIsNull =
        this.$v.employee.departmentId.$error;
      if (this.employeeId != "") {
        this.$emit("update-employee", this.employee);
      } else {
        this.$emit("add-employee", this.employee);
      }
      this.isShowAlert = false;
    },
    /**
     * Chọn item của combobox
     * CreatedBy: DQDuy (10/12/2021)
     */
    selectOptionDepartment(option) {
      this.value = option.departmentId;
      this.employee.departmentId = option.departmentId;
      this.employee.departmentName = option.departmentName;
    },

    /**
     * Khởi tạo nhân viên mới
     * CreatedBy: DQDuy (30/12/2021)
     */
    initNewEmployee(){
      let employee = {
        employeeCode: "",
        employeeName: "duy",
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
      }
      return employee;
    }
  },
  watch: {
    /**
     * Theo dõi sự thay đổi của ô input
     * CreatedBy: DQDuy (25/12/2021)
     */
    employee: {
      handler: function () {
        this.inputChanged += 1;
      },
      deep: true,
    },

    /**
     * Tự động focus vào ô mã nhân viên
     * CreatedBy: DQDuy (24/12/2021)
     */
    isOpen() {
      setTimeout(() => {
        this.$refs.txtEmployeeCode.focus();
      }, 10);
    },

    /**
     * Validate Ngày tháng năm không được lớn hơn ngày hiện tại
     * CratedBy: DQDuy (31/12/2021)
     */
    validateTime(){
      let nowDate = new Date();
      if(this.employee.dateOfBirth > nowDate){
        this.dateIsError = true;
      }
    }
  },
};
</script>

<style>
</style>>
