<template>
  <div class="my-form">
    <div class="my-form__message"
         :class="{'my-form__message-hidden': !messageVisibilityStatus}">
      {{message}}
    </div>
    <slot></slot>
    <MyRectangleButton
      class="my-form__submit"
      icon-name="ok"
      :text="submitText"
      :disabled="submitDisabled"
      @clicked="$emit('submitted')"
      @disableClicked="$emit('update:messageVisibilityStatus', true)"
    />
  </div>
</template>

<script>
import MyRectangleButton from "@/components/UI/MyRectangleButton";

export default {
  name: "MyForm",
  components: {MyRectangleButton},
  props: {
    submitText: {type: String, default: "Submit"},
    submitDisabled: {type: Boolean, default: false},
    message: String,
    messageVisibilityStatus: {Boolean, default: false}
  }
}
</script>

<style scoped>
.my-form {
  padding: 30px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.my-form__message {
  margin: 0 0 40px;
  padding: 0 20px;
  height: 30px;

  text-align: center;
  font-size: 25px;
  font-weight: 500;

  color: #ec7da8;

  transition: opacity .2s ease;
}

.my-form__message-hidden {
  opacity: 0;
}


.my-form__submit {
  margin: 30px 0 0 0;
  height: 50px;
}
</style>