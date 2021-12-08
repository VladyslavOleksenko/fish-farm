<template>
  <div class="task-view">
    <div class="task-view__content">
      <div class="task-view__header">
        <div class="task-view__salutation">
          Hey, Vladyslav
        </div>
        <div class="task-view__description">
          It is a page with all your tasks
        </div>
      </div>

      <div class="task-view__tasks">
        <WorkerTask
          class="task-view__task"
          v-for="(task, i) in taskArray"
          :key="i"
          :task-info="task"/>
      </div>

      <img class="task-view__image"
           src="../../public/tasks.svg"
           alt="">
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import {getTaskArrayByUserId} from "@/assets/js/serverRequest";
import WorkerTask from "@/components/TaskBlock/WorkerTask";

export default {
  name: "Tasks",
  components: {WorkerTask},
  data: () => ({
    taskArray: []
  }),
  computed: {
    ...mapState({
      userId: state => state.user.user.userId
    })
  },
  methods: {
    async updateTaskArray() {
      try {
        this.taskArray = await getTaskArrayByUserId(this.userId)
      } catch (exception) {
        return console.log(exception)
      }
    }
  },
  mounted() {
    this.updateTaskArray()
  }
}
</script>

<style scoped>
.task-view__content {
  padding: 40px 0 50px 60px;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}


.task-view__salutation {
  margin: 0 0 15px 0;

  font-size: 50px;

  color: var(--dark-purple-color);
}

.task-view__description {
  margin: 0 0 80px 0;

  font-size: 35px;

  color: #444444;
}


.task-view__tasks {
  margin: 0 auto;
  width: 60%;
  padding: 20px;

  display: flex;
  flex-direction: column;

  background-color: var(--dark-purple-color);
  box-shadow: 0 5px 10px 4px rgba(44, 46, 67, 0.7);
  border-radius: 6px;
}

.task-view__task {
  margin: 0 0 50px 0;
  overflow: auto;
}


.task-view__image {
  margin: 200px 0 0 0;
  flex: 1 1 auto;
  width: 30%;

  opacity: .8;
}
</style>