<template>
  <div id="btnRefresh" v-on:click="refresh">
    <div class="m-icon m-icon-refresh icon-24"></div>
  </div>
</template>

<script>
export default {
    methods:{
      /**
       * Giao tiếp vs component cha để refresh trang
       * CreatedBy: DQDuy (10/12/2021)
       */
        refresh(){
            this.$emit('refresh')
        }
    }
};
</script>

<style>
</style>