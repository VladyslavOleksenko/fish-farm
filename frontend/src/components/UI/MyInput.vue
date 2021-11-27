<template>
  <div class="my-input">
    <input
           :placeholder="required ? placeholder + ' *' : placeholder"
           :type="type"
           :value="modelValue"
           @input="updateInput">
  </div>
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number],
    placeholder: {type: String, default: "Input here"},
    type: {type: String, default: "text"},
    required: {type: Boolean, default: false}
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value)
    }
  }
}
</script>

<style scoped>
.my-input input {
  width: 100%;
  height: 53px;
  padding: 0 15px;

  font-size: 22px;

  color: #fff;
  background-color: var(--light-purple-color);
  border: none;
  border-radius: 4px;
  outline: none;
}

.my-input input::placeholder {
  color: var(--light-gray-color);
}
</style>