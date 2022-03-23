<template>
  <div class="m-employee-view">
    <div class="loading" v-show="isLoading">
      <LoadingIcon :isLoading="isLoading" />
    </div>
    <div class="grid__row">
      <div class="m-employee-view__header">
        <div>
          <div class="m-employee-view__tittle">Danh sách nhà cung cấp</div>
          <div>Tất cả danh mục</div>
        </div>

        <div class="grid__row" style="justify-content: right">
          <div class="mi-tour btn-24"></div>

          <ButtonAdd
            ref="btnAdd"
            :color="'#2ca01c'"
            style="border-radius: 2px"
            @handleBtnAdd="handleBtnAdd"
          ></ButtonAdd>
        </div>
      </div>
    </div>
    <div class="overview">
      <div class="w-1/3 pd-t-8 over-view overdue">
        <div style="background: #ff7f2c; height: 100%; color: ">
          <div class="dued-debit-overview p-relative">
            <div class="num">
              <p>10.000.000</p>
            </div>
            <div class="m-num-text">Nợ quá hạn</div>
          </div>
        </div>
      </div>
      <div class="w-1/3 pd-t-8 px-2 over-view total-liabilities">
        <div style="background: #b8bcc3; height: 100%">
          <div class="dued-debit-overview p-relative">
            <div class="num">
              <p>10.000.000</p>
            </div>
            <div class="m-num-text">Nợ quá hạn</div>
          </div>
        </div>
      </div>
      <div class="w-1/3 pd-t-8 over-view">
        <div style="background: #74cb2f; height: 100%">
          <div class="dued-debit-overview p-relative">
            <div class="num">
              <p>10.000.000</p>
            </div>
            <div class="m-num-text">Nợ quá hạn</div>
          </div>
        </div>
      </div>
    </div>

    <div class="m-employee-view__body">
      <div class="grid__row" style="padding: 0 16px">
        <div class="grid__row" style="padding-bottom: 0px !important">
          <DropBox
            style="margin-top: 20px"
            :isMultiDel="isMultiDel"
            @handleMultiDelete="handleMultiDelete"
          />
          <div class="droptool" style="margin-top: 20px">
            <div
              class="drop-box"
              style="width: 80px"
              @click="isShowFilter = !isShowFilter"
            >
              <span>Lọc</span>
              <div
                class="icon-16 dropdown-black"
                :class="{ rotate: isShowFilter }"
              ></div>
            </div>
            <div class="drop-filter" v-if="isShowFilter">
              <div class="padding-body-filter">
                <div class="grid__row" style="padding-bottom: 2px">
                  <div class="w-1/2 p-r-6">
                    <div class="grid__row">
                      <Combobox
                        :label="'Loại'"
                        :placeholder="'Tất cả'"
                        :datas="providerType"
                        :id="'value'"
                        :textShow="'value'"
                        :fields="[{ name: 'value' }]"
                        :noneThead="true"
                      />
                    </div>
                    <div class="grid__row">
                      <Combobox
                        :label="'Tình trạng công nợ'"
                        :placeholder="'Tất cả'"
                        :datas="debitStatus"
                        :id="'value'"
                        :noneThead="true"
                        :textShow="'value'"
                        :fields="[{ name: 'value' }]"
                      />
                    </div>
                  </div>
                  <div class="w-1/2">
                    <div class="grid__row">
                      <Combobox
                        :label="'Nhóm'"
                        :datas="providerGroupData"
                        :fields="fieldAccObjGroup"
                        :width="'400px'"
                        :id="'accountObjectGroupCode'"
                        :textShow="'accountObjectGroupCode'"
                        v-model="mAccountObjectGroupCode"
                        :fieldSearch="'accountObjectGroupName'"
                      />
                    </div>
                    <div class="grid__row">
                      <Combobox
                        :label="'Trạng thái'"
                        :placeholder="'Tất cả'"
                        :datas="statusInFilter"
                        :id="'value'"
                        :noneThead="true"
                        :textShow="'value'"
                        :fields="[{ name: 'value' }]"
                      />
                    </div>
                  </div>
                </div>
                <div class="grid__row" style="padding-bottom: 2px">
                  <Combobox
                    class="w-1/3 p-r-6"
                    :label="'Tỉnh/TP'"
                    :placeholder="'Tỉnh/Thành Phố'"
                    :noneThead="true"
                    :datas="provinceOrCityList"
                    :fields="[{ name: 'location_name' }]"
                    :id="'location_id'"
                    :textShow="'location_name'"
                    v-model="mProvinceOrCity"
                  />
                  <Combobox
                    class="w-1/3 p-r-6"
                    :noneThead="true"
                    :label="'Quận/Huyện'"
                    :placeholder="'Quận/Huyện'"
                    :datas="districtList"
                    :fields="[{ name: 'location_name' }]"
                    :id="'location_id'"
                    :textShow="'location_name'"
                    v-model="mDistrict"
                  />
                  <Combobox
                    class="w-1/3"
                    :noneThead="true"
                    :label="'Xã/Phường'"
                    :placeholder="'Xã/Phường'"
                    :fields="[{ name: 'location_name' }]"
                    :datas="wardOrCommuneList"
                    :id="'location_id'"
                    :textShow="'location_name'"
                    v-model="mWardOrCommune"
                  />
                </div>

                <div class="m-popup-footer" style="padding: 0px">
                  <div class="divide"></div>
                  <div class="grid__row" style="margin-bottom: 10px">
                    <div class="w-1/2">
                      <Button
                        class="m-popup-footer-btn"
                        style="color: black; background: #ffffff"
                        @handleClick="cancelFilter"
                        >Hủy</Button
                      >
                    </div>
                    <div>
                      <Button
                        class="m-popup-footer-btn"
                        style="
                          color: #fff;
                          border: none;
                          background: #2ca01c;
                          font-weight: 600;
                        "
                        @handleClick="handleFilter"
                        >Lọc</Button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style="width: 700px; justify-content: flex-start; display: flex">
            <div class="grid__row p-b-0">
              <div
                class="item-acc-group filter-provider"
                v-for="(item, index) in filterArray"
                :key="index"
              >
                <div>{{ item.name }}</div>
                <div
                  class="mi-16 mi-close"
                  @click="deleteItemFilter(index, item)"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="grid__row account-tool"
          style="justify-content: right; padding: 16px 0"
        >
          <TextInput
            :hintText="'Tìm theo mã, tên nhà cung cấp'"
            :iconClass="'search'"
            v-model="searchText"
          />

          <div class="btn-24 refresh-ico" @click="refreshData"></div>
          <a> <div class="btn-24 excel" @click="exportToExcel"></div></a>
          <div class="btn-24 setting_list"></div>
        </div>
      </div>

      <!--Danh sách-->
      <Table
        :id="'accountObjectId'"
        :fields="fields"
        :data="providerData"
        :btnText="'Trả tiền'"
        :type="'AccountObject'"
        @handleDelete="handleDelete"
        @multiDelete="multiDelete"
        @handleShowButtonClick="handleShowBtnClick"
        @handleCloneBtnClick="handleCloneBtnClick"
        @handleEditButtonClick="handleEditBtnClick"
        v-model="focusId"
        ref="customTable"
      ></Table>
    </div>

    <div class="m-employee-view__footer">
      <div class="left-pagination">
        <div class="total-record">
          Tổng số: <b>{{ totalRecord }}</b> bản ghi
        </div>
      </div>
      <div class="right-pagination">
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
        <PageNumberPanigation
          :totalPage="totalPage"
          @handleSelectPanigation="handleSelectPanigation"
        />
      </div>
    </div>
    <ProviderDetail
      v-if="showPopup"
      @handleClosePopup="handleClosePopup"
      :dataEmployees="dataEmployees"
      :providerGroupData="providerGroupData"
      :dataPaymentTerms="dataPaymentTerms"
      @saveAndAdd="saveAndAddMode"
      @getDataProvider="getDataProvider"
      :formMode="formMode"
      @showToast="handleShowToast"
      :focusId="focusId"
      @reLoadData="callApiDataPaging"
    />

    <MessageBox
      v-if="showMsg"
      @handleConfirmMessage="deleteProvider"
      @handleCanclemMessage="cancelDelete"
      :type="typeMsg"
      :width="'444px'"
      :text="mesageBoxText"
    />

    <ToastMessage
      :isShowToast="isShowToast"
      :toastText="toastText"
      :toastError="toastError"
    />
  </div>
