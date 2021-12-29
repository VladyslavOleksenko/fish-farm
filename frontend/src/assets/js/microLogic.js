export class MyDateClass {
  static months = {
    shortForm: {
      en: [
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
      ],
      ua: [
        "Січ", "Лют", "Берез", "Квіт",
        "Трав", "Черв", "Лип", "Серп",
        "Верес", "Жовт", "Листоп", "Груд"
      ],
      ru: [
        "Янв", "Фев", "Мар", "Апр",
        "Мая", "Июня", "Июля", "Авг",
        "Сен", "Окт", "Ноя", "Дек"
      ],
    }
  }

  static getShortDate(date, language) {
    if (typeof date === "string") {
      date = new Date(date)
    }

    const monthIndex = date.getMonth()
    let shortMonthForm = this.months.shortForm.en[monthIndex]
    if (language === "ua") {
      shortMonthForm = this.months.shortForm.ua[monthIndex]
    }
    if (language === "ru") {
      shortMonthForm = this.months.shortForm.ru[monthIndex]
    }

    return date.getDate() + " " + shortMonthForm
  }

  static getFullDate(date, language) {
    if (typeof date === "string") {
      date = new Date(date)
    }

    const year = date.getYear() + 1900
    return this.getShortDate(date, language) + " " + year
  }

  static getDateStringByDbValue(dbValue, language) {
    dbValue = parseInt(dbValue)
    if (!dbValue) {
      return ""
    }
    const date = new Date(dbValue)
    const thisYearStatus = date.getFullYear() === new Date().getFullYear()

    if (thisYearStatus) {
      return this.getShortDate(date, language)
    }
    return this.getFullDate(date, language)
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