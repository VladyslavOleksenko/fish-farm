<template>
  <div class="delete-modal">
    <MyModal @hide="$emit('hide')">
      <div class="delete-modal__content">
        <p class="delete-modal__message">{{ content.message }}</p>
        <p class="delete-modal__warning">This action cannot be undone!</p>
        <p class="delete-modal__warning">Are you sure?</p>
        <div class="delete-modal__buttons">
          <MyRectangleButton
            class="delete-modal__button"
            :text="content.cancelButtonText || 'cancel'"
            icon-name="back"
            @click="$emit('hide')"/>
          <MyRectangleButton
            class="delete-modal__button"
            :text="content.deleteButtonText || 'delete'"
            icon-name="delete"
            @click="$emit('delete')"/>
        </div>
      </div>
    </MyModal>
  </div>
</template>

<script>
import MyModal from "@/components/Modal/MyModal";
import MyRectangleButton from "@/components/UI/MyRectangleButton";
import MyRoundButton from "@/components/UI/MyRoundButton";

export default {
  name: "DeleteModal",
  components: {MyRoundButton, MyRectangleButton, MyModal},
  props: {
    content: {
      type: Object,
      default: {
        message: "",
        deleteButtonText: "Delete",
        cancelButtonText: "Cancel"
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


.delete-modal__buttons {
  margin: 60px 0 0 0;
  width: 75%;

  display: flex;
  justify-content: space-between;
}

.delete-modal__button {
  width: 47%;
  height: 60px;
}
</style>