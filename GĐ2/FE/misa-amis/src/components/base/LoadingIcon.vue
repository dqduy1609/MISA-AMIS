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
/* loading */
.m-loading {
    z-index: 9999;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(7, 2, 2, 0.151);
  }
  
  .m-loading .m-loading-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(50%, 50%);
    height: 32px;
    width: 32px;
    background-image: url('../../assets/loading.svg');
    background-position: center;
    background-size: contain;
    animation: spin 2s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>