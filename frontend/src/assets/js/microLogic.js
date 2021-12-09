import {getFarm} from "@/assets/js/serverRequest";

export class MyDateClass {
  static months = {
    shortForm: [
      "Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sep", "Oct", "Nov", "Dec"
    ]
  }

  static getShortDate(date) {
    if (typeof date === "string") {
      date = new Date(date)
    }

    const shortMonthForm = this.months.shortForm[date.getMonth()]
    return date.getDate() + " " + shortMonthForm
  }

  static getFullDate(date) {
    if (typeof date === "string") {
      date = new Date(date)
    }

    const year = date.getYear() + 1900
    return this.getShortDate(date) + " " + year
  }

  static getDateStringByDbValue(dbValue, withYear = false) {
    dbValue = parseInt(dbValue)
    if (!dbValue) {
      return ""
    }
    const date = new Date(dbValue)

    if (withYear) {
      return this.getFullDate(date)
    }
    return this.getShortDate(date)
  }

  static getTimeStringByDbValue(dbValue) {
    if (dbValue.toUpperCase() === "NULL") {
      return ""
    }

    return dbValue.substr(0, 5)
  }

  static getDateAndTimeString(dateString, timeString) {
    if (!dateString && !timeString) {
      return "--"
    }
    return dateString + " " + timeString
  }
}