<template>
  <MyInput class="form-input"
           :type="type"
           :placeholder="placeholder"
           :required="required"
           v-model="modelValue"/>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
export default {
  name: "FormInput",
  components: {MyInput},
  props: {
    modelValue: [String, Number],
    type: String,
    placeholder: String,
    required: Boolean,
  },
  watch: {
    modelValue() {
      this.$emit("update:modelValue", this.modelValue)
      this.$emit("updated")
    }
  }
}
</script>

<style scoped>
.form-input {
  margin: 0 0 0 15px;

  flex: 1 1 auto;
}

.form-input:first-child {
  margin: 0;
}
</style>