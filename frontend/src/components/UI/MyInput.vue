<template>
  <div class="my-input">
    <input
      v-if="type === 'file'"
      type="file"
      :file="modelValue"
      @change="updateModelValue"
    >
    <div class="my-input__checkbox checkbox"
         v-else-if="type === 'checkbox'">
      <div class="checkbox__placeholder">
        {{ required ? placeholder + ' *' : placeholder }}
      </div>
      <input class="checkbox__input"
             type="checkbox"
             @change="updateModelValue">
    </div>
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
    modelValue: [String, Number, Boolean, File],
    placeholder: {type: String, default: "Input here"},
    type: {type: String, default: "text"},
    required: {type: Boolean, default: false}
  },
  methods: {
    updateModelValue(event) {
      if (this.type === "file") {
        return this.$emit("update:modelValue", event.target.files[0])
      }

      if (this.type === "checkbox") {
        return this.$emit("update:modelValue", event.target.checked)
      }

      return this.$emit("update:modelValue", event.target.value)
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


.my-input__checkbox {
  padding: 8px 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: var(--light-purple-color);
  border: none;
  border-radius: 4px;
}

.checkbox__placeholder {
  margin: 0 20px 0 0;
  font-size: 20px;
  color: var(--light-gray-color);
}

.my-input input[type=checkbox] {
  width: 40px;
  height: 40px;

  background: red;
}
</style>