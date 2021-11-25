<template>
  <div class="employee">
    <div class="employee__avatar">
      <NoAvatar class="employee__no-avatar"/>
    </div>
    <div class="employee__fullName">{{ user.firstName }} {{ user.lastName }}</div>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";
import NoAvatar from "@/components/NoAvatar/NoAvatar";

export default {
  name: "Employee",
  components: {NoAvatar, MyIcon},
  props: {
    category: {type: String, required: true},
    user: {type: Object, required: true}
  }
}
</script>

<style scoped>
.employee {
  padding: 10px 20px;

  display: flex;
  align-items: center;

  color: #cccccc;
  border-radius: 4px;

  cursor: pointer;
  transition: background-color .2s ease,
  color .2s ease;
}

.employee:hover {
  color: #ffffff;
  background-color: var(--light-purple-color);
}


.employee__avatar {
  width: 50px;
  height: 50px;
  margin: 0 50px 0 0;
}

.employee__no-avatar {
  width: 100%;
  height: 100%;
}


.employee__fullName {
  font-size: 20px;
}
</style>