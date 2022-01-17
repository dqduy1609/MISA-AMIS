<template>
  <v-select
    :options="departmentList"
    label="DepartmentName"
    :reduce="(ontion) => ontion.DepartmentId"
    v-model="employee.DepartmentId"
    :class="{
      'm-form-error': submitted && $v.employee.DepartmentId.$error,
    }"
  >
    <template #list-header>
      <div class="vs__header">
        <div class="m-flex">
          <div class="vs__option"><b>Mã đơn vị</b></div>
          <div class="vs__option"><b>Tên đơn vị</b></div>
        </div>
      </div>
    </template>
    <template v-slot:option="option">
      <div class="m-flex">
        <div class="vs__option">{{ option.DepartmentCode }}</div>
        <div class="vs__option">{{ option.DepartmentName }}</div>
      </div>
    </template>
    <template v-slot:no-options="{ search, searching }">
      <template v-if="searching">
        Không tìm thấy <em>{{ search }}</em
        >.
      </template>
      <em v-else style="opacity: 0.5">Điền vào ô để tìm kiếm tên đơn vị.</em>
    </template>
  </v-select>
</template>

<script>
export default {
    
};
</script>

<style lang="scss" scoped>

</style>