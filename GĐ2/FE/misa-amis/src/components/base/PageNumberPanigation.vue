<template>
  <div>
    <Paginate
      :pageCount="totalPage"
      :click-handler="changePageNumber"
      :prevText="'Trước'"
      :nextText="'Sau'"
      :containerClass="'pagination'"
      class="pagination"
      v-model="pageNumber"
    >
    </Paginate>
  </div>
</template>

<script>
import Paginate from "vuejs-paginate";
export default {
  data() {
    return {
      pageNumber: 0,
    };
  },
  props: {
    totalPage: Number,
  },
  components: {
    Paginate,
  },
  methods: {
    /** 
    * Truyền thay đổi pageNumber và giao tiếp component cha
    * CreatedBy :  DQDuy (17/12/2021)
    */
    changePageNumber(pageNum) {
      this.pageNumber = pageNum;
      this.$emit('handleSelectPanigation', this.pageNumber)
    },
  },
};
</script>

<style>
.pagination {
  list-style: none;
  display: flex;
  justify-content: center;
}
.pagination a {
  float: left;
  padding: 2px 6px;
}

.pagination a.active {
  background-color: green;
}

.active{
   border: 1px solid #ddd;
   font-weight: bold;
  background-color: #ffffff;
}
</style>