<template>
   <div class="m-modal" v-show="isError">
      <div class="m-message-box">
        <div class="m-message-content">
          <div class="m-message-icon">
            <div class="m-icon m-icon-exclaimation-warning icon-48"></div>
          </div>
          <span class="m-message-text">
            {{ textError }}
          </span>
        </div>
        <div class="m-mess-line"></div>
        <div class="m-message-footer">
          <div class="m-flex-space"></div>
          <button class="m-btn" v-on:click="closePopUp">Đồng ý</button>
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
        isError :Boolean,
        textError : String
    },
    methods:{
      /**
       * Giao tiếp với component cha để đóng thông báo
       * CreatedBy: DQDuy (12/12/2021)
       */
      closePopUp(){
        this.$emit('closePopUp')
      }
    }
}
</script>

<style lang="css">
    
</style>