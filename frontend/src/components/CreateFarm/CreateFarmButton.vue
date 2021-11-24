<template>
  <button class="create-farm-button"
          @click="$emit('openCreateFarmModal')">
    Create farm
  </button>
</template>

<script>
export default {
  name: "CreateFarmButton"
}
</script>

<style scoped>
.create-farm-button {
  padding: 0 40px;
  height: 70px;

  font-size: 30px;
  font-weight: 500;

  color: #ccc;
  background-color: var(--dark-purple-color);

  border: none;
  border-radius: 5px;
  outline: none;

  transition: background-color .2s ease,
  color .2s ease;
  cursor: pointer;
}

.create-farm-button:hover {
  background-color: var(--light-purple-color);
  color: #ffffff;
}

.create-farm-button:active {
  color: #cccccc;
}
</style>