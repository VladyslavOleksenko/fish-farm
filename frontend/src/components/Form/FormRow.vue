<template>
  <div class="form-row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "FormRow"
}
</script>

<style scoped>
.form-row {
  margin: 0 0 22px 0;
  width: 100%;

  display: flex;
}
</style>