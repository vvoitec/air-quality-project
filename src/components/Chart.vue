<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],

  props: ['options', 'chartData'],

  mounted () {
      this.renderChart(this.chartData, this.options)
  },

  watch: {
    watch: {
      chartData () {
        this.updateChart()
      }
    }
  },

  methods: {
    updateChart () {
      this.$data._chart.update();
    },
  }
}
</script>
