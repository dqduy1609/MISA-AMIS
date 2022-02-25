<template>
  <div v-if="totalPage > 1" class="m-page-number-navigation">
    <div
      class="btn-prev"
      style="margin-right: 13px"
      @click="setIndex(index - 1)"
    >
      Trước
    </div>
    <div
      :class="['m-page-number', { selected: 1 == index }]"
      @click="setIndex(1)"
    >
      1
    </div>
    <div
      class="m-page-number"
      v-if="indexRender >= 3"
      @click="indexRender -= 3"
    >
      ...
    </div>
    <template v-for="(pageNumber, i) in new Array(totalPage - 2)">
      <div
        v-if="checkShow(i + 2)"
        :key="i"
        :class="['m-page-number', { selected: i + 2 == index }]"
        @click="setIndex(i + 2)"
      >
        {{ i + 2 }}
      </div>
    </template>
    <div
      class="m-page-number"
      v-if="indexRender < totalPage - 3"
      @click="indexRender += 3"
    >
      ...
    </div>
    <div
      :class="['m-page-number', { selected: totalPage == index }]"
      @click="setIndex(totalPage)"
    >
      {{ totalPage }}
    </div>
    <div
      class="btn-next"
      style="margin-left: 13px"
      @click="setIndex(index + 1)"
    >
      Sau
    </div>
  </div>
  <div v-else class="m-page-number-navigation">
    <div
      class="btn-prev"
      style="margin-right: 13px"
      @click="setIndex(index - 1)"
    >
      Trước
    </div>
    <div
      :class="['m-page-number', { selected: 1 == index }]"
      @click="setIndex(1)"
    >
      1
    </div>
    <div
      class="btn-next"
      style="margin-left: 13px"
      @click="setIndex(index + 1)"
    >
      Sau
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      index: 1,
      indexRender: 1,
    };
  },
  props: {
    totalPage: Number,
  },
  methods: {
    checkShow(value) {
      if (
        value == this.indexRender ||
        value == this.indexRender + 1 ||
        value == this.indexRender + 2
      )
        return true;
    },
    setIndex(value) {
      this.index = value;
      this.indexRender = value;
      if (value >= 1 && value <= this.totalPage)
        this.$emit("handleSelectPanigation", value);
    },
  },
  watch: {
    indexRender: function (value) {
      if (value >= this.totalPage - 2) {
        this.indexRender = this.totalPage - 2;
      }
      else if (value <= 2) {
        this.indexRender = 1;
      }
    },
    index: function (value) {
      if (value < 1) this.index = 1;
      else if (value > this.totalPage) this.index = this.totalPage;
    },
  },
};
</script>

<style scoped>
.btn-next,
.btn-prev {
  cursor: pointer;
}
.m-page-number-navigation {
  display: flex;
}
.m-page-number {
  padding: 0 6.5px;
  color: #111;
  font-size: 13px;
  cursor: pointer;
}
.m-page-number.selected {
  border: 1px solid #e0e0e0;
  font-weight: 700;
}
</style>