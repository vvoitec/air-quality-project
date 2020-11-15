<template>
  <b-row class="align-items-center" v-if="!isMobile">
    <b-col cols="11" class="pr-0">
      <div style="height: 50px;">
        <button
            class="btn-select"
            type="button"
            @click="toggleForecastTypes('o3')"
        >
          O <sub>3</sub>
          {{forecastTypes[0]}}
        </button>
        <button
            class="btn-select"
            type="button"
            @click="toggleForecastTypes('pm10')"
        >
          PM <sub>10</sub>
          {{forecastTypes[1]}}
        </button>
        <button
            class="btn-select"
            type="button"
            @click="toggleForecastTypes('pm25')"
        >
          PM <sub>25</sub>
          {{forecastTypes[2]}}
        </button>
        <button
            class="btn-select"
            type="button"
            @click="toggleForecastTypes('uvi')"
        >
          UV <sub>i</sub>
          {{forecastTypes[3]}}
        </button>
      </div>
      <b-card>
        <chart :options="options" :chart-data="datacollection" />
      </b-card>
    </b-col>
    <b-col cols="auto" class="pl-0">
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

  <!--  <div v-else>-->
  <!--    <b-col cols="12" class="pl-0 pr-0 slider">-->
  <!--      <b-card>-->
  <!--        <chart :options="options" :chart-data="datacollection" />-->
  <!--      </b-card>-->
  <!--    </b-col>-->
  <!--    <b-col cols="12" class="pl-0 text-center">-->
  <!--      <span class="btn-slider">-->
  <!--        <button-->
  <!--            type="button"-->
  <!--            class="btn btn-dark btn-narrow-sm btn-primary"-->
  <!--            @click="toggleChart()">-->
  <!--          <b-icon v-if="isChartVisible" icon="chevron-up" aria-hidden="true"></b-icon>-->
  <!--          <b-icon v-else icon="chevron-down" aria-hidden="true"></b-icon>-->
  <!--        </button>-->
  <!--      </span>-->
  <!--    </b-col>-->
  <!--  </div>-->
</template>

<script>
import Chart from './Chart'

export default {
  name: 'Slider',
  props: ['data', 'isMobile', 'isChartVisible'],
  components: {
    Chart
  },
  computed: {
    datacollection () {
      return {}
    }
    // datacollection () {
    //   if (this.data.daily) {
    //       return {
    //       labels: this.data.daily['o3'].map(entry => entry.day),
    //       datasets: Object.values(this.data.daily).map((entry, index) => {
    //         return {
    //           fill: false,
    //           label: Object.keys(this.data.daily)[index],
    //           data: entry.map(day => day.avg),
    //           borderColor: this.colors[index]
    //         }
    //       })
    //     }
    //   } else return {}
    // }
  },

  watch: {
  },

  data () {
    return {
      testData: true,
      forecastData: [],
      colors: ['#28A745', '#FFC107', '#DC3545', '#17A2B8'],
      options: {
        maintainAspectRatio: false,
        responsive: true
      },
      height: 300,
      forecastTypes: [true, true, true, true]
    }
  },
  methods: {
    toggleForecastTypes (index) {
      switch (index) {
        case 'o3':
          this.forecastTypes[0] = !this.forecastTypes[0];
          break;
        case 'pm10':
          this.forecastTypes[1] = !this.forecastTypes[1];
          break;
        case 'pm25':
          this.forecastTypes[2] = !this.forecastTypes[2];
          break;
        case 'uvi':
          this.forecastTypes[3] = !this.forecastTypes[3];
          break;

      }
    },
    toggleChart () {
      this.$emit('toggleChart')
    }
  }
}
</script>
