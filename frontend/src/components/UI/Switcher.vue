<template>
  <div class="switcher">
    <div class="switcher__brick"
         :class="{'switcher__brick-right': position === 1}"></div>
    <button class="switcher__button"
            :style="{'font-size': fontSize}"
            :class="{'switcher__button-selected': position === 0}"
            @click="position = 0">
      {{ leftValue }}
    </button>
    <button class="switcher__button switcher__button-right"
            :style="{'font-size': fontSize}"
            :class="{'switcher__button-selected': position === 1}"
            @click="position = 1">
      {{ rightValue }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Switcher",
  props: {
    leftName: {Type: String, required: true},
    rightName: {Type: String, required: true},
    leftValue: {Type: String, required: true},
    rightValue: {Type: String, required: true},
    fontSize: {Type: String, default: "25px"}
  },
  data: () => ({
    position: 0
  }),
  watch: {
    position() {
      const name = this.position === 0 ? this.leftName : this.rightName
      this.$emit("update:modelValue", name)
    }
  }
}
</script>

<style scoped>
.switcher {
  min-height: 20px;
  position: relative;

  background-color: var(--dark-purple-color);
  border-radius: 6px;
  overflow: hidden;
}


.switcher__brick {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;

  background-color: var(--blue-color);

  transition: left .2s ease;
}

.switcher__brick-right {
  left: 50%;
}


.switcher__button {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;

  font-weight: 500;

  color: var(--light-gray-color);
  background: none;
  border: none;
  outline: none;

  cursor: pointer;
  transition: color .2s ease,
  background-color .2s ease;
}

.switcher__button:hover {
  background-color: var(--light-purple-color);
}

.switcher__button-selected {
  color: #ffffff;
}

.switcher__button-selected:hover {
  background: none;
}

.switcher__button-right {
  left: 50%;
}
</style>