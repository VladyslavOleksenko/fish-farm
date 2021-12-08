<template>
  <div class="worker-task">
    <div class="worker-task__content">
      <div class="worker-task__title">
        {{ taskInfo.title }}
      </div>
      <div class="worker-task__description">
        {{ description }}
      </div>
      <div class="worker-task__data">
        <div class="worker-task__parameter">Created:</div>
        <div class="worker-task__value">
          {{ createDate }}
          {{ taskInfo.createTime }}
        </div>
      </div>
      <div class="worker-task__data">
        <div class="worker-task__parameter">Deadline:</div>
        <div class="worker-task__value worker-task__deadline">
          {{ deadline }}
        </div>
      </div>
      <div class="worker-task__data">
        <div class="worker-task__parameter">Recurring:</div>
        <div class="worker-task__value">
          {{ recurringStatus }}
        </div>
      </div>
      <div class="worker-task__data">
        <div class="worker-task__parameter">Result required:</div>
        <div class="worker-task__value">
          {{ resultRequiredStatus }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {MyDateClass} from "@/assets/js/microLogic";

export default {
  name: "WorkerTask",
  props: {
    taskInfo: {type: Object, required: true}
  },
  computed: {
    description() {
      if (this.taskInfo.description.toUpperCase() === "NULL") {
        return ""
      }
      return this.taskInfo.description
    },
    createDate() {
      const createDate = this.taskInfo.createDate
      return MyDateClass.getDayAndMonthAndYear(createDate)
    },
    deadlineDate() {
      const deadlineDate = this.taskInfo.deadlineDate
      if (deadlineDate.toUpperCase() === "NULL") {
        return ""
      }
      return MyDateClass.getDayAndMonthAndYear(deadlineDate)
    },
    deadlineTime() {
      const deadlineTime = this.taskInfo.deadlineTime
      if (deadlineTime.toUpperCase() === "NULL") {
        return ""
      }
      return deadlineTime
    },
    deadline() {
      if (!this.deadlineDate && !this.deadlineTime) {
        return "--"
      }

      return this.deadlineDate + " " + this.deadlineTime
    },
    recurringStatus() {
      return this.taskInfo.isRecurringStatus ? "YES" : "NO"
    },
    resultRequiredStatus() {
      return this.taskInfo.resultRequiredStatus ? "YES" : "NO"
    }
  }
}
</script>

<style scoped>
.worker-task__content {
  padding: 10px 20px;
  width: 100%;

  color: #cccccc;
  border-radius: 4px;

  cursor: pointer;
  transition: background-color .2s ease,
  color .2s ease;
}

.worker-task__content:hover {
  color: #ffffff;
  background-color: var(--light-purple-color);
}


.worker-task__title {
  margin: 0 0 5px 0;

  font-size: 22px;
  font-weight: 500;

  color: #eeeeee;
}

.worker-task__description {
  margin: 0 0 15px 0;

  font-size: 20px;
  color: #cccccc;
}


.worker-task__data {
  margin: 0 0 8px 0;

  display: flex;

  font-size: 18px;

  color: #cccccc;
}

.worker-task__parameter {
  margin: 0 10px 0 0;
}

.worker-task__value {
  color: #aaaaaa;
}

.worker-task__deadline {
  color: #aaf;
}
</style>