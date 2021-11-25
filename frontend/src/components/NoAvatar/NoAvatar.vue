<template>
  <div class="no-avatar">
    <div class="no-avatar-content">
      <MyIcon class="no-avatar-icon" icon-name="profile" path-color="#eee"/>
    </div>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";

export default {
  name: "NoAvatar",
  components: {MyIcon}
}
</script>

<style scoped>
.no-avatar-content {
  width: 100%;
  height: 100%;
  padding: 23%;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid #eeeeee;
  border-radius: 1000px;
}

.no-avatar-icon {
  width: 100%;
  height: 100%;
}
</style>