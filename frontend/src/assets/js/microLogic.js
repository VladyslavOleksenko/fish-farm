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

  static getDateStringByDbValue(dbValue) {
    dbValue = parseInt(dbValue)
    if (!dbValue) {
      return ""
    }
    const date = new Date(dbValue)
    const thisYearStatus = date.getFullYear() === new Date().getFullYear()

    if (thisYearStatus) {
      return this.getShortDate(date)
    }
    return this.getFullDate(date)
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