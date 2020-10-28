<template>
<b-row class="row align-items-center">
    <b-col
        cols="11"
        class="pr-0 slider slide-animation" 
        :class="{'slide-in-out': isChartVisible}">
      <b-card>
        <chart :options="options" :chart-data="datacollection" />
      </b-card>
    </b-col>
    <b-col class="pl-0">
      <span class="btn-slider">
        <button
          type="button"
          class="btn btn-dark btn-narrow btn-primary"
          @click="toggleChart()">
          <i :class="{
            'fa fa-chevron-right fa-lg': isChartVisible,
            'fa fa-chevron-left fa-lg': !isChartVisible
            }"></i> 
        </button>
      </span>
    </b-col>
</b-row>
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
      height: 300,
      isChartVisible: false
    }
  },
  methods: {
    toggleChart () {
      this.isChartVisible = !this.isChartVisible
    }
  }
}
</script>
<style lang="css">
.slider {
    box-shadow: 0px 0px 15px 0.1px rgba(50, 50, 50, 0.44);
}
.btn-slider {
  box-shadow: 0px 0px 15px 0.1px rgba(50, 50, 50, 1);
}

.slide-in-out {
    animation-direction:alternate;
    margin-left: -87%;
    transition: all .5s;
    -webkit-transition: all .5s;

}

.slide-animation {
    -webkit-transition: all .5s;
    transition: all .5s;

}
</style>