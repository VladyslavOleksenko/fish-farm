<template>
  <div class="tasks">
    <div class="tasks__content">
      <div class="tasks__list">
        <Task/>
        <Task/>
      </div>
      <MyRectangleButton
        class="tasks__add-button"
        text="Add task"
        icon-name="add"
        @click="addTaskModalData.visibilityStatus = true"/>
    </div>

    <AddTaskModal
      v-model:visibility-status="addTaskModalData.visibilityStatus"
      v-model:content="addTaskModalData.content"/>
  </div>
</template>

<script>
import Task from "@/components/TaskBlock/Task";
import MyRectangleButton from "@/components/UI/MyRectangleButton";
import AddTaskModal from "@/components/Modal/AddTaskModal";

export default {
  name: "Tasks",
  components: {AddTaskModal, MyRectangleButton, Task},
  props: {
    farmWorkerId: {type: Number, required: true}
  },
  data: () => ({
    addTaskModalData: {
      visibilityStatus: false,
      content: {
        farmWorkerId: null,
        title: "",
        description: "",
        deadlineDate: "",
        deadlineTime: "",
        isRecurring: false,
        recurringPeriod: "",
        resultRequiredStatus: false
      }
    }
  }),
  mounted() {
    this.addTaskModalData.content.farmWorkerId = this.farmWorkerId
  }
}
</script>

<style scoped>


.tasks__add-button {
  width: 300px;
  height: 50px;
}
</style>