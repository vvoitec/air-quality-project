<template>
<b-row class="align-items-center" v-if="!isMobile">
  <b-col
      cols="11"
      class="pr-0 slider slide-animation" 
      :class="{'slide-in-out': !isChartVisible}">
    <b-card>
      <chart :options="options" :chart-data="datacollection" />
    </b-card>
  </b-col>
  <b-col cols="1" class="pl-0">
    <span class="btn-slider">
      <button
        type="button"
        class="btn btn-dark btn-narrow btn-primary"
        @click="toggleChart()">
        <b-icon v-if="isChartVisible" icon="chevron-left" aria-hidden="true"></b-icon>
        <b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
      </button>
    </span>
  </b-col>
</b-row>

<div v-else>
  <b-col
      cols="12"
      class="pl-0 pr-0 slider slide-animation" 
      :class="{'slide-in-out-sm': !isChartVisible}">
    <b-card>
      <chart :options="options" :chart-data="datacollection" />
    </b-card>
  </b-col>
  <b-col cols="12" class="pl-0 text-center">
    <span class="btn-slider">
      <button
        type="button"
        class="btn btn-dark btn-narrow-sm btn-primary"
        @click="toggleChart()">
        <b-icon v-if="isChartVisible" icon="chevron-up" aria-hidden="true"></b-icon>
        <b-icon v-else icon="chevron-down" aria-hidden="true"></b-icon>
      </button>
    </span>
  </b-col>
</div>
</template>

<script>
import Chart from './Chart'

export default {
  name: 'Slider',
  props: ['data', 'isMobile'],
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
      isChartVisible: true
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
    padding-left: 0;
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

  .slide-in-out-sm {
    animation-direction:alternate;
    margin-top: -430px;
    transition: all .5s;
    -webkit-transition: all .5s;
}

.slide-animation {
    -webkit-transition: all .5s;
    transition: all .5s;

}
</style>