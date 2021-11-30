<template>
  <div class="my-round-button">
    <MyIcon class="my-round-button__icon"
            :icon-name="iconName"
            path-color="#eee"/>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";

export default {
  name: "MyRoundButton",
  components: {MyIcon},
  props: {
    iconName: {type: String, required: true}
  }
}
</script>

<style scoped>
.my-round-button {
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid #eeeeee;
  border-radius: 1000px;

  cursor: pointer;
  transition: background-color .2s ease;
}

.my-round-button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.my-round-button:active {
  background-color: rgba(255, 255, 255, 0.1);
}

.my-round-button__icon {
  width: 40%;
  height: 40%;
}
</style>