import DoughnutChart from './Doughnut'

export default DoughnutChart.extend({
  props: ["data", "labels"],
  // mounted () {
  //   this.renderChart(this.data, this.options)
  // }
  mounted () {
    this.renderChart({
      //labels: this.labels,
      datasets: [
        {
          backgroundColor: [
            '#4bbba7',
            '#a6232d',
            '#c4e0fc',
            '#1b5186',
            '#042546',
            '#34802c',
            '#c45f05'
          ],
          data: this.data
        }
      ]
    })
  }
})
