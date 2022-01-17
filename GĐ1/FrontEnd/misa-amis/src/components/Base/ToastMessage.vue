<template>
  <div class="m-toast .m-toast-success" v-show="isShowToast">
    <i class="fas fa-check-circle" style="color: #01b075"></i>
    <div class="m-toast-text">{{toastText}}</div>
    <span class="fas fa-times" style="color: #01b075; cursor: pointer"></span>
  </div>
</template>

<script>
export default {
    props:{
        isShowToast:{
            Type:Boolean,
            default: true
        },
        toastText:{
            Type : String,
            default: ""
        }
    }
};
</script>

<style>
.m-toast {
  position: absolute;
  top: 70px;
  left: 600px;  
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  min-width: 200px;
  max-width: 300px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  padding: 16px;
  animation-name: toogle;
  animation-duration: 3s;
  z-index: 9999;
}

.m-toast-text {
  flex: 1;
  padding-left: 8px;
}

.m-toast > span:hover {
  opacity: 0.6;
}
@keyframes toogle {
  0%   { top:0px;}
  25%  { top:50px;}
 
}
</style>