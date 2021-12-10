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
  options: {}
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
  options: {}
}

const poolChartConfig = {
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
  options: {}
}


export function startup() {
  const taskChartEl = document.querySelector("#task-chart")
  const workerChartEl = document.querySelector("#worker-chart")
  const poolChartEl = document.querySelector("#pool-chart")

  const taskChartCtx = taskChartEl.getContext("2d")
  const workerChartCtx = workerChartEl.getContext("2d")
  const poolChartCtx = poolChartEl.getContext("2d")

  const taskChart = new Chart(taskChartCtx, taskChartConfig)
  const workerChart = new Chart(workerChartCtx, workerChartConfig)
  const poolChart = new Chart(poolChartCtx, poolChartConfig)
}

export function changeChartDate(chartName, chartData) {
  switch (chartName) {
    case "task":
      return taskChartConfig.data.datasets[0].data = chartData
    case "worker":
      return workerChartConfig.data.datasets[0].data = chartData
    case "pool":
      return poolChartConfig.data.datasets[0].data = chartData
  }
}