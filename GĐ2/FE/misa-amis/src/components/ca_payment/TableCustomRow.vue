<template>
  <div class="m-table-focus">
    <div class="m-table" style="padding: 11px 0">
      <table style="overflow-y: visible !important">
        <thead v-if="!noneThead">
          <tr style="height: 35px !important">
            <th
              style="
                min-width: 40px;
                width: 40px;
                padding: 0;
                text-align: center;
              "
              v-if="!noneStt"
            >
              #
            </th>
            <th
              v-for="(field, index) in fields"
              :key="index"
              :style="[
                { 'text-align': field.type === 'monney' ? 'right' : '' },
                { width: field.width },
                { 'min-width': field.width },
              ]"
            >
              {{ field.text }}
            </th>
            <th
              style="max-width: 40px; min-width: 40px; width: 40px; padding: 0"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(fieldData, index) in datas"
            :key="index"
            @click="updateValue(index, $event), update(datas)"
           
          >
            <td v-if="!noneStt" style="text-align: center">{{ index + 1 }}</td>
            <td
              class="header-table"
              v-for="(field, name) in fields"
              :key="name"
              :style="[
                { 'text-align': field.type === 'monney' ? 'right' : '' },
                { width: field.width },
              ]"
            >
              <div v-show="select == index">
                <Combobox
                  :ref="`${index}-${field.name}`"
                  :fields="field.fieldCombobox"
                  :datas="field.dataCombobox"
                  :width="field.widthCombobox"
                  v-if="field.type === 'combobox'"
                  v-model="fieldData[field.name]"
                  :id="field.idCombobox"
                  :textShow="field.textShowCombobox"
                  :disable="disable"
                  :location="field.locationCombobox"
                  @selectValue="selectCombobox($event, field, fieldData)"
                />
                <p v-else-if="field.type == 'read'">
                  {{ fieldData[field.name] }}
                </p>
                <div v-else>
                  <!-- <input
                    @blur="blur(datas)"
                    class="m-input-table"
                    v-if="field.type === 'monney'"
                    style="text-align: right"
                    type="text"
                    @keypress="onKeyPress"
                    v-model="fieldData[field.name]"
                    :disabled="disable"
                    data-type="currency"
                    pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                    name="currency-field"
                    id="currency-field"
                  /> -->
                  <input
                    @blur="blur(datas)"
                    class="m-input-table"
                    v-if="field.type === 'monney'"
                    style="text-align: right"
                    type="text"
                    @keypress="onlyNumber"
                    v-model="fieldData[field.name]"
                    :disabled="disable"
                  />
                  <input
                    @blur="blur(datas)"
                    class="m-input-table"
                    v-else
                    v-model="fieldData[field.name]"
                    :disabled="disable"
                  />
                </div>
              </div>
              <p v-show="select != index">
                <span v-if="field.type === 'combobox'">
                  {{ fieldData[field.textShowCombobox] }}
                </span>
                <span v-else-if="field.type === 'monney'"
                  >{{ fieldData[field.name] | formatMoney }}
                </span>
                <span v-else>{{ fieldData[field.name] }}</span>
              </p>
            </td>
            <td
              @click="deleteItem(fieldData, index)"
              style="max-width: 40px; min-width: 40px; width: 40px; padding: 0"
            >
              <div class="btn-18 mi-delete"></div>
            </td>
          </tr>
          <tr
            v-if="!noneFooter"
            class="footer-table"
            style="height: 34px !important; border-bottom: none"
          >
            <td style="height: 34px"></td>
            <td
              style="height: 34px"
              v-for="(field, text) in fields"
              :key="text"
              :style="field.type === 'monney' ? 'text-align:right' : ''"
            >
              <p style="padding: 0 10px" v-if="field.type === 'monney'">
                {{ String(monney) | formatMoney }}
              </p>
            </td>
            <td style="height: 34px"></td>
          </tr>
        </tbody>
      </table>
      <div class="footer-table-focus">
        <button :disabled="disable" @click="addData(), (select += 1), show()">
          <p style="padding: 2px 16px">Thêm dòng</p>
        </button>
        <button :disabled="disable" @click="removeData(), (select = 0)">
          <p style="padding: 2px 16px">Xóa hết dòng</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Combobox from "../provider/CbbProvider.vue";
