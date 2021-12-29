<template>
  <div class="task-info">
    <div class="task-info__content"
         v-if="taskInfo">
      <div class="task-info__task">
        <div class="task-info__worker">
          <div class="task-info__worker-role">
            {{ taskInfo.worker.roleName }}
          </div>
          <div class="task-info__worker-name">
            {{ taskInfo.worker.firstName }}
            {{ taskInfo.worker.lastName }}
          </div>
        </div>
        <div class="task-info__title">
          {{ taskInfo.task.title }}
        </div>
        <div class="task-info__description">
          {{ parsedTaskInfo.description }}
        </div>
        <div class="task-info__data-block">
          <div class="task-info__data">
            <div class="task-info__parameter">
              {{ textResource.issued }}
            </div>
            <div class="task-info__value">
              {{ parsedTaskInfo.createDate }}
              {{ parsedTaskInfo.createTime }}
            </div>
          </div>
          <div class="task-info__data">
            <div class="task-info__parameter">
              {{ textResource.deadline }}
            </div>
            <div class="task-info__value">
              {{ parsedTaskInfo.deadlineDateAndTime }}
            </div>
          </div>
          <div class="task-info__data">
            <div class="task-info__parameter">
              {{ textResource.recurring }}
            </div>
            <div class="task-info__value">
              {{ parsedTaskInfo.recurringStatus }}
            </div>
          </div>
          <div class="task-info__data">
            <div class="task-info__parameter">
              {{ textResource.resultRequired }}
            </div>
            <div class="task-info__value">
              {{ parsedTaskInfo.resultRequiredStatus }}
            </div>
          </div>
          <div class="task-info__data">
            <div class="task-info__parameter">
              {{ textResource.status }}
            </div>
            <div class="task-info__value">
              {{ parsedTaskInfo.doneStatus }}
            </div>
          </div>
        </div>
        <div class="task-info__buttons">
          <MyRectangleButton
            class="task-info__button"
            icon-name="delete"
            :text="textResource.deleteTask"
            @click="deleteModalData.visibilityStatus = true"/>
          <MyRectangleButton
            class="task-info__button"
            icon-name="edit"
            :text="textResource.editTask"/>
        </div>
      </div>
      <div class="task-info__history history">
        <div class="history__title">
          {{ textResource.taskHistory }}
        </div>
        <div class="history__list">
          <div
            class="history__element"
            v-for="(historyNote, i) in selectedTaskHistory"
            :key="i">
            <div class="history__info">
              <div class="history__date">
                {{ getDateAndTimeString(historyNote) }}
              </div>
              <div class="history__status">
                {{ getDoneStatus(historyNote) }}
              </div>
            </div>
            <div class="history__result">
              {{ historyNote.result }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <DeleteModal v-if="deleteModalData.visibilityStatus"
                 :content="deleteModalData.content"
                 @hide="this.deleteModalData.visibilityStatus = false"
                 @delete="sendDeleteTaskRequest"/>
  </div>
</template>

<script>
import MyRectangleButton from "@/components/UI/MyRectangleButton";
import {deleteTask} from "@/assets/js/serverRequest";
import DeleteModal from "@/components/Modal/DeleteModal";
import {mapState, mapActions} from "vuex";
import {parseTaskInfo} from "@/components/TaskBlock/taskLogic";
import {MyDateClass} from "@/assets/js/microLogic";

export default {
  name: "TaskInfo",
  components: {DeleteModal, MyRectangleButton},
  props: {
    taskInfo: Object,
  },
  data: () => ({
    deleteModalData: {
      visibilityStatus: false,
      content: {
        message: "You are about to delete the task and all associated data"
      }
    }
  }),
  computed: {
    ...mapState({
      selectedTaskHistory: state => state.farms.selectedTaskHistory,
      currentLanguage: state => state.language.currentLanguage
    }),
    parsedTaskInfo() {
      return parseTaskInfo(this.taskInfo.task, this.currentLanguage)
    },
    textResource() {
      if (this.currentLanguage === "en") {
        return {
          issued: "Issued:",
          deadline: "Deadline:",
          recurring: "Recurring:",
          resultRequired: "Result required:",
          status: "Status",
          taskHistory: "Task history",
          deleteTask: "Delete task",
          editTask: "Edit task",
        }
      }
      if (this.currentLanguage === "ua") {
        return {
          issued: "Видано:",
          deadline: "Кінцевий термін:",
          recurring: "Повторюване:",
          resultRequired: "Обов'язковий результат:",
          status: "Статус",
          taskHistory: "Історія завдання",
          deleteTask: "Видалити завдання",
          editTask: "Редагувати завдання",
        }
      }
      if (this.currentLanguage === "ru") {
        return {
          issued: "Выдано:",
          deadline: "Конечный срок:",
          recurring: "Повторяемое:",
          resultRequired: "Обязательный результат:",
          status: "Статус",
          taskHistory: "История задания",
          deleteTask: "Удалить задание",
          editTask: "Изменить задание",
        }
      }
    }
  },
  methods: {
    ...mapActions({
      taskUpdated: "farms/taskDeleted"
    }),
    async sendDeleteTaskRequest() {
      try {
        const taskId = this.taskInfo.task.taskId
        await deleteTask(taskId)
      } catch (exception) {
        return console.log(exception)
      }

      this.taskUpdated()
      this.deleteModalData.visibilityStatus = false
    },
    getDateAndTimeString(historyNote) {
      const date = historyNote.date
      const language = this.currentLanguage

      const dateString =
        MyDateClass.getDateStringByDbValue(date, language)
      const timeString =
        MyDateClass.getTimeStringByDbValue(historyNote.time)
      return MyDateClass.getDateAndTimeString(dateString, timeString)
    },
    getDoneStatus(historyNote) {
      const language = this.currentLanguage

      switch (historyNote.inTime) {
        case 0:
          if (language === "ua") {
            return "виконано пізно"
          }
          if (language === "ru") {
            return "выполнено поздно"
          }
          return "done late"
        case 1:
          if (language === "ua") {
            return "виконано вчасно"
          }
          if (language === "ru") {
            return "выполнено вовремя"
          }
          return "done in time"
        case 2:
          if (language === "ua") {
            return "не виконано"
          }
          if (language === "ru") {
            return "не выполнено"
          }
          return "not done"
        default:
          if (language === "ua") {
            return "у процесі"
          }
          if (language === "ru") {
            return "в процессе"
          }
          return "in progress"
      }
    }
  }
}
</script>

<style scoped>
.task-info__content {
  max-height: 90%;

  display: flex;
}


.task-info__task {
  width: 45%;
  margin: 0 5% 0 0;
}


.task-info__worker {
  margin: 0 0 30px 0;

  display: flex;

  font-size: 18px;
  color: #333333;
}

.task-info__worker-role {
  margin: 0 10px 0 0;

  font-weight: 500;
}


.task-info__title {
  margin: 0 0 5px 0;

  font-size: 23px;


  color: #333333;
}

.task-info__description {
  margin: 0 0 20px 0;

  font-size: 18px;

  color: #555;
}


.task-info__data-block {
  margin: 0 0 20px 0;
}

.task-info__data {
  margin: 0 0 8px 0;

  display: flex;

  font-size: 20px;

  color: #333333;
}

.task-info__parameter {
  margin: 0 10px 0 0;
}

.task-info__value {
  color: #555;
}


.task-info__buttons {
  display: flex;
}

.task-info__button {
  margin: 0 30px 0 0;
  height: 50px;

  background-color: var(--dark-purple-color);
  border-radius: 5px;
}

.task-info__button:last-child {
  margin: 0;
}


.task-info__history {
  width: 50%;

  overflow-y: auto;
}


.history__title {
  margin: 0 0 28px 0;

  font-size: 23px;

  color: #333333;
}


.history__element {
  margin: 0 0 4px 0;
  padding: 8px 10px;

  border-radius: 3px;

  cursor: pointer;
  transition: background-color .2s ease;
}

.history__element:hover {
  background-color: #919097;
}


.history__info {
  margin: 0 0 5px 0;

  display: flex;

  font-size: 20px;

  color: #333333;
}

.history__date {
  margin: 0 15px 0 0;
}

.history__status {
  margin: 0 15px 0 0;
}


.history__result {
  font-size: 18px;

  color: #555555;
}
</style>