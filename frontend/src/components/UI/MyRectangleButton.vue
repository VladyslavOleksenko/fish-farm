<template>
  <div class="my-rectangle-button">
    <div class="my-rectangle-button__content"
         @click="$emit('clicked')">
      <MyIcon class="my-rectangle-button__icon" icon-name="add" path-color="#eee"/>
      <p class="my-rectangle-button__text">Add pool</p>
    </div>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";

export default {
  name: "MyRectangleButton",
  components: {MyIcon},
  props: {
    text: {type: String, required: true},
    iconName: {type: String, required: true}
  }
}
</script>

<style scoped>
.my-rectangle-button {
  margin: 50px 0 0 0;

  display: flex;
  justify-content: center;
}

.my-rectangle-button__content {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #eeeeee;
  border: 2px solid #eeeeee;
  border-radius: 4px;

  cursor: pointer;
  transition: background-color .2s ease,
  color .2s ease;
}

.my-rectangle-button__content:hover {
  color: #ffffff;
  background-color: var(--light-purple-color);
}

.my-rectangle-button__content:active {
  color: var(--light-gray-color);
}

.my-rectangle-button__icon {
  margin: 0 15px 0 0;
  width: 20px;
  height: 20px;
}

.my-rectangle-button__text {
  font-size: 22px;
}
</style>