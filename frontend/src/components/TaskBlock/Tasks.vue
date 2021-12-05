<template>
  <div class="tasks">
    <div class="tasks__content">
      <div class="tasks__list">
        <Task class="tasks__task"
              v-for="(task, i) in taskArray"
              :key="i"
              :task="task"/>
      </div>
      <MyRectangleButton
        class="tasks__add-button"
        text="Add task"
        icon-name="add"
        @click="addTaskModalData.visibilityStatus = true"/>
    </div>

    <AddTaskModal
      v-model:visibility-status="addTaskModalData.visibilityStatus"
      :farm-worker-id="farmWorkerId"
      @added="updateTaskArray"/>
  </div>
</template>

<script>
import Task from "@/components/TaskBlock/Task";
import MyRectangleButton from "@/components/UI/MyRectangleButton";
import AddTaskModal from "@/components/Modal/AddTaskModal";
import {getTaskArrayByFarmWorker} from "@/assets/js/serverRequest"

export default {
  name: "Tasks",
  components: {AddTaskModal, MyRectangleButton, Task},
  props: {
    farmWorkerId: {type: Number, required: true}
  },
  data: () => ({
    taskArray: [],
    addTaskModalData: {
      visibilityStatus: false
    }
  }),
  methods: {
    async updateTaskArray() {
      this.taskArray = await getTaskArrayByFarmWorker(this.farmWorkerId)
    }
  },
  async mounted() {
    await this.updateTaskArray()
  }
}
</script>

<style scoped>
.tasks__task {
  margin: 0 0 10px 0;
}

.tasks__add-button {
  width: 300px;
  height: 50px;
}
</style>