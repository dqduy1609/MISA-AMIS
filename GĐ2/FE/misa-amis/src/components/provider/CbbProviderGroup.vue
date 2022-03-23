<template>
  <div class="m-combobox-group">
    <div class="m-combobox__label">
      <div class="m-text-tittle">{{ label }}</div>
      <div v-if="required" class="m-combobox-required">&nbsp;*</div>
    </div>
    <div class="m-combobox__body">
      <div class="m-combobox-input">
        <div
          v-for="(item, index) in listId"
          :key="index"
          class="item-acc-group item-provider"
        >
          <div>
            {{ item }}
          </div>
          <div class="mi-16 mi-close" @click="deleteItem(index)"></div>
        </div>
        <input
          ref="input"
          v-model="textSearch"
          @input="clickout"
          type="text"
          :disabled="disable"
        />
      </div>

      <div class="btn-dropdown" style="right: 33px" v-if="icon">
        <div class="btn-dropdown-icon plus-success"></div>
      </div>
      <div class="btn-dropdown" @click="dropdown()" v-if="!disable">
        <div
          class="btn-dropdown-icon arrow-cb"
          :class="{ rotate: isShow }"
        ></div>
      </div>
      <div v-show="isShow" class="m-combobox__menu">
        <div class="m-table">
          <table :style="{ width: width }">
            <thead v-if="haveThead">
              <tr style="height: 35px !important">
                <th v-for="(field, index) in fields" :key="index">
                  {{ field.text }}
                </th>
                <th style="width: 40px; height: 32px"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(data, index) in originalData"
                :key="index"
                @click="updateValue(data[id])"
              >
                <td
                  v-for="(field, index) in fields"
                  :key="index"
                  style="height: 32px !important"
                >
                  {{ data[field.key] }}
                </td>
                <td style="height: 32px !important">
                  <div
                    class="btn-dropdown-icon mi-16 mi-select"
                    v-if="checkItem(data[id])"
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      textSearch: "",
      originalData: [],
      timeout: null,
      listId: [],
     
    };
  },
  props: {
    departments: Array,
    label: String,
    required: Boolean,
    value: Array,
    checkInput: Boolean,
    errorText: String,
    fields: Array,
    datas: Array,
    id: String,
    textShow: String,
    haveThead: Boolean,
    width: String,
    icon: Boolean,
    disable: {
      default: false,
      type: Boolean,
    },
    fieldSearch:String
  },

  watch: {
    value() {
      this.originalData = this.datas;
      if (this.value) {
        this.listId = this.value;
        console.log(1);
      } else {
        this.listId = null;
      }
      console.log(this.listId);
      console.log(this.value);
    },

    /**
     * Tìm kiếm theo từ khoá
     * CreatedBy: DQDUY (10/3/2022)
     */
    textSearch: function (val) {
      let me = this;
      let check = false;
      me.datas.forEach((data) => {
        if (val == data[this.textShow] || val == data[this.fieldSearch]) {
          check = true;
        }
      });
      if (check == false) {
        // if(val == ""){
        //  me.updateValue("");
      }
      if (val != "") {
        me.originalData = me.datas.filter(function (item) {
          if (item[me.textShow].toLowerCase().includes(val.toLowerCase()) || item[me.fieldSearch].toLowerCase().includes(val.toLowerCase())) {
            return true;
          }
          return false;
        });
      } else {
        me.originalData = me.datas;
      }
    },
  },
  methods: {
    /**
     * Hiện ra các option
     * CreatedBy: DQDUY (3/3/2022)
     */
    dropdown() {
      this.isShow = !this.isShow;
      this.originalData = this.datas;
    },

    /**
     * Update lại giá trị listId
     * CreatedBy: DQDUY (3/3/2022)
     */
    updateValue(value) {
      let checkedById = false;
      let curentId;
      this.listId.forEach((id, i) => {
        if (id == value) {
          checkedById = true;
          curentId = i;
        }
      });
      if (!checkedById) {
        this.listId.push(value);
         this.$emit("input", this.listId);
      } else {
        this.deleteItem(curentId);
      }
      this.isShow = false;
      this.textSearch = "";
    },
    /**
     * Xoá item khỏi input của cbb
     * CreatedBy: DQDUY (3/3/2022)
     */
    deleteItem(value) {
      this.listId.splice(value, 1);
      console.log(value);
    },

    /**
     * Hiển thị icon cho các item đc chọn
     * CreatedBy: DQDUY (3/3/2022)
     */
    checkItem(value) {
      let temp = false;
      this.listId.forEach((id) => {
        if (id == value) {
          temp = true;
        }
      });
      return temp;
    },

    /**
     * Khi nhập thì sẽ hiện ra các option combobox
     * CreatedBy: DQDUY (3/3/2022)
     */
    clickout() {
      this.isShow = true;
    },

  },
  created() {
    console.log(this.listId);
    console.log(this.datas);
  },
};
</script>

