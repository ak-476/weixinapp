import Vue from 'vue'
import Chart from '../../assets/js/chart/Chart.min'
import { mergeOptions } from './options'

export default Vue.extend({
  template: `
    <div>
      <canvas :id="chartId" :width="width" :height="height" ref="canvas"></canvas>
    </div>
  `,

  props: {
    chartId: {
      default: 'doughnut-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    }
  },

  data () {
    return {
      defaultOptions: {
      }
    }
  },

  methods: {
    renderChart (data, options) {
      let chartOptions = mergeOptions(this.defaultOptions, options)

      this._chart = new Chart(
        this.$refs.canvas.getContext('2d'), {
          type: 'doughnut',
          data: data,
          options: chartOptions
        }
      )
      this._chart.generateLegend()
    }
  },
  beforeDestroy () {
    this._chart.destroy()
  }
})
