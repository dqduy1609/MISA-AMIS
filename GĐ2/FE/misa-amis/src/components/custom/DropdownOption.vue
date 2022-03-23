<template>
  <div
    :class="['m-option-dropdown-btn', { border: selected }]"
    @click="showDropMethod"
  >
    <div style="width: 16px; height: 16px" class="dropdown-blue"></div>
    <div
      class="m-option-dropdown__body"
      v-if="isShow && parent == 'AccountObject'"
      id="contextMenu"
    >
      <div class="m-option-dropdown__item" @click="Show">Xem</div>
      <div class="m-option-dropdown__item" @click="Edit">Sửa</div>
      <div class="m-option-dropdown__item" @click="Clone">Nhân bản</div>
      <div class="m-option-dropdown__item" @click="Delete">Xóa</div>
      <div class="m-option-dropdown__item">Ngừng sử dụng</div>
    </div>
    <div
      class="m-option-dropdown__body"
      v-if="isShow && parent == 'CaPayment'"
      id="contextMenu"
    >
      <div class="m-option-dropdown__item">Ghi sổ</div>
      <div class="m-option-dropdown__item" @click="Clone">Nhân bản</div>
      <div class="m-option-dropdown__item" @click="Delete">Xóa</div>
    </div>
  </div>
</template>

<script>
//import $ from "jquery";
export default {
  data() {
    return {
      selected: false,
      isShow: false,
    };
  },
  props: {
    parent: String,
  },
  methods: {
    Edit() {
      this.$emit("edit");
    },
    Show() {
      this.$emit("show");
    },

    /**
     * Gọi sự kiện delete từ thằng DropdownOption (con) ra Customtable (cha)
     * CreatedBy: DQDUY (28/2/2022)
     */
    Delete() {
      this.$emit("delete");
    },

    Clone() {
      this.$emit("clone");
    },
    /**
     * Hiện ra menu các chức năng
     * CreatedBy: DQDUY (15/2/2022)
     */
    showDropMethod() {
      this.isShow = !this.isShow;
      this.selected = !this.selected;
    },
  },
};
</script>

<style scope>
.m-option-dropdown__item {
  z-index: 9990;
  padding: 5px 10px;
}
.m-option-dropdown__item:hover {
  background-color: #e8e9ec;
  color: #08bf1e;
}
.m-option-dropdown-btn {
  position: relative;
  width: 26px;
  height: 20px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.m-option-dropdown__body {
  white-space: nowrap;
  position: absolute;
  top: calc(100% + 2px);
  right: 0;
  background-color: #fff;
  z-index: 9990;

  padding: 2px 1px;
  border-radius: 2px;
  border: 1px solid #babec5;

  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.border {
  border: 1px solid #0075c0;
}
</style>