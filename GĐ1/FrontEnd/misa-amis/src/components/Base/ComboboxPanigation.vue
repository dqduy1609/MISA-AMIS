<template>
  <div class="record-per-page">
    <div class="m-custom-combobox bottom-combobox w100" id="cbxPaging">
      <input
        class="m-combobox m-combobox-input"
        type="text"
        readonly="true"
        v-model="itemSelected"
      />
      <button class="m-combobox-btn combobox-dropdown-btn" @click="showItem">
        <div
          class="m-icon icon-16 m-icon-arrow-down"
          :class="{ panigate: isShow }"
        ></div>
      </button>

      <div class="m-combobox-data" v-show="isShow">
        <div
          v-for="(item, index) in ListItem"
          :key="index"
          class="m-combobox-item"
          :class="{ selected: item == itemSelected }"
          @click="handleClickItem(item, index)"
        >
          <div class="combobox-item-text">{{ item }}</div>
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
      itemSelected: String,
    };
  },
  props: {
    ListItem: Array,
  },
  /**
   * Mặc định lấy item đầu tiên, tương ứng vs 10 bản ghi trên một trang
   * CreatedBy: DQDuy (14/12/2021)
   */
  created() {
    this.itemSelected = this.ListItem[0];
  },
  methods: {
    /**
     * Hiện ra các item -> để chọn số bản ghi trên một trang
     * CreatedBy: DQDuy (14/12/2021)
     */
    showItem() {
      this.isShow = !this.isShow;
    },

    /**
     * Chọn item -> chọn số bản ghi trên một trang
     * CreatedBy: DQDuy (14/12/2021)
     */
    handleClickItem(item, index) {
      try {
        this.itemSelected = item;
        this.isShow = false;
        let pageRecord = 10;
        if (index == 0) pageRecord = 10;
        else if (index == 1) pageRecord = 20;
        else if (index == 2) pageRecord = 30;
        else if (index == 3) pageRecord = 50;
        else if (index == 4) pageRecord = 100;
        this.$emit("handleSelect", pageRecord);
      } catch (error) {}
    },
  },
};
</script>

<style>
/*icon down cho phần phân trang*/
.panigate {
  transform: rotate(180deg);
  transition: 0.5s;
}
</style>