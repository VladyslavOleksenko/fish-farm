import {MyDateClass} from "@/assets/js/microLogic";

export function parseTaskInfo(task, language) {
  return {
    description: getDescription(task),
    createDate: getCreateDate(task, language),
    createTime: getCreateTime(task),
    deadlineDateAndTime: getDeadlineDateAndTime(task, language),
    recurringStatus: getRecurringStatus(task, language),
    resultRequiredStatus: getResultRequiredStatus(task, language),
    doneStatus: getDoneStatus(task, language)
  }

  function getDescription(task) {
    let description = task.description
    if (description.toUpperCase() === "NULL") {
      description = ""
    }
    return description
  }

  function getCreateDate(task, language) {
    return MyDateClass.getDateStringByDbValue(
      task.createDate, language)
  }

  function getCreateTime(task) {
    return MyDateClass.getTimeStringByDbValue(task.createTime)
  }

  function getDeadlineDateAndTime(task, language) {
    const deadlineDate = MyDateClass.getDateStringByDbValue(
      task.deadlineDate, language)
    const deadlineTime = MyDateClass.getTimeStringByDbValue(
      task.deadlineTime)

    return MyDateClass.getDateAndTimeString(deadlineDate, deadlineTime)
  }

  function getRecurringStatus(task, language) {
    if (language === "ua") {
      return task.isRecurringStatus ? "ТАК" : "НІ"
    }
    if (language === "ru") {
      return task.isRecurringStatus ? "ДА" : "НЕТ"
    }
    return task.isRecurringStatus ? "YES" : "NO"
  }

  function getResultRequiredStatus(task, language) {
    if (language === "ua") {
      return task.resultRequiredStatus ? "ТАК" : "НІ"
    }
    if (language === "ru") {
      return task.resultRequiredStatus ? "ДА" : "НЕТ"
    }
    return task.resultRequiredStatus ? "YES" : "NO"
  }

  function getDoneStatus(task, language) {
    switch (task.inTime) {
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