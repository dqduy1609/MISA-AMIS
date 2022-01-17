<template>
  <div class="m-custom-combobox w100" id="cbxDepartment">
    <input
      class="m-combobox m-combobox-input"
      type="text"
      :value="showText(value)"
      :class="{ 'm-input-error': departmentIdIsNull }"
      :title="departmentIdIsNull ? titleDepartmentError : null"
      @keyup.enter="filterData($event)"
    />
    <button
      class="m-combobox-btn combobox-dropdown-btn"
      @click="showData"
      :class="{ 'm-input-error': departmentIdIsNull }"
    >
      <div class="m-icon icon-16 m-icon-arrow-down"></div>
    </button>
    <div class="m-combobox-data m-cbb-deparment" v-show="isShow">
      <div
        class="m-combobox-item"
        v-for="(department, index) in Departments"
        :key="index"
        @click="updateValue(department.departmentId)"
      >
        <div class="combobox-item-text">{{ department.departmentName }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

import Resource from "../../js/base/resource";
import axios from "axios";
export default {
  props: {
    value: String,
  },
  data() {
    return {
      isShow: false,
      titleDepartmentError: Resource["VN"].Warning.DepartmentIsEmpty,
      textSearch: "",
      Departments: [],
      departmentIdIsNull: false,
    };
  },
  methods: {
    /**
     * Hiện cbb department và load lên dữ liệu cho cbb
     * CreatedBy: DQDuy (10/12/2021)
     */
    showData() {
      this.textSearch = "";
      this.loadDataDeparment();
      this.isShow = !this.isShow;
    },

    /**
     * lấy ra dữ liệu id, giao tiếp với component cha
     * CreatedBy: DQDuy (10/12/2021)
     */
    updateValue(value) {
      this.isShow = false;
      this.$emit("input", value);
      this.departmentIdIsNull = false;
    },

    /**
     * Nhận vào giá trị departmentId và chuyển sang departmentName
     * CreatedBy: DQDuy (10/12/2021)
     */
    showText(id) {
      try {
        for (let i = 0; i < this.Departments.length; i++) {
          if (id == this.Departments[i].departmentId)
            return this.Departments[i].departmentName;
        }
        return "";
      } catch (error) {}
    },

    /**
     * Autocomplete combobox phòng ban
     * CreatedBy: DQDuy (27/12/2021)
     */
    filterData(e) {
      this.textSearch = e.target.value;
      if (e.target.value) {
        this.loadDataDeparment();
      }
      this.isShow = true;
    },

    /**
     * Load dữ liệu phòng ban
     * CreatedBy: DQDuy (27/12/2021)
     */
    loadDataDeparment() {
      try {
        axios
          .get(
            `${Resource.AMIS_SERVICE_URL}/Departments/filter?filter=${this.textSearch}`
          )
          .then((res) => {
            this.Departments = res.data;
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {}
    },
  },

  /**
   * Load dữ liệu cbb phòng ban
   * CreatedBy: DQDuy (10/12/2021)
   */
  created() {
    this.loadDataDeparment();
  },
};
</script>

<style>
</style>