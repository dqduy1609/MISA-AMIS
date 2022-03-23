<template>
  <div class="m-popup">
    <div
      class="m-popup-content"
      :style="[{ width: '900px' }, { 'border-radius': 0 }]"
    >
      <div class="m-popup__header">
        <div class="m-popup-tittle">Thông tin nhà cung cấp</div>
        <div class="al_center">
          <RadioGroup class="custom-padding" :items="listAccount" />
        </div>
        <div class="al_center">
          <Checkbox class="custom-padding" :label="'Là khách hàng'" />
        </div>
        <div class="m-popup-close">
          <div class="m-popup-btn help"></div>
          <div class="m-popup-btn close" @click="handleClosePopup"></div>
        </div>
      </div>

      <!--Content-->
      <div class="m-popup-body">
        <div class="grid__row" style="position: relative">
          <div class="w-1/2 p-r-26">
            <div class="grid__row">
              <TextField
                :disable="disableMode"
                class="w-2/5 p-r-6"
                :label="'Mã số thuế'"
                v-model="taxCode"
                ref="taxCode"
              />
              <TextField
                :disable="disableMode"
                class="w-3/5"
                :label="'Mã nhà cung cấp'"
                :required="true"
                v-model="accountObjectCode"
                ref="accountObjectCode"
                :checkInput="checkInput('accountObjectCode', accountObjectCode)"
                :errorText="resource.VN.Warning.AccountObjectCodeIsEmpty"
              />
            </div>
            <TextField
              :disable="disableMode"
              class="grid__row"
              :label="'Tên nhà cung cấp'"
              ref="accountObjectName"
              v-model="accountObjectName"
              :required="true"
              :checkInput="checkInput('accountObjectName', accountObjectName)"
              :errorText="resource.VN.Warning.AccountObjectNameIsEmpty"
            />
            <TextField
              :disable="disableMode"
              class="grid__row"
              :label="'Địa chỉ'"
              :inputType="'textarea'"
              v-model="address"
              :height="'55px'"
              :placeholder="resource.VN.Example.Address"
              ref="address"
            />
          </div>
          <div
            class="w-1/2"
            style="height: 194.3px; position: absolute; top: 0px; left: 50%"
          >
            <div class="grid__row">
              <TextField
                :disable="disableMode"
                class="w-2/5 p-r-6"
                :label="'Điện thoại'"
                v-model="phone"
                ref="phone"
              />
              <TextField
                :disable="disableMode"
                class="w-3/5"
                :label="'Website'"
                v-model="webSite"
              />
            </div>
            <CbbProviderGroup
              :disable="disableMode"
              class="grid__row"
              :label="'Nhóm nhà cung cấp'"
              :fields="fieldAccObjGroup"
              :datas="providerGroupData"
              :id="'accountObjectGroupCode'"
              :textShow="'accountObjectGroupCode'"
              :icon="true"
              :haveThead="true"
              v-model="accountObjectGroupListId"
              ref="accountObjectGroupListId"
              :fieldSearch="'accountObjectGroupName'"
            />

            <Combobox
              :disable="disableMode"
              :label="'Nhân viên'"
              :fields="fieldEmployee"
              :datas="dataEmployees"
              v-model="employeeId"
              :id="'employeeId'"
              :textShow="'fullName'"
              :icon="true"
              ref="employeeId"
            />
          </div>
        </div>

        <!--Chuyển tab-->
        <div class="popup-tab">
          <div class="tab">
            <ul class="ul-tab">
              <li
                class="ms-tabs-li"
                :class="slotTab == 1 || slotTab == 0 ? 'select' : ''"
              >
                <div type="button" class="ms-tabs-btn" @click="slotTab = 1">
                  Liên hệ
                </div>
              </li>

              <li class="ms-tabs-li" :class="slotTab == 2 ? 'select' : ''">
                <div type="button" class="ms-tabs-btn" @click="slotTab = 2">
                  Điều khoản thanh toán
                </div>
              </li>

              <li class="ms-tabs-li" :class="slotTab == 3 ? 'select' : ''">
                <div type="button" class="ms-tabs-btn" @click="slotTab = 3">
                  Tài khoản ngân hàng
                </div>
              </li>

              <li class="ms-tabs-li" :class="slotTab == 4 ? 'select' : ''">
                <div
                  type="button"
                  class="ms-tabs-btn"
                  @click="(slotTab = 4), (editLocation = true)"
                >
                  Địa chỉ khác
                </div>
              </li>

              <li class="ms-tabs-li" :class="slotTab == 5 ? 'select' : ''">
                <div type="button" class="ms-tabs-btn" @click="slotTab = 5">
                  Ghi chú
                </div>
              </li>
            </ul>
          </div>
          <div class="slot-tab">
            <!--Tab Liên hệ-->
            <div v-show="slotTab == 1 || slotTab == 0">
              <div class="grid__row" style="position: relative; margin: 10px">
                <div class="w-1/2 p-r-26">
                  <div class="grid__row" style="position: relative">
                    <Combobox
                      :disable="disableMode"
                      class="w-2/5 p-r-6"
                      :label="'Người liên hệ'"
                      :noneThead="true"
                      :fields="[{ name: 'value' }]"
                      :datas="vocativeList"
                      v-model="prefix"
                      :textShow="'value'"
                      :id="'value'"
                      ref="prefix"
                      :placeholder="'Xưng hô'"
                    />

                    <TextField
                      :disable="disableMode"
                      class="w-3/5"
                      style="position: absolute; top: 21px; right: 0"
                      :placeholder="'Họ và tên'"
                      v-model="einvoiceContactName"
                      ref="einvoiceContactName"
                    />
                  </div>
                  <TextField
                    :disable="disableMode"
                    class="grid__row"
                    :placeholder="'Email'"
                    v-model="einvoiceContactEmail"
                    ref="einvoiceContactEmail"
                  />
                  <TextField
                    :disable="disableMode"
                    class="grid__row w-1/2"
                    :placeholder="'Số điện thoại'"
                    v-model="einvoiceContactMobile"
                    ref="einvoiceContactMobile"
                  />
                </div>
                <div
                  class="w-1/2"
                  style="
                    height: 194.3px;
                    position: absolute;
                    top: 0px;
                    left: 50%;
                  "
                >
                  <div class="grid__row">
                    <TextField
                      :disable="disableMode"
                      class="grid__row"
                      :label="'Đại diện theo PL'"
                      :placeholder="'Đại diện theo PL'"
                      v-model="legalRepresentative"
                      ref="legalRepresentative"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!--Tab Điều khoản thanh toán-->
            <div v-show="slotTab == 2">
              <div
                class="grid__row"
                style="
                  position: relative;
                  margin: 10px;
                  justify-content: normal;
                "
              >
                <Combobox
                  :disable="disableMode"
                  class="grid__row w-1/4 p-r-6"
                  style="margin-bottom: -13px"
                  :label="'Điều khoản thanh toán'"
                  :fields="fieldPaymentTerm"
                  :datas="dataPaymentTerms"
                  :id="'paymentTermId'"
                  :textShow="'paymentTermCode'"
                  v-model="paymentTermId"
                  :icon="true"
                  :width="'500px'"
                  ref="paymentTermId"
                  :fieldSearch="'paymentTermName'"
                />
                <TextField
                  :disable="disableMode"
                  class="w-1/4 p-r-6"
                  :label="'Số ngày được nợ'"
                  v-model="dueTime"
                  ref="dueTime"
                />
                <TextField
                  :disable="disableMode"
                  class="w-1/4 p-r-6"
                  :label="'Số nợ tối đa'"
                  v-model="maximizeDebtAmount"
                  ref="maximizeDebtAmount"
                />
              </div>
              <div
                class="grid__row"
                style="
                  position: relative;
                  margin: 10px;
                  justify-content: normal;
                "
              >
                <Combobox
                  :disable="disableMode"
                  class="grid__row w-1/4 p-r-6"
                  style="margin-bottom: -13px"
                  :label="'Tài khoản nợ công phải trả'"
                  :fields="fieldPayAccounts"
                  :datas="payAccounts"
                  :id="'pay_account_code'"
                  :textShow="'pay_account_code'"
                  v-model="payAccount"
                  :icon="false"
                  :width="'350px'"
                  ref="payAccount"
                />
              </div>
            </div>

            <!--Tab Tài khoản ngân hàng-->
            <div v-show="slotTab == 3">
              <TableCustomRow
                :disable="disableMode"
                style="width: 100%; padding: 0 8px"
                :fields="fieldTableBank"
                v-model="accountObjectBankAccount"
                ref="accountObjectBankAccount"
                :haveStt="false"
                :haveThead="true"
              />
            </div>

            <!--Tab Địa chỉ khác-->
            <div v-show="slotTab == 4">
              <div class="grid__row" style="position: relative; margin: 10px">
                <div class="w-1/2 p-r-26">
                  <div class="grid__row" style="position: relative">
                    <Combobox
                      :disable="disableMode"
                      class="w-1/2 p-r-6"
                      :label="'Vị trí địa lý'"
                      :noneThead="true"
                      v-model="country"
                      :fields="[{ name: 'location_name' }]"
                      :datas="countryList"
                      :id="'location_id'"
                      :textShow="'location_name'"
                      :placeholder="'Quốc gia'"
                      ref="country"
                    />
                    <Combobox
                      :disable="disableMode"
                      style="position: absolute; top: 21px; right: 0"
                      class="w-1/2"
                      :placeholder="'Tỉnh/Thành Phố'"
                      :noneThead="true"
                      v-model="provinceOrCity"
                      :datas="provinceOrCityList"
                      :fields="[{ name: 'location_name' }]"
                      :id="'location_id'"
                      :textShow="'location_name'"
                    />
                  </div>
                  <div class="grid__row">
                    <Combobox
                      :disable="disableMode"
                      class="w-1/2 p-r-6"
                      :noneThead="true"
                      :placeholder="'Quận/Huyện'"
                      v-model="district"
                      :datas="districtList"
                      :fields="[{ name: 'location_name' }]"
                      :id="'location_id'"
                      :textShow="'location_name'"
                    />
                    <Combobox
                      :disable="disableMode"
                      class="w-1/2"
                      :noneThead="true"
                      :placeholder="'Xã/Phường'"
                      v-model="wardOrCommune"
                      :fields="[{ name: 'location_name' }]"
                      :datas="wardOrCommuneList"
                      :id="'location_id'"
                      :textShow="'location_name'"
                    />
                  </div>
                </div>

                <div
                  class="w-1/2"
                  style="
                    height: 194.3px;
                    position: absolute;
                    top: 0px;
                    left: 50%;
                  "
                >
                  <div
                    class="grid__row"
                    style="
                      padding-bottom: 0;
                      height: 15px;
                      justify-content: flex-start;
                    "
                  >
                    <div class="m-text-tittle">Địa chỉ giao hàng</div>
                    <div @change="coppyAddres = !coppyAddres">
                      <Checkbox
                        :label="'Giống địa chỉ nhà cung cấp'"
                        style="margin-left: 18px"
                      />
                    </div>
                  </div>
                  <div class="grid__row">
                    <TableCustomRow
                      :fields="fieldTableAddress"
                      v-model="accountObjectShippingAddress"
                      ref="accountObjectShippingAddress"
                      :disable="disableMode"
                      :haveThead="false"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-show="slotTab == 5">
              <!-- <textarea
                class="m-text-tab"
                v-model="description"
                ref="description"
                :disable="disableMode"
              /> -->
              <TextField
                :inputType="'textarea'"
                :height="'215px'"
                v-model="description"
                ref="description"
                :disable="disableMode"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="m-popup-footer">
        <div class="divide"></div>
        <div class="grid__row" style="margin-bottom: 10px; direction: rtl">
          <div>
            <Button
              class="m-popup-footer-btn"
              :backgroundcolor="'#2ca01c'"
              :color="'#fff'"
              @handleClick="handleBtnSaveAndAdd"
              >Cất và Thêm</Button
            >
            <Button
              class="m-popup-footer-btn p-r-12"
              @handleClick="handleBtnSave"
              style="color: black; background: #ffffff; margin-right: 12px"
              >Cất</Button
            >
          </div>
          <div>
            <Button
              class="m-popup-footer-btn"
              :color="'transparent'"
              style="color: black; background: #ffffff"
              @handleClick="distroyPopup"
              >Hủy</Button
            >
          </div>
        </div>
      </div>
    </div>
    <MessageBox
      v-if="showMsg"
      :type="typeMsg"
      :text="textBox"
      @handleConfirmMessage="handleBtnSave"
      @handleCanclemMessage="handleCancel"
      @handleCloseMessage="closeMessageBox"
    />
  </div>
