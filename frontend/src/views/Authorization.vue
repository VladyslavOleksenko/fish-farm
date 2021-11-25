<template>
  <div class="authorization">
    <img class="authorization__greeting-image" src="../../public/lamp.svg" alt="">
    <AuthorizationBlock class="authorization__form-block"/>

    <div class="authorization__page-title">
      <span class="authorization__greeting">Welcome </span>
      <span>to </span>
      <span class="authorization__app-name">FISH Farm</span>
    </div>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";
import AuthorizationBlock from "@/components/AuthorizationBlock/AuthorizationBlock";

export default {
  name: "Authorization",
  components: {AuthorizationBlock, MyIcon},
  data: () => ({
    mode: "register"
  }),
}
</script>

<style scoped>
.authorization {
  position: relative;
  width: 100%;
  min-height: 100vh;

  background-color: var(--light-gray-color);
}


.authorization__page-title {
  padding: 2vw 0 0 5vw;

  font-size: 40px;

  color: var(--dark-purple-color)
}

.authorization__greeting, .authorization__app-name {
  font-weight: 500;
  font-size: 50px;
}


.authorization__greeting-image {
  position: absolute;
  top: 30%;
  left: 10%;
  transform: scale(-1, 1);
  height: 60%;

  opacity: .8;
}

.authorization__form-block {
  position: absolute;
  right: 10%;
  top: 30%;
}
</style>





















