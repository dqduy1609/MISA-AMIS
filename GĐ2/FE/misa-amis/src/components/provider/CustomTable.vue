<template>
  <div class="m-content-grid">
    <table class="m-table">
      <thead>
        <tr style="height: 35px !important">
          <th style="min-width: 40px">
            
              <input
                type="checkbox"
                class="m-checkbox"
                v-model="isSelectAllId"
                @click="selectAllId"
              />
         
          </th>
          <th
            v-for="(field, index) in fields"
            :key="index"
          
            :style="{minWidth:field.width+'px'}"
           
          >
            <div>
              {{ field.text }}
            </div>
          </th>

          <th class="m-function">Chức năng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(originalData, index) in data" :key="index">
          <td style="width: 40px">
            <div>
              <input
                type="checkbox"
                class="m-checkbox"
                v-model="selectedId"
                :value="originalData[id]"
                @click="selectId(originalData[id])"
              />
            </div>
          </td>
          <td v-for="(field, index) in fields" :key="index">
            <p v-if="field.type === 'date'" style="text-align: center">
              {{ originalData[field.name] | DateFilter }}
            </p>
            <p v-else-if="field.type === 'gender'">
              {{ originalData[field.name] | GenderFilter }}
            </p>
            <p v-else-if="field.type === 'monney'" style="text-align: right">
              {{ originalData[field.name] | formatMoney }}
            </p>
            <p v-else>{{ originalData[field.name] }}</p>
          </td>
          <td class="m-function">
            <div class="flex-center">
              <span ref="click" class="m-btn-edit" @click="handleShowButtonClick(originalData[id])">{{ btnText }}</span>
              <DropdownOption
                :parent="type"
                @delete="handleDelete(originalData)"
                @show="handleShowButtonClick(originalData[id])"
                @edit="handleEditButtonClick(originalData[id])"
                @clone="handleCloneBtnClick(originalData[id])"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Resource from "../../Resource";
