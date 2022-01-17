<template>
  <div>
    <div class="drop-box">
      <span>Thực hiện hàng loạt</span>
      <div
        class="m-icon icon-16 m-icon-arrow-down blur"
        v-on:click="showMultiDel"
        :class="{ clearly: selectedId.length >= 1 }"
      ></div>
    </div>
    <div class="multi-delete" v-show="isMultiDel && selectedId.length >= 1" v-on:click="multiDelete">
      <p>Xoá</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMultiDel: false,
    };
  },
  props: {
    selectedId: Array,
  },
  methods: {
    /**
     * Hiển thị chức năng xoá -> xoá nhiều
     * CreatedBy: DQDuy (24/12/2021)
     */
    showMultiDel() {
      if (this.selectedId) {
        this.isMultiDel = !this.isMultiDel;
      }
    },

    /**
     * Gửi yêu cầu xoá nhiều sang component cha
     * CreatedBy: DQDuy (23/12/2021)
     */
    multiDelete(){
      this.$emit('multiDelete')
    }
  },
  
};
</script>

<style>
@import url("../../style/base/icon.css");
.drop-box {
  position: relative;
  width: 180px;
  height: 40px;
  background-color: #ffffff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 2px solid #3b3c3f;
  cursor: pointer;
}
.drop-box:hover {
  background-color: #d2d3d6;
}
.drop-box span {
  padding: 4px 4px 4px 16px;
  font-family: MISA Font;
  font-size: 13px;
  text-align: center;
  font-weight: 600;
}
.multi-delete {
  position: absolute;
  top: 176px;
  left: 275px;
  height: 34px;
  width: 104px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #babec5;
  z-index: 999;
  cursor: pointer;
}
.multi-delete p {
  font-family: MISA Font;
  font-size: 13px;
  text-decoration: none solid rgb(17, 17, 17);
  text-align: left;
  padding: 5px 10px 5px 10px;
}
.multi-delete:hover {
  background-color: #e8e9ec;
}
/* làm mờ icon */
.blur {
  opacity: 0.5;
}
/* hiển thị rõ icon */ 
.clearly {
  opacity: 1;
  border: none;
}
@font-face {
  font-family: MISA Font;
  src: url("../../assets/fonts/notosans-regular.2cb88a13.woff2");
}
</style>