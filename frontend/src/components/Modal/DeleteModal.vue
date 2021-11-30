<template>
  <div class="delete-modal">
    <MyModal @hide="$emit('hide')">
      <div class="delete-modal__content">
        <p class="delete-modal__message">{{ content.message }}</p>
        <p class="delete-modal__warning">This action cannot be undone!</p>
        <p class="delete-modal__warning">Are you sure?</p>
        <MyRectangleButton
          class="delete-modal__button"
          :text="content.buttonText"
          icon-name="delete"
          @click="$emit('delete')"/>
      </div>
    </MyModal>
  </div>
</template>

<script>
import MyModal from "@/components/Modal/MyModal";
import MyRectangleButton from "@/components/UI/MyRectangleButton";

export default {
  name: "DeleteModal",
  components: {MyRectangleButton, MyModal},
  props: {
    content: {
      type: Object,
      default: {
        message: "",
        buttonText: "Delete"
      },
      required: true
    }
  }
}
</script>

<style scoped>
.delete-modal__content {
  padding: 20px 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
}


.delete-modal__message {
  margin: 0 0 30px 0;

  font-size: 25px;
  text-align: center;

  color: #eeeeee;
}

.delete-modal__warning {
  margin: 0 0 15px 0;

  font-size: 20px;

  color: #ff6161;
}


.delete-modal__button {
  margin: 60px 0 0 0;
  height: 60px;
}
</style>