import DropdownOption from "../custom/DropdownOption.vue";
export default {
  components: {
    DropdownOption,
  },
  data() {
    return {
      checkAll: false,
      isSelectAllId: false,
      selectedId: [],
    };
  },
  props: {
    fields: Array,
    data: Array,
    btnText: String,
    id: String,
    type: String,
  },

  methods: {

    /**
     * Hàm xử lý khi chọn chức năng nhân bản
     * CreatedBy: DQDUY(7/3/2022)
     */
    handleCloneBtnClick(id){
       this.updateValue(id);
      this.$emit("handleCloneBtnClick", id);
    },
    /**
     * Gọi sự kiện handleDelete từ Customtable (con) ra ProviderList (cha)
     * CreatedBy: DQDUY(28/2/2022)
     */
    handleDelete(originalData) {
      this.$emit("handleDelete", originalData);
    },

    /**
     * Thực hiện lấy toàn bộ Id ô checkbox
     * CreatedBy: DQDUY(28/2/2022)
     */
    selectAllId() {
      try {
        if (!this.isSelectAllId) {
          for (let i in this.data) {
            this.selectedId.push(this.data[i][this.id]);
          }
        } else {
          this.selectedId = [];
        }
        this.$emit("multiDelete", this.selectedId);
      } catch (error) {
        console.log(error);
      }
    },
    emptySelectedId(){
      this.selectedId = [];
      console.log(typeof this.selectedId);
      console.log(this.selectedId);
    },
    /**
     * Thực hiện lấy từng giá trị Id
     * CreatedBy: DQDuy (28/2/2022)
     */
    selectId(id) {
      try {
        // kiểm tra xem Id đã tồn tại trong mảng selectedId hay chưa
        if (!this.selectedId.includes(id)) {
          
          this.selectedId.push(id);
        } else {
          // nếu Id đã tồn tại trong mảng selectedId thì sẽ xoá Id đó khỏi mảng - tức là khi 2 lần vào ô checkbox
          this.selectedId.forEach((item, index) => {
            if (id == item) {
              this.selectedId.splice(index, 1);
            }
          });
        }
        this.$emit("multiDelete", this.selectedId);
      } catch (error) {
        console.log(error);
      }
      console.log("type of selectedId", typeof this.selectedId);
    },

    handleEditButtonClick(id){
       this.updateValue(id);
      this.$emit("handleEditButtonClick", id);
    },

    handleShowButtonClick(id) {
      this.updateValue(id);
      this.$emit("handleShowButtonClick", id);
    },

    updateValue(value) {
      this.$emit("input", value);
      console.log(value);
    },
  },
  filters: {
    /**
     * format dữ liệu dạng tiền
     * CreatedBy: DQDUY (7/3/2022)
     */
    formatMoney: function (value) {
      //  var numeral = require("numeral");
      if (value) {
        return Number(value)
          .toFixed(0)
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

        // return numeral(monney).format("0,0");
      }
      return "";
    },
    /**
     * format dữ liệu dạng giới tính
     * CreatedBy: DQDUY (7/3/2022)
     */
    GenderFilter(gender) {
      let result = "";
      switch (gender) {
        case "0":
          result = Resource["VN"].Gender.Male;
          break;
        case "1":
          result = Resource["VN"].Gender.Female;
          break;
        case "2":
          result = Resource["VN"].Gender.Other;
          break;
      }
      return result;
    },
      /**
     * format dữ liệu dạng ngày
     * CreatedBy: DQDUY (7/3/2022)
     */
    DateFilter(d) {
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
};
</script>

<style scope>

.m-content-grid {
  background-color: #fff;
  overflow: auto;
  scrollbar-width: thin;
  max-height: 300px;
  max-width: 1130px;
}
table.m-table {
  width: 100%;
  border-spacing: unset;
  color: #111;
  border: unset;
}
.m-content-grid::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: #bbbbbb;
}

.m-content-grid::-webkit-scrollbar-thumb {
  background: #c7c7c7;
}

table.m-table tr th,
table.m-table tr td {
  padding: 0 10px;
}

table.m-table tr input[type="checkbox"] {
  display: flex;
  align-items: center;
  justify-content: center;
  border-spacing: 0;
  box-sizing: border-box;
}

table.m-table tr th:last-child,
table.m-table tr td:last-child {
  border-left: 1px solid #c7c7c7;
  border-right: none;
  box-sizing: border-box;
}

/* TABLE-HEAD */

table.m-table thead tr {
  height: 34px;
  min-height: 34px;
  position: sticky;
  top: 0;
  z-index:5
}

table.m-table thead tr th {
 position: sticky;
  top: 0;
  vertical-align: middle;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background-color: #eceef1 !important;
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px solid #c7c7c7;
 
}



/* TABLE-BODY */


table.m-table tbody tr td {
  border-bottom: 1px solid #c7c7c7;
  border-right: 1px solid #c7c7c7;
}

table.m-table tbody tr:hover {
  background-color: #f3f8f8 !important;
}

/* Position sticky */


/* table.m-table tr td:last-child,
table.m-table tr th:last-child {
  position: sticky;
  background-color: #fff;
  right: 0;
  box-sizing: border-box;
  z-index:1;
} */

table.m-table tbody tr:hover td:last-child,
table.m-table tbody tr:hover td:first-child {
  background-color: #f3f8f8 !important;
}

table.m-table th:nth-child(11),
table.m-table td:nth-child(11) {
  border-right: unset;
}

/* DROPDOWN-BTN */
table.m-table .m-utility-dropdown {
  display: flex;
  align-items: center;
  justify-content: center;
}

.m-utility-dropdown .dropdown-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  width: 26px;
  cursor: pointer;
  border: unset;
  background-color: unset;
}

.m-utility-dropdown .dropdown-btn:focus {
  outline: 1px solid #0075c0;
}

.m-utility-dropdown .m-dropdown-text {
  padding: 6px 0 6px 16px !important;
  color: #0075c0;
  font-weight: 600;
  cursor: pointer;
}
.m-function{
  z-index:2;
  min-width:150px
}
/* .m-function{
  position:sticky;
  right:0;
  z-index:6;
  background-color: #fff;
} */
</style>