<template>
  <div class="checkbox">
    <input type="checkbox" class="m-checkbox" />
    <div class="m-checkbox-label">
      {{ label }}
    </div>
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
  padding-left: 12px;
  font-size: 13px;
  font-family: Notosans-Regular;
  font-weight: normal;
  color: #111;
}
input.m-checkbox {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 1px solid #afafaf;
  border-radius: 2px;
  transform: rotate(-90deg);
}

input.m-checkbox:checked,
input.m-checkbox:active,
input.m-checkbox:checked:active {
  transition: transform 0.15s linear;
  cursor: pointer;
  background: url(../../assets/img/Sprites.64af8f61.svg) no-repeat;
  background-position: -1224px -361px;
  border: 1px solid #2ca01c;
  transform: rotate(0deg);
}

.checkbox {
  display: flex;

  margin: 0 auto;
}
</style>

