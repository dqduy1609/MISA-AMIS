<template>
  <div>
    <div class="m-icon m-icon-export-excel icon-24">
      <a href="https://localhost:44320/api/v1/Employees/ExportToExcel" class="export-excel">Export To Excel</a>
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
     
    }
  },

};
</script>

<style lang="css">
.export-excel{
  z-index: 999;
  opacity: 0;
}
</style>