<style scope>
.rotate {
  transform: rotateX(3.142rad);
}
.btn-dropdown .btn-dropdown-icon {
  height: 16px;
  width: 16px;
}
.btn-dropdown {
  position: absolute;
  top: 1px;
  right: 1px;
  width: 32px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  cursor: pointer;
  border-left: 1px;
}
.btn-dropdown:hover {
  background-color: #ddd;
}
.m-combobox-group tbody tr:hover {
  background-color: #ebedf0;
  color: #35bf22;
}

.m-combobox-group .m-combobox__body .m-combobox__menu .menu-body {
  max-height: 160px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 2px 1px;
}
.m-combobox-group .m-combobox__body .m-combobox__menu {
  border: 1px solid #babec5;
  border-radius: 2px;
  position: absolute;
  top: calc(100% + 2px);

  width: 100%;
  z-index: 9999;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.m-combobox-group .m-combobox__body .m-combobox__menu .menu-header {
  display: flex;
  background: #f4f5f8;
  align-items: center;
}
.m-combobox-group
  .m-combobox__body
  .m-combobox__menu
  .menu-header
  .menu-header__th {
  padding: 0 10px;
  height: var(--input-height);
  color: #111;
  font-family: Notosans-Regular;
  font-weight: 700;
  display: flex;
  align-items: center;
}
.m-combobox-group .m-combobox__body {
  position: relative;
  width: 100%;
}
.m-combobox-group {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.m-combobox-input {
  outline: none;
  font-size: 12px;
  border-radius: 2px;
  border: 1px solid #babec5;
  height: var(--input-height);
  padding-left: 10px;
  padding-right: 32px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
}
.m-combobox-input:hover:not(:focus) {
  outline: 1px solid #e2e2e2;
}
.m-combobox-group input[type="text"] {
  outline: none;
  font-size: 13px;

  width: 100%;
  border: none;
}

.m-combobox__label {
  display: flex;
  width: 100%;
}
.m-text-tittle {
  font-size: 12px;
  font-family: Notosans-Regular;
  color: #111;
  font-weight: 700;
}
.m-combobox-required {
  color: red;
  font-size: 13px;
  font-family: Notosans-Regular;
}
.m-input-error {
  border: 1px solid red !important;
}
.btn-32 {
  width: 32px;
  height: 32px;
  padding: 0 6px;
  box-sizing: content-box;
  cursor: pointer;
}
.m-combobox-group td,
.m-combobox th {
  border: none !important;
}
.m-combobox-group table {
  border-collapse: separate !important;
}
.m-combobox-group .m-table {
  padding: 0;
  z-index: 1000;
  background-color: rgb(253, 253, 253);
}
.mi-20 {
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
  margin-left: 4px;
  cursor: pointer;
}
.mi-16 {
  width: 16px;
  height: 16px;
  min-width: 16px;
  min-height: 16px;
  margin-left: 4px;
  cursor: pointer;
}
.item-acc-group {
  display: flex;
  align-items: center;
  line-height: 20px;
  
  padding: 2px 3px 2px 5px;
  margin: 3px 2px 3px 3px;
  border-radius: 3px;
  height: 20px;
}
.mi-select {
  background: url("../../assets/img/Sprites.svg") no-repeat;
  background-position: -896px -312px;
}
.item-provider{
  background: #f0f0f0;
}
</style>