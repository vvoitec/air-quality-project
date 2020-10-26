<template>
<b-card class="slider">
  <chart :options="options" :chart-data="datacollection" />
</b-card>
</template>

<script>
import Chart from './Chart'

export default {
  name: 'Slider',
  props: ['data'],
  components: {
    Chart
  },
  computed: {
    datacollection () {
      if (this.data.daily) {
          return {
          labels: this.data.daily['o3'].map(entry => entry.day),
          datasets: Object.values(this.data.daily).map((entry, index) => {
            return {
              fill: false,
              label: Object.keys(this.data.daily)[index],
              data: entry.map(day => day.avg),
              borderColor: this.colors[index]
            }
          })
        }
      } else return {}
    }
  },
  data () {
    return {
      colors: ['#28A745', '#FFC107', '#DC3545', '#17A2B8'],
      options: {
        maintainAspectRatio: false,
        responsive: true
      },
      height: 300
      // datacollection: {
      //   labels: [1, 2, 3],
      //   datasets: [
      //     { label: 1, data: [5, 6, 1] },
      //     { label: 2, data: [2, 8, 5] },
      //     { label: 3, data: [5, 1, 7] },
      //     { label: 4, data: [0, 2, 6] },
      //   ]
      // }
    }
  }
}
</script>
