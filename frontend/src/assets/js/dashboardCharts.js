import Chart from 'chart.js/auto';


const labelArray = [
  'In progress',
  'Done in time',
  'Done late',
  'Not done'
]
const backgroundColorArray = [
  'rgb(152,198,124)',
  'rgb(101,140,77)',
  'rgb(205,160,90)',
  'rgb(219,105,93)'
]

const taskChartConfig = {
  type: 'doughnut',
  data: {
    labels: labelArray,
    datasets: [{
      label: 'My First Dataset',
      data: [10, 300, 50, 100],
      backgroundColor: backgroundColorArray,
      hoverOffset: 4
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Task efficiency',
        font: {
          size: 20,
          family: 'Montserrat',
        },
        color: "#333"
      },
      legend: {
        labels: {
          font: {
            size: 18
          },
          color: "#555"
        }
      }
    }
  }
}

const workerChartConfig = {
  type: 'doughnut',
  data: {
    labels: labelArray,
    datasets: [{
      label: 'My First Dataset',
      data: [10, 300, 50, 100],
      backgroundColor: backgroundColorArray,
      hoverOffset: 4
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Worker efficiency',
        font: {
          size: 20,
          family: 'Montserrat',
        },
        color: "#333"
      },
      legend: {
        labels: {
          font: {
            size: 18
          },
          color: "#555"
        }
      }
    }
  }
}


let taskChart
let workerChart

export function startup() {
  const taskChartEl = document.querySelector("#task-chart")
  const workerChartEl = document.querySelector("#worker-chart")
  const taskChartCtx = taskChartEl.getContext("2d")
  const workerChartCtx = workerChartEl.getContext("2d")

  taskChart = new Chart(taskChartCtx, taskChartConfig)
  workerChart = new Chart(workerChartCtx, workerChartConfig)
}

export function changeChartDate(chartName, chartData) {
  switch (chartName) {
    case "task":
      taskChartConfig.data.datasets[0].data = chartData
      const taskChartWrapperEl =
        document.querySelector("#dashboard__chart-wrapper-task")
      taskChartWrapperEl.style.visibility = "visible"
      return taskChart.update()
    case "worker":
      workerChartConfig.data.datasets[0].data = chartData
      const workerChartWrapperEl =
        document.querySelector("#dashboard__chart-wrapper-worker")
      workerChartWrapperEl.style.visibility = "visible"
      return workerChart.update()
  }
}