</template>

<script>
import axios from "axios";
import Resource from "../../js/provider/resource";
import TextField from "../../components/base/TextField.vue";
import Checkbox from "../../components/base/Checkbox.vue";
import RadioGroup from "../../components/base/RadioGroup.vue";
import Combobox from "../../components/provider/CbbProvider.vue";
import CbbProviderGroup from "../../components/provider/CbbProviderGroup.vue";
import TableCustomRow from "../../components/base/TableCustomRow.vue";
import Button from "../../components/base/Button.vue";
import MessageBox from "../../components/base/MessageBox.vue";
import Location from "../../js/location";
import Enum from "../../js/enum";
export default {
  components: {
    Checkbox,
    RadioGroup,
    TextField,
    Combobox,
    CbbProviderGroup,
    TableCustomRow,
    Button,
    MessageBox,
  },
  data() {
    return {
      coppyAddres: false,
      resource: Resource,
      showMsg: false,
      typeMsg: "",
      formIsActive: true,
      textBox: "",
      fieldTableAddress: [
        {
          name: "address",
          text: "",
        },
      ],
      // combobox nhân viên mua hàng
      fieldEmployee: [
        {
          name: "employeeCode",
          text: "Mã nhân viên",
        },
        {
          name: "fullName",
          text: "Tên nhân viên",
        },
      ],
      // combobox nhóm nhà cc
      fieldAccObjGroup: [
        {
          key: "accountObjectGroupCode",
          text: "Mã nhóm KH,NCC",
        },
        {
          key: "accountObjectGroupName",
          text: "Tên nhóm KH,NCC",
        },
      ],
      // combobox điều khoản thanh toán
      fieldPaymentTerm: [
        {
          name: "paymentTermCode",
          text: "Mã điều khoản thanh toán",
        },
        {
          name: "paymentTermName",
          text: "Tên điều khoản thanh toán",
        },
      ],
      // combobox tài khoản nợ công
      fieldPayAccounts: [
        {
          name: "pay_account_code",
          text: "Số tài khoản",
        },
        {
          name: "pay_account_name",
          text: "Tên tài khoản",
        },
      ],

      fieldTableBank: [
        {
          name: "bank_account",
          text: "Số tài khoản",
        },
        {
          name: "bank_branch_name",
          text: "Tên ngân hàng",
        },
        {
          name: "bank_name",
          text: "Chi nhánh",
        },
        {
          name: "bank_province_or_city",
          text: "tỉnh/tp của ngân hàng",
        },
      ],
      /* Tài khoản công nợ */
      payAccounts: [
        {
          pay_account_code: "331",
          pay_account_name: "Phải trả cho người bán",
        },
        {
          pay_account_code: "3348",
          pay_account_name: "Phải trả cho người lao động khác",
        },
        {
          pay_account_code: "555",
          pay_account_name: "Phải trả cho nhân viên",
        },
      ],

      listAccount: [
        {
          id: "0",
          name: "Tổ chức",
        },
        {
          id: "1",
          name: "Cá nhân",
        },
      ],

      disableMode: false,
      /* Các trường */
      accountObjectId: "", //id nhà cung cấp
      taxCode: "", // mã số thuế
      accountObjectCode: "", // mã nhà cung cấp
      accountObjectName: "", // tên nhà cung cấp
      phone: "", // số điện thoại
      webSite: "", // webSide
      accountObjectGroupListId: [], // danh sách nhóm nhà cung cấp
      address: "", // địa chỉ
      employeeId: null, // id nhân viên
      prefix: null, // xưng hô người liên hện
      einvoiceContactName: "", // họ và tên người liên hệ
      einvoiceContactMobile: "", // số điện thoại người liên hệ
      einvoiceContactEmail: "", // Email người liên hệ
      legalRepresentative: "", // dại diện theo PL
      paymentTermId: null, // id điều khoản Thanh toán
      maximizeDebtAmount: "1000000000", // nợ tối đa
      dueTime: "", // số ngày được nợ
      payAccount: "", // mã tài khoản nợ công phải trả
      accountObjectBankAccount: [{}],
      accountObjectShippingAddress: [{}],
      country: "", // đất nước
      provinceOrCity: "", // tỉnh thành phố
      district: "", // quận huyện
      wardOrCommune: "", //phường xã
      description: "", // ghi chú

      /* Đánh dấu tab trong form chi tiết */
      slotTab: 0,
      vocativeList: [
        {
          value: "Anh",
        },
        {
          value: "Chị",
        },
      ],

      countryList: [],
      provinceOrCityList: [],
      districtList: [],
      wardOrCommuneList: [],
      // dữ liệu tạm thời
      tempData: {},
      listAccountGroupIdString: "",

      // kiểm tra sự thay đổi dữ liệu ở form detail
      dataChange: "",
      PRO_SERVICE_URL: Resource.AMIS_SERVICE_URL,
      saveAdd: false,
      ValidateMode: false,
      FocusInput: false,
      // toast message
      toastText: "",
      isShowToast: true,
      toastError: false,
      isRequest: false,
      isSaveAndAdd: false,
      editLocation: false,
    };
  },
  props: {
    formMode: Number,
    dataEmployees: Array,
    providerGroupData: Array,
    dataPaymentTerms: Array,
    focusId: String,
  },
  methods: {
    /**
     * Sự kiện khi bấm dấu (X): đóng form detail
     * CreatedBy: DQDUY (1/3/2022)
     */
    handleClosePopup() {
      this.getData();
      console.log(this.tempData);
      console.log(this.dataChange);
      if (
        this.formMode != Enum.FormMode.Show &&
        this.dataChange != JSON.stringify(this.tempData)
      ) {
        this.showMsg = true;
        this.typeMsg = "question";
        this.textBox = this.resource.VN.Question.CloseForm;
      } else {
        this.distroyPopup();
      }
    },
    /**
     * Sự kiện khi bấm nút "HUỶ" ở MessageBox, chỉ MessageBox nhưng vẫn giữ lại thông tin và form detail
     * CreatedBy: DQDUY (1/3/2022)
     */
    handleCancel() {
      this.showMsg = false;
      this.doFocus();
    },
    /**
     * Sự kiện khi bấm nút "KHÔNG" ở MessageBox, đóng MessageBox và cả form Detail, xoá hết text đã nhập ở các input
     * CreatedBy: DQDUY (1/3/2022)
     */
    closeMessageBox() {
      this.showMsg = false;
      this.distroyPopup();
      this.refreshData();
    },

    /**
     * Hàm làm mới dữ liệu đổ lên table
     *  CreatedBy: DQDUY (1/3/2022)
     */
    reLoadData() {
      this.$emit("reLoadData");
    },

    /**
     * Hàm xử lý sự kiện nhấn nút thêm
     * CreatedBy: DQDUY (3/3/2022)
     */
    async handleBtnAdd() {
      this.ValidateMode = false;
      this.formMode = Enum.FormMode.Add;
      this.refreshData();
      await this.getNewCode();
      this.getData();
      this.FocusInput = false;
      this.dataChange = JSON.stringify(this.tempData);
    },
    /**
     * Lưu bản ghi và giữ lại form để tiếp tục nhập
     * CreatedBy: DQDUY (1/3/2022)
     */
    async handleBtnSaveAndAdd() {
      this.isSaveAndAdd = true;
      let validate = this.checkValidate();
      this.FocusInput = false;
      let isAvailable;
      if (validate) {
        this.getData();
        if (
          this.formMode == Enum.FormMode.Add ||
          this.formMode == Enum.FormMode.Clone
        ) {
          isAvailable = await this.checkAvailableProviderCode();
          if (isAvailable) {
            this.showMsg = true;
            this.typeMsg = "error";
            this.textBox = Resource["VN"].Warning.AccountObjectCodeIsAvailable;
          } else {
            axios
              .post(`${this.PRO_SERVICE_URL}/AccountObject`, this.tempData)
              .then(() => {
                this.toastText = this.resource.VN.ToastMessage.AddSuccess;
                this.toastError = false;
                this.$emit("showToast", this.toastText, this.toastError);
                this.refreshData();
                this.getNewCode();
                this.isSaveAndAdd = false;
              })
              .catch((error) => {
                this.toastText = this.resource.VN.ToastMessage.Error;
                this.toastError = true;
                this.$emit("showToast", this.toastText, this.toastError);
                console.error(error);
                this.isSaveAndAdd = false;
              });
          }
        } else if (this.formMode == Enum.FormMode.Edit) {
          isAvailable = await this.checkAvailableProviderCode();
          if (isAvailable) {
            this.showMsg = true;
            this.typeMsg = "error";
            this.textBox = Resource["VN"].Warning.AccountObjectCodeIsAvailable;
          } else {
            await axios
              .put(
                `${this.PRO_SERVICE_URL}/AccountObject/${this.focusId}`,
                this.tempData
              )
              .then(() => {
                this.toastText = this.resource.VN.ToastMessage.UpdateSuccess;
                this.toastError = false;
                this.$emit("showToast", this.toastText, this.toastError);
                this.refreshData();
                this.getNewCode();
                this.isSaveAndAdd = false;
                this.reLoadData();
              })
              .catch((error) => {
                this.toastText = this.resource.VN.ToastMessage.Error;
                this.toastError = true;
                this.$emit("showToast", this.toastText, this.toastError);
                console.error(error);
                this.isSaveAndAdd = false;
              });
          }
        }
      }
      this.$emit("saveAndAdd");
      this.reLoadData();
    },
    /**
     * Khi bấm nút "Cất"
     * CreatedBy: DQDUY (1/3/2022)
     */
    async handleBtnSave() {
      this.showMsg = false;
      let validate = this.checkValidate();
      this.FocusInput = false;
      let isAvailable;
      if (validate) {
        this.getData();
        if (
          this.formMode == Enum.FormMode.Add ||
          this.formMode == Enum.FormMode.Clone
        ) {
          isAvailable = await this.checkAvailableProviderCode();
          if (isAvailable) {
            this.showMsg = true;
            this.typeMsg = "error";
            this.textBox = Resource["VN"].Warning.AccountObjectCodeIsAvailable;
          } else {
            // insert data provider
            await this.callApiCreate(this.tempData);
          }
        } else if (this.formMode == Enum.FormMode.Edit) {
          isAvailable = await this.checkAvailableProviderCode();
          if (isAvailable) {
            this.showMsg = true;
            this.typeMsg = "error";
            this.textBox = Resource["VN"].Warning.AccountObjectCodeIsAvailable;
          } else {
            this.tempData.accountObjectId = this.focusId;
            await this.callApiUpdate(this.focusId, this.tempData);
          }
        }
      }
    },
    /**
     * Gọi API, thêm mới một bản ghi
     * CreatedBy: DQDUY (3/3/2022)
     */
    callApiCreate(data) {
      this.isRequest = true;
      axios
        .post(`${this.PRO_SERVICE_URL}/AccountObject`, data)
        .then(() => {
          this.toastText = this.resource.VN.ToastMessage.AddSuccess;
          this.toastError = false;

          this.distroyPopup();

          this.$emit("showToast", this.toastText, this.toastError);
        })
        .catch((error) => {
          this.toastText = this.resource.VN.ToastMessage.Error;
          this.toastError = true;
          this.$emit("showToast", this.toastText, this.toastError);
          this.distroyPopup();
          console.error(error);
        });
    },

    /**
     * Gọi API PUT, update một bản ghi
     * CreatedBy: DQDUY (3/3/2022)
     */
    async callApiUpdate(id, data) {
      this.isRequest = true;
      await axios
        .put(`${this.PRO_SERVICE_URL}/AccountObject/${id}`, data)
        .then(() => {
          this.toastText = this.resource.VN.ToastMessage.UpdateSuccess;
          this.toastError = false;

          this.distroyPopup();

          this.$emit("showToast", this.toastText, this.toastError);
        })
        .catch((error) => {
          this.toastText = this.resource.VN.ToastMessage.Error;
          this.toastError = true;

          this.distroyPopup();

          this.$emit("showToast", this.toastText, this.toastError);

          console.error(error);
        });
    },
    /**
     * Lấy dữ liệu
     * CreatedBy: DQDUY(3/3/2022)
     */
    getData() {
      this.tempData = {
        taxCode: this.taxCode,
        accountObjectCode: this.accountObjectCode,
        accountObjectName: this.accountObjectName,
        phone: this.phone,
        webSite: this.webSite,
        accountObjectGroupListId: this.listAccountGroupIdString,
        address: this.address,
        employeeId: this.employeeId,
        prefix: this.prefix,
        einvoiceContactName: this.einvoiceContactName,
        einvoiceContactMobile: this.einvoiceContactMobile,
        einvoiceContactEmail: this.einvoiceContactEmail,
        legalRepresentative: this.legalRepresentative,
        paymentTermId: this.paymentTermId,
        maximizeDebtAmount: this.maximizeDebtAmount,
        dueTime: parseInt(this.dueTime),
        payAccount: this.payAccount,
        accountObjectBankAccount: this.accountObjectBankAccount,
        accountObjectShippingAddress: this.accountObjectShippingAddress,
        country: this.country,
        provinceOrCity: this.provinceOrCity,
        district: this.district,
        wardOrCommune: this.wardOrCommune,
        description: this.description,
      };
    },
    /**
     * Gọi Api lấy mã ncc mới
     * CreatedBy: DQDUY (3/3/2022)
     */
    async getNewCode() {
      await axios
        .get(`${this.PRO_SERVICE_URL}/AccountObject/NewCode`)
        .then((res) => {
          this.accountObjectCode = res.data.data;
          console.log(this.accountObjectCode);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /**
     * check trùng id
     * CreatedBy: DQDUY (5/3/2022)
     */
    async checkAvailableProviderCode() {
      let isAvailable = false;
      await axios
        .get(
          `${this.PRO_SERVICE_URL}/AccountObject/GetByCode?EntityCode=${this.accountObjectCode}`
        )
        .then((res) => {
          if (res.data.data) {
            if (this.formMode == Enum.FormMode.Edit) {
              if (res.data.data.accountObjectId == this.focusId) {
                isAvailable = false;
              } else {
                isAvailable = true;
              }
            } else {
              isAvailable = true;
            }
          }
        });
      return isAvailable;
    },

    /**
     * Hàm check điều kiện và hiển thị Input báo đỏ
     * CreatedBy: DQDUY (5/3/2022)
     */
    checkInput(nameRef, value) {
      let valid = false;

      if (nameRef == "einvoiceContactEmail") {
        if (
          this.ValidateMode == true &&
          value != "" &&
          String(value).indexOf("@") == -1
        ) {
          valid = true;
        } else {
          valid = false;
        }
      } else {
        if (this.ValidateMode == true && value == "") {
          valid = true;
        } else {
          valid = false;
        }
      }

      return valid;
    },
    /**
     * Hàm validate dữ liệu
     *CreatedBy: DQDUY (5/3/2022)
     */
    checkValidate() {
      this.ValidateMode = true;
      var valid = false;
      if (this.accountObjectCode == "") {
        valid = true;
        this.textBox = Resource["VN"].Warning.AccountObjectCodeIsEmpty;
      } else if (this.accountObjectName == "") {
        valid = true;
        this.textBox = Resource["VN"].Warning.AccountObjectNameIsEmpty;
      }
      if (valid) {
        this.showMsg = true;
        this.typeMsg = "error";
        return false;
      }
      return true;
    },

    /**
     * Hàm Focus vào ô nhập liệu
     *CreatedBy: DQDUY (5/3/2022)
     */
    doFocus() {
      if (this.formMode != null) {
        let ListFocus = [
          "accountObjectCode",
          "accountObjectName",
          "einvoiceContactEmail",
        ];
        ListFocus.forEach((nameRef) => {
          if (this.FocusInput == false && nameRef == "einvoiceContactEmail") {
            {
              if (
                this.ValidateMode == true &&
                this[nameRef] != "" &&
                String(this[nameRef]).indexOf("@") == -1
              ) {
                this.$refs[nameRef].$el.querySelector("input").focus();
                this.FocusInput = true;
              }
            }
          } else if (this.FocusInput == false && this[nameRef] == "") {
            this.$refs[nameRef].$el.querySelector("input").focus();
            this.FocusInput = true;
          }
        });
      }
    },
    /**
     * Hàm show thông tin nhà cung cấp
     * CreatedBy: DQDUY (3/3/2022)
     */
    async showDataProvider() {
      await this.getDataProviderById(this.focusId);
      this.disableMode = true;
    },

    /**
     * Lấy thông tin NCC theo Id
     * CreatedBy: DQDUY (3/3/2022)
     */
    getDataProviderById(id) {
      axios.get(`${this.PRO_SERVICE_URL}/AccountObject/${id}`).then((res) => {
        if (
          this.formMode == Enum.FormMode.Edit ||
          this.formMode == Enum.FormMode.Show
        ) {
          this.accountObjectCode = res.data.data.accountObjectCode;
        }
        this.taxCode = res.data.data.taxCode;
        this.accountObjectName = res.data.data.accountObjectName;
        this.phone = res.data.data.phone;
        this.webSite = res.data.data.website;
        if (res.data.data.accountObjectGroupListId.split(",")) {
          this.accountObjectGroupListId =
            res.data.data.accountObjectGroupListId.split(",");
        }
        this.listAccountGroupIdString = "";
        this.accountObjectGroupListId.forEach((item) => {
          this.listAccountGroupIdString += item + ",";
        });
        this.listAccountGroupIdString = this.listAccountGroupIdString.slice(
          0,
          this.listAccountGroupIdString.length - 1
        );
        this.address = res.data.data.address;
        this.employeeId = res.data.data.employeeId;
        this.prefix = res.data.data.prefix;
        this.einvoiceContactName = res.data.data.einvoiceContactName;
        this.einvoiceContactMobile = res.data.data.einvoiceContactMobile;
        this.einvoiceContactEmail = res.data.data.einvoiceContactEmail;
        this.legalRepresentative = res.data.data.legalRepresentative;
        this.paymentTermId = res.data.data.paymentTermId;
        this.maximizeDebtAmount = res.data.data.maximizeDebtAmount;
        this.dueTime = String(res.data.data.dueTime);
        this.payAccount = res.data.data.payAccount;
        this.accountObjectBankAccount = JSON.parse(
          res.data.data.accountObjectBankAccountJson
        );
        this.accountObjectShippingAddress = JSON.parse(
          res.data.data.accountObjectShippingAddressJson
        );
        this.country = res.data.data.country;
        this.provinceOrCity = res.data.data.provinceOrCity;
        this.district = res.data.data.district;
        this.wardOrCommune = res.data.data.wardOrCommune;
        this.description = res.data.data.description;

        this.editLocation = false;
        this.getData();
        this.dataChange = JSON.stringify(this.tempData);
      });
    },
    /**
     * Hàm làm mới dữ liệu lưu trữ
     * DQDUY (3/3/2022)
     */
    async refreshData() {
      this.accountObjectId = "";
      this.taxCode = "";
      this.accountObjectCode = "";
      this.accountObjectName = "";
      this.phone = "";
      this.webSite = "";
      this.accountObjectGroupListId = [];
      this.address = "";
      this.employeeId = null;
      this.prefix = "";
      this.einvoiceContactName = "";
      this.einvoiceContactMobile = "";
      this.einvoiceContactEmail = "";
      this.legalRepresentative = "";
      this.paymentTermId = null;
      this.maximizeDebtAmount = "1000000000";
      this.dueTime = "0";
      this.payAccount = "";
      this.accountObjectBankAccount = [
        {
          bank_account: "",
          bank_branch_name: "",
          bank_name: "",
          bank_province_or_city: "",
        },
      ];
      this.accountObjectShippingAddress = [{ address: "" }];
      this.country = "";
      this.provinceOrCity = "";
      this.district = "";
      this.wardOrCommune = "";
      this.description = "";
    },

    /**
     * Hàm xử lý khi bấm phím tắt Crtl + S: lưu / Esc : đóng form
     * CreatedBy: DQDUY (6/3/2022)
     */
    handleKeyUpList(e) {
      if (e.ctrlKey && e.keyCode == 83) {
        this.handleBtnSave();
        this.$parent.$refs.btnAdd.$el.querySelector("button").blur();
        e.preventDefault(); // hủy event mặc định
        e.stopPropagation(); // tránh liên quan đến event khác
      } else if (e.keyCode == 27) {
        e.preventDefault(); // hủy event mặc định
        e.stopPropagation(); // tránh liên quan đến event khác
        this.handleClosePopup();
        this.$parent.$refs.btnAdd.$el.querySelector("button").blur();
      }
    },

    /**
     * Chức năng nhân bản
     *  CreatedBy: DQDUY (1/3/2022)
     */
    cloneAccountObject(id) {
      this.getDataProviderById(id);
      this.getNewCode();
    },
    /**
     * Đóng form detail
     * CreatedBy: DQDUY (1/3/2022)
     */
    distroyPopup() {
      this.editLocation = false;
      this.$emit("handleClosePopup", this.isRequest);
    },
  },
  watch: {
    /**
     * Hàm bắt sự kiện khi danh sách nhà cung cấp thay đổi
     * CreatedBy: DQDUY (3/3/2022)
     */
    accountObjectGroupListId(value) {
      this.listAccountGroupIdString = "";
      value.forEach((item) => {
        this.listAccountGroupIdString += item + ",";
      });
      this.listAccountGroupIdString = this.listAccountGroupIdString.slice(
        0,
        this.listAccountGroupIdString.length - 1
      );
    },
    /**
     * Hàm bắt sự kiện khi tab trong form Detail thay đổi
     *  CreatedBy: DQDUY (4/3/2022)
     */
    slotTab(value) {
      if (value == 1) {
        let temp = this.$refs.prefix.$el.querySelector("input");
        setTimeout(function () {
          temp.focus();
        });
      } else if (value == 2) {
        let temp = this.$refs.paymentTermId.$el.querySelector("input");
        setTimeout(function () {
          temp.focus();
        });
      } else if (value == 3) {
        let temp =
          this.$refs.accountObjectBankAccount.$el.querySelector("input");
        if (temp) {
          setTimeout(function () {
            temp.focus();
          });
        }
      } else if (value == 4) {
        let temp =
          this.$refs.accountObjectShippingAddress.$el.querySelector("input");
        if (temp) {
          setTimeout(function () {
            temp.focus();
          });
        }
      } else if (value == 5) {
        let temp = this.$refs.description;
        setTimeout(function () {
          temp.focus();
        });
      }
    },

    /*
     * Hàm bắt sự kiện khi dữ liệu đất nước thay đổi
     * CreatedBy: DQDUY(28/2/2022)
     */
    country(value) {
      this.provinceOrCityList = Location["VN"].cities.filter(function (item) {
        if (item.parent_id == value) {
          return true;
        }
        return false;
      });
      if (this.editLocation && value != "") {
        this.provinceOrCity = "";
        this.district = "";
        this.wardOrCommune = "";
      }
    },

    /*
     * Hàm bắt sự kiện khi dữ liệu thành phố thay đổi
     * CreatedBy: DQDUY(28/2/2022)
     */
    provinceOrCity(value) {
      this.districtList = Location["VN"].district.filter(function (item) {
        if (item.parent_id == value) {
          return true;
        }
        return false;
      });
      if (this.editLocation && value != "") {
        this.district = "";
        this.wardOrCommune = "";
      }
    },
    /*
     * Hàm bắt sự kiện khi quận huyện thay đổi
     * CreatedBy: DQDUY(28/2/2022)
     */
    district(value) {
      this.wardOrCommuneList = Location["VN"].wardOrCommune.filter(function (
        item
      ) {
        if (item.parent_id == value) {
          return true;
        }
        return false;
      });
      if (this.editLocation && value != "") {
        this.wardOrCommune = "";
      }
    },
    /**
     * Hàm bắt sự kiện khi địa chỉ thay đổi
     * CreatedBy: DQDUY(14/3/2022)
     */
    address(value) {
      if (this.coppyAddres == true) {
        this.accountObjectShippingAddress = [{ address: value }];
      }
    },

    /**
     * Hàm bắt sự kiện khi check vào ô giống địa chỉ nhà cung cấp
     * CreatedBy: DQDUY(14/3/2022)
     */
    coppyAddres(value) {
      if (value == true) {
        this.accountObjectShippingAddress = [{ address: this.address }];
      }
    },
  },
  created() {
    this.country = "1";
    this.countryList = Location["VN"].countries;
    if (this.formMode == Enum.FormMode.Add) {
      this.refreshData();
      this.handleBtnAdd();
      console.log(this.tempData);
      console.log(this.dataChange);
    } else if (this.formMode == Enum.FormMode.Show) {
      this.showDataProvider();
    } else if (this.formMode == Enum.FormMode.Edit) {
      this.getDataProviderById(this.focusId);
    } else if (this.formMode == Enum.FormMode.Clone) {
      this.cloneAccountObject(this.focusId);
    }
    /**
     * Thêm sự kiện cho các phìm tắt khi mở form
     *CreatedBy: DQDUY(6/3/2022)
     */
    document.addEventListener("keydown", this.handleKeyUpList);
  },
  mounted() {
    this.country = "1";
    this.countryList = Location["VN"].countries;
    this.$refs.taxCode.$el.querySelector("input").focus();
  },
  beforeDestroy() {
    /**
     * Hủy sự kiện của các phím khi đóng form
     * CreatedBy: DQDUY(6/3/2022)
     */
    document.removeEventListener("keydown", this.handleKeyUpList);
  },
};
</script>

<style scoped>
@import url("../../styles/base/popup.css");

.m-popup-footer .divide {
  margin: 32px 0 20px 0;
  border-top: 1px solid #e0e0e0;
}

.custom-padding {
  padding-left: 19.5px;
  padding-right: 19.5px;
}
.m-popup-tittle {
  display: flex;
  align-items: center;
}
.al_center {
  align-items: center;
  display: flex;
}
.m-popup-close {
  display: flex;
}
.m-popup-close .m-popup-btn {
  cursor: pointer;
  height: 24px;
  width: 24px;
}
.m-popup-close .m-popup-btn + .m-popup-btn {
  margin-left: 6px;
}
.m-popup-content {
  background-color: #fff;
  border-radius: 5px;
  animation: scale 0.5s;
}

.m-popup__header {
  display: flex;
  justify-content: space-between;
}
.m-popup__header .m-popup-tittle {
  padding: 20px 12px 20px 32px;
  font-size: 24px;
  color: #111;
  font-weight: 700;
  font-family: Notosans-Regular;
}
.m-popup__header .m-popup-close {
  padding: 12px;
}
.m-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadein 0.5s;
  z-index: 999;
}
.m-employee-view {
  background-color: #f4f5f8;
  flex: 1;
  max-height: calc(100vh - 48px);
  overflow: auto;
  position: relative;
}
.m-employee-view .m-employee-view__header {
  padding-left: 20px;
  padding-top: 15px;

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
  padding: 5px;
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
.btn-24 {
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
  text-transform: uppercase;
  font-style: italic;
  font-family: "Notosans-Regular" !important;
}

.m-text-tab {
  outline: none;
  border-radius: 3px;
  border: 1px solid #babec5;
  font-size: 13px;
  height: 191px;
  width: calc(100% - 16px);
  margin: 11px 8px;
  padding: 10px;
}

.m-text-tabhover:not(:focus) {
  outline: 1px solid #e2e2e2;
}
.m-text-tab:focus {
  border: 1px solid #2ca01c;
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

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes scale {
  from {
    transform: scale(0.7);
  }
  to {
    transform: scale(1);
  }
}
</style>