export default {
  components: { Combobox },
  data() {
    return {
      datas: [],
      select: -1,
      dataCore: [],
    };
  },

  mounted() {},
  props: {
    fields: Array,
    value: Array,
    btnText: String,
    monney: Number,
    disable: {
      default: false,
      type: Boolean,
    },
    noneThead: Boolean,
    noneFooter: Boolean,
    noneStt: Boolean,
  },
  watch: {
    value() {
      this.datas = this.value;
    },
  },
  created() {
    this.datas = this.value;
    console.log(this.select);
  },
  methods: {
    /** 
     * Định dạng lại dữ liệu nhập vào input có dạng là tiền
     * CreatedBy: DQDUY (14/3/2022)
    */
    onKeyPress() {
      $("input[data-type='currency']").on({
        keyup: function () {
          this.formatCurrency($(this));
        },
        blur: function () {
          this.formatCurrency($(this), "blur");
        },
      });
    },
    formatNumber(e) {
      return e.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    formatCurrency(input, blur) {
      // appends $ to value, validates decimal side
      // and puts cursor back in right position.

      // get input value
      var input_val = input.val();

      // don't validate empty input
      if (input_val === "") {
        return;
      }

      // original length
      var original_len = input_val.length;

      // initial caret position
      var caret_pos = input.prop("selectionStart");

      // check for decimal
      if (input_val.indexOf(".") >= 0) {
        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");

        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);

        // add commas to left side of number
        left_side = this.formatNumber(left_side);

        // validate right side
        right_side = this.formatNumber(right_side);

        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
          right_side += "00";
        }

        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);

        // join number by .
        input_val = "$" + left_side + "." + right_side;
      } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = this.formatNumber(input_val);
        input_val = "$" + input_val;

        // final formatting
        if (blur === "blur") {
          input_val += ".00";
        }
      }

      // send updated string to input
      input.val(input_val);

      // put caret back in the right position
      var updated_len = input_val.length;
      caret_pos = updated_len - original_len + caret_pos;
      input[0].setSelectionRange(caret_pos, caret_pos);
    },
    /** */


    checkInput(ref, value) {
      this.$emit("checkInput", ref, value);
    },

    /**
     * Dữ liệu nhập vào chỉ đc là số
     * CreatedBy: DQDUY (10/3/2022)
     */
    onlyNumber: function (e) {
      if (/^\d*$/.test(e.key) == false && e.keyCode != 8) {
        e.preventDefault();
      }
    },
    /**
     * Thêm dòng trong bảng
     * CreatedBy: DQDUY (10/3/2022)
     */
    addData() {
      let temp = this.datas[this.datas.length - 1];
      let cloneData = { ...temp };
      this.datas.push(cloneData);
      console.log("select khi thêm", this.select);
    },

    /**
     * Xoá hết các dòng trong bảng
     * CreatedBy: DQDUY (10/3/2022)
     */
    removeData() {
      let temp = this.datas[0];
      this.dataCore.push(temp);
      this.datas = this.dataCore;
      this.dataCore = [];
      this.update(this.datas);
      this.$emit("removeAllRow");
      console.log("select khi xoá", this.select);
    },

    /**
     * Lựa chọn bản ghi trong combobox
     * CreatedBy: DQDUY (10/3/2022)
     */
    selectCombobox(data, field, fieldData) {
      const me = this;
      console.log(me);
      console.log(data);
      console.log(field);
      this.$emit("selectComboboxTable", data, field, fieldData);
    },


    updateValue(value, event) {
      this.select = value;
      let temp = event.target.parentElement.getElementsByTagName("input")[0];
      if (temp) {
        setTimeout(function () {
          temp.focus();
        });
      }
    },

    update(value) {
      this.$emit("input", value);
    },
    blur(value) {
      this.$emit("blur", value);
    },
    show() {
      console.log(this.select);
    },

    /**
     * Xoá dòng hiện tại
     * CreatedBy: DQDUY (12/3/2022)
     */
    deleteItem(fieldData, index) {
      var me = this;
      me.datas.splice(index, 1);
      if (me.select > index || me.select == index) {
        --me.select;
      }

      this.update(this.datas);
      this.$emit("removeRow", fieldData);
      console.log("select khi xoá duy nhất", this.select);
    },
  },

  filters: {
    /**
     * Format dữ liệu dạng tiền
     * CreatedBy: DQDUY (14/3/2022)
     */
    formatMoney: function (value) {
      if (value) {
        return Number(value)
          .toFixed(0)
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      }
      return "";
    },
  },
};
</script>

<style scope>
.m-table-focus {
  box-sizing: border-box;
  width: 100%;
}
.m-table-focus table {
  overflow-y: scroll;
  width: 100%;
}
.m-table-focus th + tr {
  box-sizing: border-box;
}
.m-table-focus tr {
  width: auto;
}

.m-table-focus .selected {
  background-color: #f4f5f8 !important;
}
.header-table td {
  padding: 6px 10px;
  width: auto;
  height: 44px;
}
.footer-table td {
  border: none !important;
}
.footer-table td {
  background: #f8f9fe !important;
}
.m-input-table {
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

.m-input-table:hover:not(:focus) {
  outline: 1px solid #e2e2e2;
}
.m-input-table:focus {
  border: 1px solid #2ca01c;
}
.m-table-focus p {
  padding: 6px 10px;
  width: 100%;
  margin: 0 !important;
}

.footer-table-focus {
  padding-top: 16px;
  /* position: fixed; */
}
.footer-table-focus button {
  height: 24px;
  background-color: #fff;
  margin-right: 6px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 12px;
  margin-right: 8px;
  border-color: #8d9096;
  border-radius: 4px;
}
.footer-table-focus button:hover {
  cursor: pointer;
}
.btn-18 {
  width: 18px;
  height: 18px;
  margin-left: 8px;
}
</style>