<template>
  <div class="my-multiselect">
    <div class="my-multiselect__options">
      <div
        class="my-multiselect__option"
        v-for="(option, i) in options"
        :key="i"
      >
        <div class="my-multiselect__checkbox"></div>
        <div class="my-multiselect__text">
            {{opiton}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
    value: Array,
    placeholder: String,
    displayProperty: String,
    valueProperty: String,
  },
  created(){
      console.log(this.options);
      console.log(this.displayProperty);
  }
};
</script>

<style scoped>
.my-multiselect {
  background: #fff;
  padding: 6px 12px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  min-height: 33px;
  min-width: 222px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.my-multiselect:focus {
  outline: none;
}
.my-multiselect__placeholder {
  color: #929292;
}
.my-multiselect__selected {
  border: 1px solid #e0e0e0;
  padding: 4px 8px;
  padding-right: 0;
  margin: 3px 3px;
}
.my-multiselect__remove {
  cursor: pointer;
  padding-right: 7px;
}
.my-multiselect__remove:hover {
  color: red;
  font-weight: bold;
}
.my-multiselect__options {
  position: absolute;
  top: 34px;
  right: 0;
  left: 0;
  display: flex;
  background: #fff;
  flex-direction: column;
  box-shadow: 0px 3px 3px 0px #e3e3e3;
  padding: 5px 0;
  min-height: 55px;
  min-width: 188px;
  overflow-y: auto;
  z-index: 999;
}
.my-multiselect__option {
  padding: 6px 11px;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.my-multiselect__option--checked {
  color: #1f7bb8;
  font-weight: bold;
}
.my-multiselect__checkbox {
  width: 22px;
  height: 22px;
  border: 1px solid #969696;
  margin-right: 7px;
  position: relative;
}
.my-multiselect__option--checked .my-multiselect__checkbox {
  border: 1px solid #1f7bb8;
  background: #1f7bb8;
}
.my-multiselect__option--checked .my-multiselect__checkbox::after {
  width: 11px;
  height: 6px;
  border-left: 2px solid rgb(255, 255, 255);
  border-bottom: 2px solid rgb(255, 255, 255);
  content: "";
  z-index: 999;
  position: absolute;
  transform: rotate(-45deg);
  left: 3px;
  top: 4px;
}
</style>