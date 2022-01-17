<template>
  <div class="m-loading" v-show="isLoading">
    <div class="m-loading-icon"></div>
  </div>
</template>

<script>
export default {
    props:{
        isLoading:{
            Type: Boolean,
            default : false
        }
    }
};
</script>

<style>

</style>