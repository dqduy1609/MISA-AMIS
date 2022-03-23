<template>
  <div class="m-table-focus">
    <div class="m-table" style="padding: 11px 0">
      <table style="overflow-y: visible !important">
        <thead v-if="haveThead">
          <tr style="height: 35px !important">
            <th
              style="
                min-width: 40px;
                width: 40px;
                padding: 0;
                text-align: center;
              "
              v-if="haveStt"
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
          <tr v-for="(fieldData, index) in datas" :key="index">
            <td v-for="(field, name) in fields" :key="name">
              <input
                class="m-input-table"
                type="text"
                v-model="fieldData[field.name]"
                :disabled="disable"
              />
            </td>
            <td
              style="max-width: 40px; min-width: 40px; width: 40px; padding: 0"
            >
              <div
                class="btn-18 mi-delete"
                @click="delCurrentRow(index)"
                :disabled="disable"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="footer-table-focus">
        <button @click="addRow">
          <p style="padding: 2px 16px" :disabled="disable">Thêm dòng</p>
        </button>
        <button @click="deleteAllRow">
          <p style="padding: 2px 16px" :disabled="disable">Xóa hết dòng</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: [],
    
       dataCore: [],
    };
  },
  props: {
    fields: Array,
    haveStt: Boolean,
    haveThead: Boolean,
    value: Array,
    disable: Boolean,
  },
  methods: {
    /**
     * Thêm một dòng
     * CreatedBy: DQDUY (1/3/2022)
     */
    addRow() {
      let temp = this.datas[this.datas.length - 1];
      let cloneData = { ...temp };
      this.datas.push(cloneData);
    },

    /**
     * Xoá hết các dòng
     * CreatedBy: DQDUY (1/3/2022)
     */
    deleteAllRow() {
      let temp = this.datas[0];
      this.dataCore.push(temp);
      this.datas = this.dataCore;
      this.dataCore = [];
      this.update(this.datas);
    },

    /**
     * Xoá dòng đc chỉ định
     * CreatedBy: DQDUY (1/3/2022)
     */
    delCurrentRow(index) {
      var me = this;
      me.datas.splice(index, 1);
     
      this.update(this.datas);
    },

    update(value) {
      this.$emit("input", value);
    },
    show() {
      console.log(this.datas);
    },
  },
  watch: {
    value() {
      this.datas = this.value;
    },
  },
  created() {
    this.datas = this.value;
    console.log("value", this.value);
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