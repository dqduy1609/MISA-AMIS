<template>
  <div class="m-modal" v-show="showPopUp">
    <div class="m-message-box" style="width : 370px">
      <div class="m-message-content">
        <div class="m-message-icon">
          <div class="m-icon m-icon-exclaimation-warning icon-48" v-show="notError"></div>
          <div class="m-icon m-icon-exclamation-error icon-48" v-show="isError"></div>
        </div>
        <span class="m-message-text">
          {{textPopUp}}
         
        </span>
      </div>
      <div class="m-mess-line"></div>
      <div class="m-message-footer">
        <button class="m-second-btn" v-on:click="closePopUp" v-show="notError">Không</button>
        <div class="m-flex-space"></div>
        <button class="m-btn" v-on:click="deleteEmployee" v-show="notError">Có</button>
        <button class="m-btn" v-on:click="closePopUp" v-show="isError">Đồng ý</button>
      </div>
    </div>
 </div>
</template>

<script>
export default {
    data() {
        return {
           
        }
    },
    props:{
        showPopUp : Boolean,
        employeeCodeDelete : String,
        textPopUp : String,
        isError : Boolean,
        notError : Boolean
    },
    methods:{
   
        /**
         * Giao tiếp với component cha, xác nhận đồng ý xoá bản ghi
         * CreatedBy: DQDuy (11/12/2021)
         */
        deleteEmployee(){
            this.$emit('deleteEmployee')
        },
        /**
         * Đóng PopUp
         * CreatedBy: DQDuy (11/12/2021)
         */
        closePopUp(){
          this.$emit('closePopUp')
        }
    }
};
</script>

<style>
</style>