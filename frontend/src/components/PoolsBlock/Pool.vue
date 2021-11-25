<template>
  <div class="pool">
    <div class="pool__name">{{ poolInfo.name }}</div>
    <div class="pool__buttons">
      <MyRoundButton class="pool__button" icon-name="delete"/>
      <MyRoundButton class="pool__button" icon-name="edit"/>
    </div>
  </div>
</template>

<script>
import MyRoundButton from "@/components/UI/MyRoundButton";
export default {
  name: "Pool",
  components: {MyRoundButton},
  props: {
    poolInfo: {type: Object, required: true}
  }
}
</script>

<style scoped>
.pool {
  padding: 10px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #cccccc;
  border-radius: 5px;

  cursor: pointer;
  transition: background-color .2s ease,
  color .2s ease;
}

.pool:hover {
  color: #ffffff;
  background-color: var(--light-purple-color);
}


.pool__name {
  font-size: 20px;

  color: #cccccc;
}


.pool__buttons {
  display: flex;
}

.pool__button {
  margin: 0 20px 0 0;
  width: 40px;
  height: 40px;
}

.pool__button:last-child {
  margin: 0;
}
</style>