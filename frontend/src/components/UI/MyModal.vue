<template>
  <div class="my-modal"
       @click="$emit('hide')">
    <div class="my-modal__content"
         @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyModal"
}
</script>

<style scoped>
.my-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(145, 145, 164, 0.84);
}


.my-modal__content {
  padding: 20px;
  min-width: 30%;
  min-height: 10%;
  max-width: 45%;

  background-color: var(--dark-purple-color);
  border-radius: 9px;
}
</style>