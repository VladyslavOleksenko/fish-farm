<template>
  <div class="my-input">
    <input
      v-if="type === 'file'"
      type="file"
      :file="modelValue"
      @change="updateModelValue"
    >
    <input
      v-else
      :placeholder="required ? placeholder + ' *' : placeholder"
      :type="type"
      :value="modelValue"
      @input="updateModelValue">
  </div>
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number, File],
    placeholder: {type: String, default: "Input here"},
    type: {type: String, default: "text"},
    required: {type: Boolean, default: false}
  },
  methods: {
    updateModelValue(event) {
      if (this.type !== "file") {
        return this.$emit("update:modelValue", event.target.value)
      }

      return this.$emit("update:modelValue", event.target.files[0])
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