</template>

<script>
import LoadingIcon from "../../components/base/LoadingIcon.vue";
import ButtonAdd from "../../components/provider/ButtonAdd.vue";
import Combobox from "../../components/provider/CbbProvider.vue";
import Table from "../../components/provider/CustomTable.vue";
import TextInput from "../../components/base/TextInput.vue";
import Button from "../../components/base/Button.vue";
import DropBox from "../../components/custom/DropBox.vue";
import ComboboxPanigation from "../../components/base/ComboboxPanigation.vue";
import PageNumberPanigation from "../../components/base/PageNumberPanigation.vue";
import MessageBox from "../../components/base/MessageBox.vue";
import ToastMessage from "../../components/base/ToastMessage.vue";
import ProviderDetail from "./ProviderDetail.vue";
import resource from "../../js/provider/resource";
import Location from "../../js/location";
import axios from "axios";
import Enum from "../../js/enum";
export default {
  data() {
    return {
      formMode: 0,
      isMultiDel: false,
      showMsg: false,
      mesageBoxText: "",
      typeMsg: "",
      isLoading: false,
      isShowFilter: false,
      PRO_SERVICE_URL: resource.AMIS_SERVICE_URL,

      /**id đc chọn */
      focusId: "",
      /* Các trường trong bảng */
      fields: [
        {
          text: "MÃ Nhà Cung cấp",
          name: "accountObjectCode",
          width: 200,
        },
        {
          text: "TÊN NHÀ CUNG CẤP",
          name: "accountObjectName",
          width: 400,
        },
        {
          text: "ĐỊA CHỈ",
          name: "address",
          width: 400,
        },
        {
          text: "MÃ SỐ THUẾ",
          name: "taxCode",
          width: 200,
        },
        {
          text: "Số điện thoại",
          name: "phone",
          width: 200,
        },
        {
          text: "CMTND",
          name: "phone",
          width: 200,
        },
        {
          text: "Nhóm Nhà cung cấp",
          name: "accountObjectGroupListId",
          width: 200,
        },
      ],
      totalRecord: 0,
      showPopup: false,
      providerGroupData: [],
      dataEmployees: [],
      providerData: [],
      dataPaymentTerms: [],

      providerIdDel: [],
      listProviderObjectDelete: [],
      providerCodeDel: null,
      providerNameDel: "",
      isShowToast: false,
      toastText: "",
      toastError: false,
      // combobox nhóm nhà cc
      fieldAccObjGroup: [
        {
          name: "accountObjectGroupCode",
          text: "Mã nhóm KH,NCC",
        },
        {
          name: "accountObjectGroupName",
          text: "Tên nhóm KH,NCC",
        },
      ],
      // loại nhà cung cấp
      providerType: [
        {
          value: "Tất cả",
        },
        {
          value: "Tổ chức",
        },
        {
          value: "Cá nhân",
        },
      ],
      // tình trạng công nợ
      debitStatus: [
        {
          value: "Tất cả",
        },
        {
          value: "Hết nợ",
        },
        {
          value: "Còn nợ",
        },
      ],
      statusInFilter: [
        {
          value: "Tất cả",
        },
        {
          value: "Theo dõi",
        },
        {
          value: "Ngừng theo dõi",
        },
      ],
      provinceOrCityList: [],
      districtList: [],
      wardOrCommuneList: [],

      // dữ liệu filter
      mAccountObjectGroupCode: "",
      mProvinceOrCity: null,
      mDistrict: null,
      mWardOrCommune: null,
      filterArray: [],
      searchText: "",
      // Phân trang:
      PageNumber: 1,
      RecordNumber: 10,
      totalPage: 3,
      timemout: null,
    };
  },
  components: {
    LoadingIcon,
    Button,
    ButtonAdd,
    TextInput,
    Combobox,
    DropBox,
    Table,
    ComboboxPanigation,
    PageNumberPanigation,
    ProviderDetail,
    MessageBox,
    ToastMessage,
  },
  methods: {
    /**
     * Xử lý sự kiện khi đóng form detail
     * CreatedBy: DQDUY(28/2/2022)
     */
    handleClosePopup(isRequest) {
      this.showPopup = false;
      if (isRequest) {
        this.callApiDataPaging();
      }
    },
    /**
     * Xử lý sự kiện button thêm mới
     * CreatedBy: DQDUY(28/2/2022)
     */
    handleBtnAdd() {
      this.showPopup = true;
      this.formMode = Enum.FormMode.Add;
    },
    /**
     * Lấy toàn bộ dữ liệu nhà cung cấp
     * CreatedBy: DQDUY(28/2/2022)
     */
    getDataProvider() {
      axios
        .get(`${this.PRO_SERVICE_URL}/AccountObject`)
        .then((res) => {
          this.providerData = res.data.data;
          console.log("Type of provider data", typeof this.providerData);
          console.log(this.providerData);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    /**
     * Api filter
     * CreatedBy: DQDUY(28/2/2022)
     */
    callApiDataPaging() {
      this.isLoading = true;
      let ListItemFilter = [
        "mAccountObjectGroupCode",
        "mProvinceOrCity",
        "mDistrict",
        "mWardOrCommune",
      ];
      ListItemFilter.forEach((item) => {
        if (this[item] == null) {
          this[item] = "";
        }
      });
      let filter = {
        m_AccountObjectGroupCode: this.mAccountObjectGroupCode,
        m_ProvinceOrCity: this.mProvinceOrCity,
        m_District: this.mDistrict,
        m_WardOrCommune: this.mWardOrCommune,
      };
      let dataFilter = {
        filter: filter,
        searchText: this.searchText,
        pageSize: this.RecordNumber,
        pageIndex: this.PageNumber,
      };
      axios
        .post(`${this.PRO_SERVICE_URL}/AccountObject/Filterr`, dataFilter)
        .then((res) => {
          this.providerData = res.data.data;
          this.totalRecord = res.data.totalRecord;
          this.totalPage = res.data.totalPage;
          this.isLoading = false;
          console.log("Type of provider data", typeof this.providerData);
          console.log(this.providerData);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /**
     * Lấy dữ liệu nhóm nhà cung cấp
     * CreatedBy: DQDUY(28/2/2022)
     */
    getDataProviderGroup() {
      axios
        .get(`${this.PRO_SERVICE_URL}/AccountObjectGroup`)
        .then((res) => {
          this.providerGroupData = res.data.data;
          console.log(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    /**
     * Lấy dữ liệu điều khoản thanh toán
     * CreatedBy: DQDUY(28/2/2022)
     */
    getDataPaymentTerm() {
      axios
        .get(`${this.PRO_SERVICE_URL}/PaymentTerm`)
        .then((res) => {
          this.dataPaymentTerms = res.data.data;
          console.log(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    /**
     * Lấy dữ liệu nhân viên
     * CreatedBy: DQDUY(28/2/2022)
     */
    getDataEmployee() {
      axios
        .get(`${this.PRO_SERVICE_URL}/Employee`)
        .then((res) => {
          this.dataEmployees = res.data.data;
          console.log(res.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    /**
     * Thay đổi số lượng bản ghi trên một trang
     * CreatedBy: DQDUY(28/2/2022)
     */
    changeRecordNumber(pageRecord) {
      this.RecordNumber = pageRecord;
      this.callApiDataPaging();
    },

    /**
     * Chuyển trang
     * CreatedBy: DQDUY(28/2/2022)
     */
    handleSelectPanigation(page) {
      this.PageNumber = page;
      this.callApiDataPaging();
    },

    handleDelete(provider) {
      this.providerIdDel = provider.accountObjectId;
      this.providerCodeDel = provider.accountObjectCode;
      this.providerNameDel = provider.accountObjectName;
      this.mesageBoxText = resource["VN"].DeleteAccountObjecConfirm(
        this.providerCodeDel
      );
      this.typeMsg = "warning";
      this.showMsg = true;
    },

    /**
     * Xoá bản ghi nhà cung cấp
     * CreatedBy: DQDUY (28/2/2022)
     */
    deleteProvider() {
      this.showMsg = false;
      this.isLoading = true;

      if (this.isMultiDel) {
        axios
          .delete(
            `${this.PRO_SERVICE_URL}/AccountObject/DeleteMulti/${this.providerIdDel}`
          )
          .then(() => {
            this.toastText = resource.VN.ToastMessage.DeleteSuccess;
            this.toastError = false;
            this.showToastMessage();
            this.providerIdDel = null;
            this.providerCodeDel = null;
            this.$refs.customTable.emptySelectedId();
            this.isLoading = false;
            this.getDataProvider();
          
          })
          .catch((error) => {
            console.error(error);
            this.providerIdDel = null;
            this.toastError = true;
            this.isLoading = false;
            this.toastText = resource.VN.ToastMessage.Error;
            this.$refs.customTable.emptySelectedId();
            this.showToastMessage();
           
          });
      } else {
        axios
          .delete(
            `${this.PRO_SERVICE_URL}/AccountObject/${this.providerIdDel}`
          )
          .then(() => {
            this.toastText = resource.VN.ToastMessage.DeleteSuccess;
            this.toastError = false;
            this.showToastMessage();
            this.providerIdDel = null;
            this.providerCodeDel = null;
            this.isLoading = false;
            this.getDataProvider();
            this.$refs.customTable.emptySelectedId();
           
          })
          .catch((error) => {
            this.providerIdDel = null;
            this.typeMsg = "error";
            this.showMsg = true;
            this.mesageBoxText = resource["VN"].DeleteError(
              this.providerNameDel
            );
            this.isLoading = false;
          
            this.$refs.customTable.emptySelectedId();
            console.error(error);
          });
      }
      this.isMultiDel = false;
      
    },
    /**
     * Hàm xử lý sự kiện khi bấm cất và thêm
     * CreatedBy: DQDUY (5/3/2022)
     */
    saveAndAddMode() {
      this.handleClosePopup();
       setTimeout(() => {
          this.handleBtnAdd();
        }, 0);
    },
    /**
     * Không đồng ý xoá
     * CreatedBy: DQDUY (28/2/2022)
     */
    cancelDelete() {
      this.showMsg = false;
      this.providerIdDel = null;
      this.isMultiDel = false;
    },
    /**
     * Bắt sự kiện xoá hàng loạt và nhận id từ bên CustomTable (con) truyền sang
     * CreatedBy: DQDUY (28/2/2022)
     */
    multiDelete(id) {
      this.providerIdDel = id;
      if (id.length >= 1) {
        this.isMultiDel = true;
      } else {
        this.isMultiDel = false;
      }
      console.log("Type of providerId", typeof this.providerIdDel);
      console.log("Value", this.providerIdDel);
    },

    /**
     * Xử lý xoá hàng loạt: hiện popup xác nhận
     * CreatedBy: DQDUY (28/2/2022)
     */
    handleMultiDelete() {
      this.mesageBoxText = resource["VN"].Question.DeleteAll;
      this.typeMsg = "warning";
      this.showMsg = true;
    },

    /**
     * Hàm xử lý sự kiện khi bấm xem
     * CreatedBy: DQDuy (3/3/2022)
     */
    handleShowBtnClick(id) {
      this.focusId = id;
      this.formMode = Enum.FormMode.Show;
      this.showPopup = true;
    },

    /**
     * Hàm xử lý sự kiện khi bấm sửa
     * CreatedBy: DQDuy (3/3/2022)
     */
    handleEditBtnClick(id) {
      this.focusId = id;
      this.formMode = Enum.FormMode.Edit;
      this.showPopup = true;
    },

    /**
     * Hàm xử lý khi chọn chức năng nhân bản
     * CreatedBy: DQDuy (7/3/2022)
     */
    handleCloneBtnClick(){
       this.showPopup = true;
      this.formMode = Enum.FormMode.Clone;
    },
    /**
     * Lọc dữ liệu
     * CreatedBy: DQDUY (4/3/2022)
     */
    handleFilter() {
      this.isLoading = true;
      let temp = [];
      console.log(temp);
      if (this.mAccountObjectGroupCode) {
        temp.push({
          id: this.mAccountObjectGroupCode,
          name: this.mAccountObjectGroupCode,
        });
      }
      if (this.mProvinceOrCity) {
        this.provinceOrCityList.filter((item) => {
          if (item.location_id == this.mProvinceOrCity) {
            temp.push({
              name: item.location_name,
              type: "mProvinceOrCity",
            });
          }
        });
      }
      if (this.mDistrict) {
        this.districtList.filter((item) => {
          if (item.location_id == this.mDistrict) {
            temp.push({
              name: item.location_name,
              type: "mDistrict",
            });
          }
        });
      }
      if (this.mWardOrCommune) {
        this.wardOrCommuneList.filter((item) => {
          if (item.location_id == this.mWardOrCommune) {
            temp.push({
              name: item.location_name,
              type: "mWardOrCommune",
            });
          }
        });
      }
      this.filterArray = temp;
      if (this.filterArray != []) {
        this.filterArray.push({
          name: "Xóa tất cả",
          type: "deleteAll",
        });
      }
      this.isShowFilter = false;
      this.callApiDataPaging();
    },
    /**
     * Huỷ/ ngưng lọc dữ liệu
     * CreatedBy: DQDUY (4/3/2022)
     */
    cancelFilter() {
      this.mAccountObjectGroupCode = null;
      this.mProvinceOrCity = null;
      this.mDistrict = null;
      this.mWardOrCommune = null;
      this.filterArray = [];
      this.isShowFilter = false;
      this.callApiDataPaging();
    },

    /**
     * Xoá dữ liệu lọc
     * CreatedBy: DQDUY (4/3/2022)
     */
    deleteItemFilter(index, obj) {
      if (obj.type == "deleteAll") {
        this.mAccountObjectGroupCode = null;
        this.mProvinceOrCity = null;
        this.mDistrict = null;
        this.mWardOrCommune = null;
        this.filterArray = [];
      } else {
        this[obj.type] = null;
        this.filterArray.splice(index, 1);
        if (this.filterArray.length == 1) {
          this.filterArray = [];
        }
      }
      this.callApiDataPaging();
    },

    /**
     * Load lại dữ liệu
     * CreatedBy: DQDUY (4/3/2022)
     */
    refreshData() {
      this.callApiDataPaging();
    },

    /**
     * Xuất dữ liệu ra file excel
     * CreatedBy: DQDUY (4/3/2022)
     */
    exportToExcel(event) {
      event.target.parentElement.href = `${this.PRO_SERVICE_URL}/AccountObject/ExportExcel`;
      event.target.parentElement.click();
    },
    /**
     * Hàm thực hiện khi ProviderDetail gọi sang
     * CreatedBy: DQDuy (3/3/2022)
     */
    handleShowToast(toastText, toastError) {
      this.toastText = toastText;
      this.toastError = toastError;
      this.showToastMessage();
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
  },

  watch: {
    /**
     * Hàm bắt sự kiện khi dữ liệu tỉnh thành phố thay đổi
     * CreatedBy: DQDUY (1/3/2022)
     */
    mProvinceOrCity(value) {
      this.districtList = Location["VN"].district.filter(function (item) {
        if (item.parent_id == value) {
          return true;
        }
        return false;
      });
      this.mDistrict = null;
      this.mWardOrCommune = null;
    },
    /**
     * Hàm bắt sự kiện khi dữ liệu quận huyện thay đổi
     * CreatedBy: DQDUY (1/3/2022)
     */
    mDistrict(value) {
      this.wardOrCommuneList = Location["VN"].wardOrCommune.filter(function (
        item
      ) {
        if (item.parent_id == value) {
          return true;
        }
        return false;
      });
      this.mWardOrCommune = null;
    },

    /**
     * Bắt sự kiện khi từ khoá tìm đc đc thay đổi
     * CreatedBy: DQDUY (3/3/2022)
     */
    searchText() {
      if (this.timemout) {
        clearTimeout(this.timemout);
      }
      this.timemout = setTimeout(() => {
        this.callApiDataPaging();
        this.PageNumber = 1;
      }, 350);
    },
  },
  created() {
    this.isLoading = true;
    this.callApiDataPaging();
    this.getDataEmployee();
    this.getDataProviderGroup();
    this.getDataPaymentTerm();
    this.provinceOrCityList = Location["VN"].cities;
  },
};
</script>

<style scoped>
@import url("../../styles/components/toast/toast.css");

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
  width: 100%;
}
.m-employee-view .m-employee-view__header .m-employee-view__tittle {
  color: #111;
  font-family: Notosans-Regular;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
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
.w-1\/3 {
  width: 33.33%;
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
.pd-t-8 {
  padding-top: 8px;
}
.px-2 {
  margin-left: 0.5rem !important;
  margin-right: 0.5rem !important;
}
.pt-3 {
  padding-top: 0.75rem !important;
}
.overview {
  height: 72px;
  margin-left: 20px;
  margin-right: 30px;
  display: flex;
  color: #ffffff;
}

.over-view {
  box-sizing: border-box;
  height: 100%;
}
.p-relative {
  position: relative;
}
.dued-debit-overview {
  padding: 6px 10px;
  height: 100%;
}
.overview .num {
  font-size: 24px;
  height: 33.75px;
  display: flex;
  align-items: center;
}
.overview .m-num-text {
  font-size: 14px;
  font-weight: 500;
  position: absolute;
  display: flex;
  align-items: center;
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
  margin-left: 6px;
}
.m-popup-footer-btn .btn_add {
  background: #2ca01c;
  color: #fff;
}
.m-input-error {
  border: 1px solid red !important;
}
.loading {
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 155;
}

.loading__item {
  position: absolute;
  top: 50%;
  left: 50%;
  /* right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center; */
}
.loading__icon {
  background: transparent url("../../assets/loading.svg") no-repeat center;
  width: 50px;
  height: 50px;
  transition: all 0.3s ease;
  animation: rotate 1s ease infinite;
}
.overdue:hover {
  padding-top: 0;
  border-bottom: 5px solid red;
}
.total-liabilities:hover {
  padding-top: 0;
  border-bottom: 5px solid red;
}
.rotate {
  transform: rotateX(3.142rad);
}
.droptool {
  position: relative;
}
.droptool .drop-box {
  width: 105px;
  margin: 0 12px;
}
.droptool .drop-filter {
  height: 294px;
  width: 540px;
  left: 24px;
  top: 291px;
  position: fixed;
  z-index: 99999;
  background: #fff;
  padding: 2px 1px;
  border-radius: 2px;
  border: 1px solid #babec5;
}
.padding-body-filter {
  padding: 16px 20px 20px;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}
.account-tool {
  display: flex;
  margin-left: 730px;
  margin-top: -50px;
}
.mi-16 {
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  margin-left: 4px;
  cursor: pointer;
}
.filter-provider{
  padding-top:30px;
  color: #0075c0;
}
</style>