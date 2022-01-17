<template>
  <div>
    <button id="btnAddEmployee" class="m-btn" v-on:click="openForm">
      Thêm mới nhân viên
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    /**
     * Giao tiếp với component cha để mở form nhân viên
     * CreatedBy: DQDUY (20/12/2021)
     */
    openForm() {
      this.$emit("openForm");
    },
  },
};
</script>

<style lang="">
</style>