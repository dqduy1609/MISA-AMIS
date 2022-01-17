<template>
  <div class="toolbar-search-box">
    <input
      id="searchText"
      type="text"
      placeholder="Tìm theo mã, tên nhân viên"
      class="m-input"
      v-model="searchText"  
      @keyup.enter="emitToParent"
    />
    <div id="searchBtn" class="m-icon m-icon-search icon-16"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    /**
     * Truyền searchText, giao tiếp với component cha
     * CreatedBy: DQDuy (15/12/2021)
     */
    emitToParent(event) {
      this.$emit("search", this.searchText);
    },
  },
};
</script>

<style>
</style>