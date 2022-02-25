<template>
  <div class="m-modal">
    <div class="m-modal__main">
      <div class="m-modal__main__header">
        <div class="grid__row">
          <h2>THÔNG TIN NHÂN VIÊN</h2>
        </div>
      </div>
      <div class="m-modal__main__body">
        <slot />
      </div>
      <div class="m-modal__footer">
        <button
          class="m-btn hideDialog"
          style="
            margin-right: 5px;
            color: var(--text-color);
            background-color: rgba(255, 255, 255, 0);
          "
          @click="closeModalHandle"
        >
          Hủy
        </button>
        <button class="m-btn m-btn-icon" @click="submitHandle">
          <i class="add-icon"></i>
          Lưu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    closeModalHandle() {
      this.$emit("closeModal");
    },
    submitHandle() {
      this.$emit("submit");
    },
  },
  props: {
  },
  mounted(){

  }
};
</script>

<style>
.m-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadein 0.5s;
  z-index: 999;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.m-modal__main {
  background-color: #fff;
  border-radius: 5px;
  animation: scale 0.5s;
  position: relative;
}

@keyframes scale {
  from {
    transform: scale(0.7);
  }
  to {
    transform: scale(1);
  }
}

.m-modal__main .m-modal__main__body {
  padding: 20px;
  display: flex;
}

.m-modal__main .m-modal__main__header {
  padding-left: 20px;
}

.m-modal__footer {
  justify-content: right;
  display: flex;
  background-color: #e5e5e5;
  border-radius: 0 0 5px 5px;
  padding: 10px;
}

.m-modal__main .m-modal__main__body .layout-left {
  width: 200px;
  margin-right: 20px;
  font-size: 13px;
  font-family: GoogleSans-Regular;
  justify-content: center;
  text-align: center;
}
.m-modal__main .m-modal__main__body .layout-left img {
  width: 100%;
  height: auto;
  border-radius: 50%;
  border: 2px solid #e5e5e5;
}

.m-modal .m-modal__main .m-modal__closeButton {
  position: absolute;
  right: 0;
  /*background-image: url("../assets/icons/x.svg");*/
  background-repeat: no-repeat;
  background-color: #fff;
  background-size: contain;
  border: none;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 0 5px 0 0;
}
.m-modal .m-modal__main .m-modal__closeButton:hover {
  background-color: #ccc;
}
</style>