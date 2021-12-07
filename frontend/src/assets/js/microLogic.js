export class MyDateClass {
  static months = {
    shortForm: [
      "Jan", "Feb", "Mar", "Apr",
      "May", "Jun", "Jul", "Aug",
      "Sep", "Oct", "Nov", "Dec"
    ]
  }

  static getDayAndMonth(date) {
    if (typeof date === "string") {
      date = new Date(date)
    }

    const shortMonthForm = this.months.shortForm[date.getMonth()]
    return date.getDate() + " " + shortMonthForm
  }

  static getDayAndMonthAndYear(date) {
    if (typeof date === "string") {
      date = new Date(date)
    }

    const year = date.getYear() + 1900
    return this.getDayAndMonth(date) + " " + year
  }
}