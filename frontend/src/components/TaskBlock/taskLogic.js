import {MyDateClass} from "@/assets/js/microLogic";

export function parseTaskInfo(task) {
  return {
    description: getDescription(task),
    createDate: getCreateDate(task),
    createTime: getCreateTime(task),
    deadlineDateAndTime: getDeadlineDateAndTime(task),
    recurringStatus: getRecurringStatus(task),
    resultRequiredStatus: getResultRequiredStatus(task)
  }

  function getDescription(task) {
    let description = task.description
    if (description.toUpperCase() === "NULL") {
      description = ""
    }
    return description
  }

  function getCreateDate(task) {
    return MyDateClass.getDateStringByDbValue(
      task.createDate, false)
  }

  function getCreateTime(task) {
    return MyDateClass.getTimeStringByDbValue(task.createTime)
  }

  function getDeadlineDateAndTime(task) {
    const deadlineDate = MyDateClass.getDateStringByDbValue(
      task.deadlineDate, false)
    const deadlineTime = MyDateClass.getTimeStringByDbValue(
      task.deadlineTime)

    return MyDateClass.getDateAndTimeString(deadlineDate, deadlineTime)
  }

  function getRecurringStatus(task) {
    return task.isRecurringStatus ? "YES" : "NO"
  }

  function getResultRequiredStatus(task) {
    return task.resultRequiredStatus ? "YES" : "NO"
  }
}