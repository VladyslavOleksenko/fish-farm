<template>
  <div class="staff">
    <div class="staff__content">
      <div class="staff__category">{{ category }}</div>

      <div class="staff__users">
        <Employee class="staff__user"
                  v-for="(user, i) of userArray"
                  :key="i"
                  :user="user"/>
      </div>
    </div>
  </div>
</template>

<script>
import Employee from "@/components/StaffBlock/Employee";

export default {
  name: "Staff",
  components: {Employee},
  props: {
    category: {type: String, required: true},
    userArray: {type: Array, default: []}
  }
}
</script>

<style scoped>
.staff__content {
  width: 100%;
  padding: 20px 30px;

  background-color: var(--dark-purple-color);
}


.staff__category {
  font-size: 25px;
  text-align: center;
  text-transform: capitalize;

  color: var(--light-gray-color);
}
</style>