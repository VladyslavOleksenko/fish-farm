<template>
  <div class="switcher">
    <div class="switcher__brick"
         :class="{'switcher__brick-right': switcherPosition === 'right'}"></div>
    <button class="switcher__button"
            :class="{'switcher__button-selected': switcherPosition === 'left'}"
            @click="switcherPosition = 'left'">
      {{ leftOption }}
    </button>
    <button class="switcher__button switcher__button-right"
            :class="{'switcher__button-selected': switcherPosition === 'right'}"
            @click="switcherPosition = 'right'">
      {{ rightOption }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Switcher",
  props: {
    leftOption: {Type: String, required: true},
    rightOption: {Type: String, required: true}
  },
  data: () => ({
    switcherPosition: "left"
  }),
  watch: {
    switcherPosition() {
      this.$emit("optionSelected", this.switcherPosition)
    }
  }
}
</script>

<style scoped>
.switcher {
  position: relative;
  width: 100%;
  height: 100%;

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

  font-size: 25px;
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