<template>
  <div class="m-checkbox">
    <input type="checkbox" />
    <div class="m-checkbox-label">{{ label }}</div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
  },
};
</script>

<style scope>
.m-checkbox-label {
  padding-left: 10px;
  font-size: 13px;
  font-family: Notosans-Regular;
  font-weight: normal;
  color: #111;
}
.m-checkbox {
  display: flex;

  margin: 0 auto;
}
.m-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
}
</style>