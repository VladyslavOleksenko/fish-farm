<template>
  <div class="staff">
    <div class="staff__content">
      <div class="staff__category">{{ category }}</div>

      <div class="staff__users">
        <Employee class="staff__user"
                  v-for="(user, i) of userArray"
                  :key="i"
                  :user="user"
                  :category="category"/>
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
  padding: 20px;

  background-color: var(--dark-purple-color);
  box-shadow: 0 5px 10px 4px rgba(44, 46, 67, 0.7);
  border-radius: 6px;
}


.staff__category {
  margin: 0 0 30px 0;
  font-size: 25px;
  text-align: center;
  text-transform: capitalize;

  color: #eeeeee;
}

.staff__user {
  margin: 0 0 20px 0;
}

.staff__user:last-child {
  margin: 0;
}
</style>