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

      <div class="staff__add-button-wrapper">
        <MyRectangleButton class="staff__add-button"
                           v-if="category !== 'owner'"
                           icon-name="add"
                           :text="inviteButtonText"/>
      </div>
    </div>
  </div>
</template>

<script>
import Employee from "@/components/StaffBlock/Employee";
import MyRectangleButton from "@/components/UI/MyRectangleButton";

export default {
  name: "Staff",
  components: {MyRectangleButton, Employee},
  props: {
    category: {type: String, required: true},
    userArray: {type: Array, default: []}
  },
  computed: {
    inviteButtonText() {
      if (this.category === "administrators") {
        return "add administrator"
      }
      if (this.category === "workers") {
        return "add worker"
      }
    }
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


.staff__add-button-wrapper {
  display: flex;
  justify-content: center;
}

.staff__add-button {
  height: 50px;
  padding: 0 50px;
}
</style>