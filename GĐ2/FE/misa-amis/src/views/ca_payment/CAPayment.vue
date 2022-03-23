<template>
  <div class="m-employee-view">
    <div class="loading" v-show="isLoading">
      <LoadingIcon :isLoading="isLoading" />
    </div>
    <div class="grid__row" style="padding-bottom: 0">
      <div class="m-employee-view__header" style="height: 80px">
        <div>
          <div class="m-employee-view__tittle">Danh sách phiếu chi</div>
          <div>Tất cả danh mục</div>
        </div>
        <div class="grid__row" style="justify-content: right">
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
          <DropBox @handleMultiDelete="deleteAll" :isMultiDel="isMultiDel" />
          <div class="droptool">
            <div class="drop-box" style="width: 80px">
              <span>Lọc</span>
              <div
                class="icon-16 dropdown-black"
                :class="{ rotate: isShowFilter }"
                v-on:click="isShowFilter = !isShowFilter"
              ></div>
            </div>
            <div
              class="drop-filter"
              style="width: 500px; left: 52px"
              v-if="isShowFilter"
            >
              <div class="padding-body-filter">
                <div class="grid__row" style="padding-bottom: 10px">
                  <Combobox :label="'Lý do thu chi'" :noneThead="true" />
                </div>
                <div class="grid__row" style="padding-bottom: 10px">
                  <Combobox :label="'Trạng thái ghi sổ'" :noneThead="true" />
                </div>
                <div class="grid__row" style="padding-bottom: 2px">
                  <Combobox
                    class="w-1/3 p-r-6"
                    :label="'Thời gian'"
                    :width="'200px'"
                    :noneThead="true"
                    :datas="dataFilterDate"
                    :fields="[{ name: 'value' }]"
                    v-model="textTime"
                    :textShow="'value'"
                    :id="'id'"
                    ref="textTime"
                    @isClick="optionFieldTime"
                  />
                  <div class="m-text-field w-1/3 p-r-6">
                    <div class="m-text-field__label">
                      <div class="m-text-tittle">Từ ngày</div>
                    </div>
                    <input
                      ref="IdentityDate"
                      style="width: 100%"
                      type="date"
                      v-model="startTime"
                    />
                  </div>
                  <div class="m-text-field w-1/3 p-r-6">
                    <div class="m-text-field__label">
                      <div class="m-text-tittle">Đến ngày</div>
                    </div>
                    <input
                      ref="IdentityDate"
                      style="width: 100%"
                      type="date"
                      v-model="endTime"
                    />
                  </div>
                </div>
                <div class="m-popup-footer" style="padding: 0px">
                  <div class="divide"></div>
                  <div class="grid__row" style="margin-bottom: 10px">
                    <div class="w-1/2">
                      <Button
                        class="m-popup-footer-btn"
                        style="color: black; background: #ffffff"
                        @handleClick="refreshFilter()"
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
                        @handleClick="handleBtnFiler"
                        >Lọc</Button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 800px; display: flex">
          <div class="grid__row p-b-0">
            <div v-if="defaultFilter" style="padding-top: 10px">
              Từ đầu năm đến hiện tại
            </div>
            <div
              v-for="(item, index) in filterArray"
              :key="index"
              class="item-acc-group filter-ca"
            >
              <div>
                {{ item.name }}
              </div>
              <div
                class="mi-16 mi-close"
                @click="deleteItemFilter(index, item)"
              ></div>
            </div>
          </div>
        </div>
        <div
          class="grid__row account-tool"
          style="justify-content: right; padding: 16px 0"
        >
          <TextInput
            :hintText="'Tìm theo mã phiếu chi'"
            :iconClass="'search'"
            v-model="SearchText"
          />
          <div class="btn-24 refresh-ico" @click="handleBtnRefresh"></div>
          <a> <div class="btn-24 excel" @click="exportExcel"></div></a>
          <div class="btn-24 setting_list"></div>
        </div>
      </div>
      <Table
        :fields="fields"
        :type="'CaPayment'"
        :id="'caPaymentId'"
        :data="dataCaPayments"
        :btnText="'Xem'"
        v-model="focusId"
        @insertEmployeeIdToListId="insertIdDeleteToListId"
        @deleteEmployeeIdToListId="deleteIdDeleteToListId"
        @handleCloneBtnClick="handleCloneBtnClick"
        @handleEditButtonClick="handleEditBtnClick"
        @handleShowButtonClick="handleShowBtnClick"
        @multiDelete="multiDelete"
        @handleDelete="handleDelete"
        ref="customTable"
      ></Table>
    </div>
    <div class="m-employee-view__footer">
      <div class="left-pagination">
        <div class="total-record">
          Tổng số: <b>{{ TotalRecord }}</b> bản ghi
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
          :totalPage="TotalPage"
          @handleSelectPanigation="handleSelectPanigation"
        />
      </div>
    </div>
    <CAPaymentDetail
      @saveAndAdd="saveAndAddMode"
      v-if="showPopup"
      :dataEmployees="dataEmployees"
      :accountObjects="accountObjects"
      @handleClosePopup="handleClosePopup"
      :focusId="focusId"
      :formMode="FormMode"
      @showToast="handleShowToast"
      @reLoadData="callApiDataPaging"
    />

    <MessageBox
      v-if="showMsg"
      @handleConfirmMessage="deletePayment"
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
import CAPaymentDetail from "./CAPaymentDetail.vue";
import Resource from "../../js/capayment/resource";
import ComboboxPanigation from "../../components/base/ComboboxPanigation.vue";
import PageNumberPanigation from "../../components/base/PageNumberPanigation.vue";
import Table from "../../components/provider/CustomTable.vue";
import TextInput from "../../components/base/TextInput.vue";
import ButtonAdd from "../../components/ca_payment/ButtonAdd.vue";
import LoadingIcon from "../../components/base/LoadingIcon.vue";
import DropBox from "../../components/custom/DropBox.vue";
import Combobox from "../../components/provider/CbbProvider.vue";
import Button from "../../components/base/Button.vue";
import ToastMessage from "../../components/base/ToastMessage.vue";
import MessageBox from "../../components/base/MessageBox.vue";
import axios from "axios";
import Enum from "../../js/enum";
export default {
  components: {
    MessageBox,
    CAPaymentDetail,
    TextInput,
    LoadingIcon,
    ButtonAdd,
    DropBox,
    Combobox,
    Button,
    Table,
    ComboboxPanigation,
    PageNumberPanigation,
    ToastMessage,
  },
  data() {
    return {
      FocusInput: false,
      isShowToast: false,
      toastText: "",
      toastError: false,
      mesageBoxText: "",
      typeMsg: "",
      showMsg: false,
      showPopup: false,
      focusId: "",
      accountObjects: [],
      dataEmployees: [],
      dataCaPayments: [],
      PageNumber: 1,
      RecordNumber: 10,
      TotalRecord: null,
      TotalPage: 3,
      SearchText: "",
      isLoading: false,
      showBtnDeleteAll: true,
      isMultiDel: false,
      isShowFilter: false,
      startTime: "2022-01-01",
      endTime: this.getNewDate(),
      todayMark: this.getNewDate(),
      isFieldTime: false,
      textTime: "1",
      filterArray: [],
      defaultFilter: true,
      dataFilterDate: [
        {
          id: "1",
          value: "Đầu năm đến hiện tại",
        },
        {
          id: "2",
          value: "Sáu tháng đầu năm",
        },
        {
          id: "3",
          value: "Sáu tháng cuối năm",
        },
        {
          id: "4",
          value: "Tháng 1",
        },
        {
          id: "5",
          value: "Tháng 2",
        },
        {
          id: "6",
          value: "Quý 1",
        },
        {
          id: "7",
          value: "Hôm qua",
        },
        {
          id: "8",
          value: "Tuần trước",
        },
        {
          id: "9",
          value: "Tháng trước",
        },
        {
          id: "10",
          value: "Quý trước",
        },
        {
          id: "11",
          value: "Năm trước",
        },
        {
          id: "12",
          value: "Đầu tháng đến hiện tại",
        },
        {
          id: "13",
          value: "Đầu tuần đến hiện tại",
        },
      ],
      // các trường trong bảng
      fields: [
        {
          text: "Ngày hạch toán",
          name: "postedDate",
          type: "date",
          width: 200,
        },
        {
          text: "ngày chứng từ",
          name: "caPaymentDate",
          type: "date",
          width: 200,
        },
        {
          text: "số chứng từ",
          name: "caPaymentNo",
          width: 200,
        },
        {
          text: "diễn giải",
          name: "resion",
          width: 500,
        },
        {
          text: "số tiền",
          name: "totalAmount",
          type: "monney",
          width: 200,
        },
        {
          text: "đối tượng",
          name: "accountObjectName",
          width: 500,
        },
        {
          text: "mã đối tượng",
          name: "accountObjectCode",
          width: 200,
        },
      ],
      resource: Resource,
      timemout: null,
      FormMode: null,
      idDelete: [],
      codeDelete: null,
    };
  },
  methods: {
    /**
     * Hàm xử lý sự kiện khi bấm nút thêm mới
     * CreatedBy: DQDUY (9/3/2022)
     */
    handleBtnAdd() {
      this.showPopup = true;
      this.FormMode = Enum.FormMode.Add;
    },
    /**
     * Hàm xử lý khi bấm nút edit
     * CreatedBy: DQDUY (9/3/2022)
     */
    handleEditBtnClick() {},
    /**
     * Hàm xử lý khi bấm nút xem
     * CreatedBy: DQDUY (9/3/2022)
     */
    handleShowBtnClick() {
      this.showPopup = true;
      this.FormMode = Enum.FormMode.Show;
    },
    /**
     * Hàm xử lý khi bấm nút nhân bản
     * CreatedBy: DQDUY (9/3/2022)
     */
    handleCloneBtnClick() {
      this.showPopup = true;
      this.FormMode = Enum.FormMode.Clone;
    },

    /**
     * Hàm xử lý sự kiện cất va thêm
     * CreatedBy: DQDUY (11/3/2022)
     */
    saveAndAddMode() {
      this.handleClosePopup();
      setTimeout(() => {
        this.handleBtnAdd();
      }, 0);
    },

    /**
     * Load dữ liệu lên, phân trang, tìm kiếm
     * CreatedBy: DQDUY (8/3/2022)
     */
    callApiDataPaging() {
      let dataFilter = {
        startTime: this.convertDate(this.startTime),
        endTime: this.convertDate(this.endTime),
        searchText: this.SearchText,
        pageSize: this.RecordNumber,
        pageIndex: this.PageNumber,
      };
      this.isLoading = true;
      try {
        axios
          .post(`${Resource.AMIS_SERVICE_URL}/CaPayment/filterPage`, dataFilter)
          .then((res) => {
            this.dataCaPayments = res.data.data;
            this.TotalRecord = res.data.totalRecord;
            this.TotalPage =
              Math.floor(this.TotalRecord / this.RecordNumber) +
              (this.TotalRecord % this.RecordNumber == 0 ? 0 : 1);
            this.isLoading = false;
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm gọi api lấy dữ liệu nhà cung cấp
     * CreatedBy: DQDUY (10/3/2022)
     */
    async CallApiGetDataAccountObject() {
      axios
        .get(`${Resource.AMIS_SERVICE_URL}/AccountObject`)
        .then((res) => {
          this.accountObjects = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Hàm gọi api lấy dữ liệu nhân viên
     * CreatedBy: DQDUY (10/3/2022)
     */
    CallApiDataEmployee() {
      axios
        .get(`${Resource.AMIS_SERVICE_URL}/Employee`)
        .then((res) => {
          this.dataEmployees = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Bắt sự kiện xoá hàng loạt và nhận id từ bên CustomTable (con) truyền sang
     * CreatedBy: DQDUY (28/2/2022)
     */
    multiDelete(id) {
      this.idDelete = id;
      if (id.length >= 1) {
        this.isMultiDel = true;
      } else {
        this.isMultiDel = false;
      }
      console.log(this.idDelete);
    },
    /**
     * Hàm xử lý sự kiện khi bấm út xóa nhiều
     * CreatedBy: DQDUY (8/3/2022)
     */
    deleteAll() {
      this.mesageBoxText = Resource["VN"].Question.DeleteAll;
      this.typeMsg = "warning";
      this.showMsg = true;
    },

    /**
     * Hàm xử lý khi bấm lọc
     *CreatedBy: DQDUY (8/3/2022)
     */
    handleBtnFiler() {
      let temp = [];
      if (this.textTime) {
        this.dataFilterDate.filter((item) => {
          if (item.id == this.textTime) {
            temp.push({
              name: item.value,
              type: "textTime",
            });
          }
        });
      }
      if (!this.isFieldTime) {
        var start = this.convertToNormal(this.startTime)
        var end = this.convertToNormal(this.endTime);
        var periodTime = `${start} - ${end}`;
        temp = [];
        temp.push({
          name: periodTime,
          type: "periodTime",
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
     * Xử lý sự kiện khi bấm Huỷ ở bộ lọc
     * CreatedBy: DQDUY (8/3/2022)
     */
    refreshFilter() {
      this.isShowFilter = false;
      this.callApiDataPaging();
      this.filterArray = [];
    },
    /**
     * Hàm xóa dữ liệu lọc
     *CreatedBy: DQDUY (8/3/2022)
     */
    deleteItemFilter(index, obj) {
      if (obj.type == "deleteAll") {
        this.textTime = "1";
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
     * Hàm lấy ngày hiện tại
     * CreatedBy: DQDUY (8/3/2022)
     */
    getNewDate() {
      var result = null;
      let date = new Date();
      let day =
        date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
      let month =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : `${date.getMonth() + 1}`;
      result = `${date.getFullYear()}-${month}-${day}`;

      return result;
    },
    /**
     * Hàm chuyển dữ liệu ngày tháng về dạng YYYY-MM-DD
     *CreatedBy: DQDUY (8/3/2022)
     */
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
    /**
     * Làm mới dữ liệu
     * CreatedBy: DQDUY (8/3/2022)
     */
    handleBtnRefresh() {
      this.callApiDataPaging();
    },

    /**
     * Xuất file excel
     * CreatedBy: DQDUY (8/3/2022)
     */
    async exportExcel(event) {
      event.target.parentElement.href = `${Resource.AMIS_SERVICE_URL}/CaPayment/ExportExcel`;
      event.target.parentElement.click();
    },

    /**
     * Hàm xử lý sự kiện khi ấn xác nhận xoá ở MessageBox
     * CreatedBy: DQDUY (9/3/2022)
     */
    deletePayment() {
      this.showMsg = false;
      this.isLoading = true;
      if (this.isMultiDel) {
        axios
          .delete(
            `${Resource.AMIS_SERVICE_URL}/CaPayment/MaserDetail/DeleteMulti/${this.idDelete}`
          )
          .then(() => {
            this.toastText = Resource["VN"].ToastMessage.DeleteSuccess;
            this.toastError = false;
            this.showToastMessage();
            this.$refs.customTable.emptySelectedId();
            this.isLoading = false;
            this.callApiDataPaging();
          })
          .catch(() => {
            this.toastError = true;
            this.isLoading = false;
            this.toastText = Resource["VN"].ToastMessage.Error;
            this.$refs.customTable.emptySelectedId();
            this.showToastMessage();
          });
      } else {
        axios
          .delete(
            `${Resource.AMIS_SERVICE_URL}/CaPayment/MaserDetail/${this.idDelete}`
          )
          .then(() => {
            this.toastText = Resource["VN"].ToastMessage.DeleteSuccess;
            this.toastError = false;
            this.showToastMessage();
            this.isLoading = false;
            this.$refs.customTable.emptySelectedId();
            this.callApiDataPaging();
          })
          .catch(() => {
            this.isLoading = false;
            this.toastError = true;
            this.toastText = Resource["VN"].ToastMessage.Error;
            this.$refs.customTable.emptySelectedId();
            this.showToastMessage();
          });
      }
    },
    /**
     * Hàm xử lý khi Huỷ xác nhận ở message box
     * CreatedBy: DQDUY (9/3/2022)
     */
    cancelDelete() {
      this.showMsg = false;
    },
    /**
     * Hàm xử lý sự kiện khi bấm nút xóa
     * CreatedBy: DQDUY (8/3/2022)
     */
    handleDelete(obj) {
      this.idDelete = obj.caPaymentId;
      this.codeDelete = obj.caPaymentNo;
      this.showMsg = true;
      this.typeMsg = "warning";
      this.mesageBoxText = Resource["VN"].DeleteCaPaymentConfirm(
        this.codeDelete
      );
    },
    /**
     * Hàm thêm id vào danh sách  xóa
     * CreatedBy: DQDUY (9/3/2022)
     */
    insertIdDeleteToListId(id) {
      console.log(id);
    },
    /**
     * Hàm xóa id khỏi danh sách xóa
     * CreatedBy: DQDUY (9/3/2022)
     */
    deleteIdDeleteToListId(id) {
      console.log(id);
    },

    /**
     * Chọn số lượng bản ghi trên một trang
     * CreatedBy: DQDUY (9/3/2022)
     */
    changeRecordNumber(pageRecord) {
      this.RecordNumber = pageRecord;
      this.callApiDataPaging();
    },

    /**
     * Chuyển trang
     * CreatedBy: DQDUY (9/3/2022)
     */
    handleSelectPanigation(page) {
      this.PageNumber = page;
      this.callApiDataPaging();
    },

    /**
     * Hàm đóng popup
     * CreatedBy: DQDUY (9/3/2022)
     */
    handleClosePopup() {
      this.showPopup = false;
    },

    /**
     * lấy ngày đầu tiên trong tuàn
     * CreatedBy: DQDUY (9/3/2022)
     */
    getMonday(d) {
      d = new Date(d);
      var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1); //
      return new Date(d.setDate(diff));
    },

    /**
     * Hàm tính toán ngày tháng
     * CreatedBy: DQDUY (9/3/2022)
     */
    caculatorDate(dateString, mday, mmonth, myear) {
      var result = null;
      if (dateString) {
        let date = new Date(dateString);
        let day =
          date.getDate() - mday < 10
            ? `0${date.getDate() - mday}`
            : `${date.getDate() - mday}`;
        let month =
          date.getMonth() - mmonth + 1 < 10
            ? `0${date.getMonth() + 1 - mmonth}`
            : `${date.getMonth() + 1}` - mmonth;
        let year = `${date.getFullYear() - myear}`;
        if (month == "00") {
          month = "12";
          year -= 1;
        }
        result = `${year}-${month}-${day}`;
      }
      return result;
    },
    /**
     * Chọn các khoảng thời gian trong cbb
     * CreatedBy: DQDuy (18/3/2022)
     */
    optionFieldTime() {
      this.isFieldTime = true;
      console.log("đã chọn");
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

    /**
     * Chuyển dữ liệu ngày tháng năm về định dạng bình thường là ngày/tháng/năm
     * CreatedBy: DQDuy (17/03/2022)
     */
    convertToNormal(d) {
      var dateString = "";
      if (d == null || d == undefined) {
        dateString = "";
      } else {
        let DateOfBirth = new Date(d);
        let date =
          DateOfBirth.getDate() < 10
            ? `0${DateOfBirth.getDate()}`
            : DateOfBirth.getDate();
        let mont =
          DateOfBirth.getMonth() + 1 < 10
            ? `0${DateOfBirth.getMonth() + 1}`
            : DateOfBirth.getMonth() + 1;
        let year = DateOfBirth.getFullYear();
        dateString = `${date}/${mont}/${year}`;
        dateString = dateString != "NaN/NaN/NaN" ? dateString : "";
      }
      return dateString;
    },
  },
  watch: {
    /**
     * Hàm xử lý sự kiện khi dữ liệu tìm kiếm thay đổi
     * CreatedBy: DQDUY (9/3/2022)
     */
    SearchText() {
      if (this.timemout) {
        clearTimeout(this.timemout);
      }
      this.timemout = setTimeout(() => {
        this.callApiDataPaging();
        this.PageNumber = 1;
      }, 350);
    },

    /**
     * Hàm xử lý sự kiện khi dữ liệu lọc theo thời gian thay đổi
     * CreatedBy: DQDUY (9/3/2022)
     */
    textTime(value) {
      switch (value) {
        case "1": {
          // dau nam den hien tai
          let today = new Date();
          this.startTime = `${today.getFullYear()}-01-01`;
          this.endTime = this.getNewDate();
          break;
        }

        case "2": {
          // sáu tháng đầu năm
          let today = new Date();
          this.startTime = `${today.getFullYear()}-01-01`;
          this.endTime = `${today.getFullYear()}-05-31`;
          break;
        }
        case "3": {
          // Sáu tháng cuối năm"
          let today = new Date();
          this.startTime = `${today.getFullYear()}-06-01`;
          this.endTime = `${today.getFullYear()}-12-31`;
          break;
        }

        case "4": {
          // tháng 1
          let today = new Date();
          this.startTime = `${today.getFullYear()}-01-01`;
          this.endTime = `${today.getFullYear()}-01-31`;
          break;
        }
        case "5": {
          // tháng 2
          let today = new Date();
          this.startTime = `${today.getFullYear()}-02-01`;
          let isLeap = false;
          let year = today.getFullYear();
          if (year % 4 == 0) {
            //chia hết cho 4 là năm nhuận
            if (year % 100 == 0) {
              //nếu vừa chia hết cho 4 mà vừa chia hết cho 100 thì không phải năm nhuận
              if (year % 400 == 0)
                //chia hết cho 400 là năm nhuận
                isLeap = true;
              else isLeap = false; //không chia hết cho 400 thì không phải năm nhuận
            } //chia hết cho 4 nhưng không chia hết cho 100 là năm nhuận
            else isLeap = true;
          } else {
            isLeap = false;
          }
          if (!isLeap) {
            this.endTime = `${today.getFullYear()}-02-28`;
          } else {
            this.endTime = `${today.getFullYear()}-02-29`;
          }

          break;
        }
        case "6": {
          // quý 1
          let today = new Date();
          this.startTime = `${today.getFullYear()}-01-01`;
          this.endTime = `${today.getFullYear()}-03-31`;
          break;
        }
        case "7": {
          // hôm qua
          var tomorow = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
          this.startTime = this.convertDate(tomorow);
          this.endTime = this.convertDate(tomorow);
          break;
        }

        case "8": {
          // tuần trước
          var lastWeek = new Date(
            new Date().getTime() - 7 * 24 * 60 * 60 * 1000
          );
          this.startTime = this.convertDate(lastWeek);
          this.endTime = this.getNewDate();
          break;
        }

        case "9": {
          // tháng trước
          let today = this.getNewDate();
          this.startTime = this.caculatorDate(today, 0, 1, 0);
          this.endTime = today;
          break;
        }
        case "10": {
          // quý trước
          let today = new Date();
          let month = today.getMonth();
          switch (month) {
            case 0:
            case 1:
            case 2: {
              this.startTime = `${today.getFullYear() - 1}-10-01`;
              this.endTime = `${today.getFullYear() - 1}-12-31`;
              break;
            }
            case 3:
            case 4:
            case 5: {
              this.startTime = `${today.getFullYear()}-01-01`;
              this.endTime = `${today.getFullYear()}-03-31`;
              break;
            }
            case 6:
            case 7:
            case 8: {
              this.startTime = `${today.getFullYear()}-04-01`;
              this.endTime = `${today.getFullYear()}-06-30`;
              break;
            }
            case 9:
            case 10:
            case 11: {
              this.startTime = `${today.getFullYear()}-07-01`;
              this.endTime = `${today.getFullYear()}-09-30`;
              break;
            }
          }

          break;
        }
        case "11": {
          // năm trước
          let today = this.getNewDate();
          this.startTime = this.caculatorDate(today, 0, 0, 1);
          this.endTime = this.getNewDate();
          break;
        }
        case "12": {
          // đầu tháng đến hiện tại
          let today = new Date();
          let firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
          this.startTime = this.convertDate(firstDay);
          this.endTime = this.getNewDate();

          break;
        }

        case "13": {
          // đầu tuần đến hiện tại
          let today = new Date();
          let monday = this.getMonday(today);
          this.startTime = this.convertDate(monday);
          this.endTime = this.getNewDate();
          break;
        }
      }
    },

    filterArray(value) {
      if (value.length) {
        this.defaultFilter = false;
      } else {
        this.textTime = "1";
        this.defaultFilter = true;
      }
    },
  },
  created() {
    this.callApiDataPaging();
    this.CallApiGetDataAccountObject();
    this.CallApiDataEmployee();
  },
};
</script>
<style scoped>
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
  padding-top: 12px;
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
  background: rgba(255, 255, 255, 0.2);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 155;
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
  position: fixed;
  z-index: 9999;
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
.filter-ca {
  padding-top: 10px;
  color: #0075c0;
}
</style>