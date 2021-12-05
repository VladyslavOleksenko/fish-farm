<template>
  <div class="task">
    <div class="task__content">
      <div class="task__icon-wrapper">
        <MyIcon class="task__icon"
                icon-name="time"
                path-color="#888"/>
      </div>
      <div class="task__body">
        <div class="task__deadline"
             v-if="deadlineDayAndMonth">
          <div class="task__deadline-date">
            {{ deadlineDayAndMonth }}
          </div>
          <div class="task__deadline-time">
            {{ deadlineTime }}
          </div>
        </div>
        <div class="task__title">{{ task.title }}</div>
        <div class="task__status">done</div>
      </div>
    </div>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";
import {MyDateClass} from "@/assets/js/microLogic"

export default {
  name: "Task",
  components: {MyIcon},
  props: {
    task: {type: Object, required: true}
  },
  computed: {
    deadlineDayAndMonth() {
      if (this.task.deadlineDate.toUpperCase() === "NULL") {
        return ""
      }
      return MyDateClass.getDayAndMonth(this.task.deadlineDate)
    },
    deadlineTime() {
      if (this.task.deadlineTime.toUpperCase() === "NULL") {
        return ""
      }
      return this.task.deadlineTime
    }
  }
}
</script>

<style scoped>
.task__content {
  padding: 10px;
  min-height: 40px;

  display: flex;

  border-radius: 4px;

  transition: background-color .2s ease;
}

.task__content:hover {
  background-color: var(--dark-purple-color);
}


.task__icon-wrapper {
  width: 30px;
  height: 30px;
  padding: 5px 0 0;
  margin: 0 20px 0 0;
}

.task__icon {
  width: 30px;
  height: 30px;
}


.task__deadline {
  margin: 0 0 5px 0;

  display: flex;

  font-size: 16px;
}

.task__deadline-date {
  margin: 0 10px 0 0;
  color: #cccccc;
}

.task__deadline-time {
  color: #aaa;
}


.task__title {
  margin: 0 0 5px 0;

  font-size: 18px;
}

.task__status {
  font-size: 18px;

  color: #aaf;
}


</style>