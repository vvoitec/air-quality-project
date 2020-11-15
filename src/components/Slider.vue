<template>
  <b-row class="pointer-none align-items-center" v-if="!isMobile">
    <b-col cols="11" class="pr-0">
      <div class="pointer-auto" style="height: 50px;">
        <button
            class="btn-select"
            type="button"
            @click="toggleForecastTypes(0)"
        >
          O <sub>3</sub>
          {{forecastTypes[0]}}
        </button>
        <button
            class="btn-select"
            type="button"
            @click="toggleForecastTypes(1)"
        >
          PM <sub>10</sub>
          {{forecastTypes[1]}}
        </button>
        <button
            class="btn-select"
            type="button"
            @click="toggleForecastTypes(2)"
        >
          PM <sub>25</sub>
          {{forecastTypes[2]}}
        </button>
        <button
            class="btn-select"
            type="button"
            @click="toggleForecastTypes(3)"
        >
          UV <sub>i</sub>
          {{forecastTypes[3]}}
        </button>
      </div>
      <b-card class="pointer-auto">
        <chart :options="options" :chart-data="datacollection" />
      </b-card>
    </b-col>
    <b-col cols="auto" class="pl-0">
      <div class="btn-slider pointer-auto">
        <button
            type="button"
            class="btn btn-dark btn-narrow btn-primary"
            @click="toggleChart()">
          <b-icon v-if="isChartVisible" icon="chevron-left" aria-hidden="true"></b-icon>
          <b-icon v-else icon="chevron-right" aria-hidden="true"></b-icon>
        </button>
      </div>
    </b-col>
  </b-row>

    <div v-else>
      <b-col cols="12" class="pl-0 pr-0">
        <b-card class="pointer-auto">
          <chart :options="options" :chart-data="datacollection" />
        </b-card>
      </b-col>
      <b-col cols="12" class="pl-0 text-center">
        <div class="d-inline-block btn-slider pointer-auto">
          <button
              type="button"
              class="btn btn-dark btn-narrow-sm btn-primary"
              @click="toggleChart()">
            <b-icon v-if="!isChartVisible" icon="chevron-up" aria-hidden="true"></b-icon>
            <b-icon v-else icon="chevron-down" aria-hidden="true"></b-icon>
          </button>
        </div>
      </b-col>
    </div>
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
    isDataFetched () {
      return !!Object.keys(this.data).length
    },
    dailyLabels () {
      if (this.isDataFetched) {
        return Object.values(this.data)[0].map(entry => {
          return entry.day
        })
      } else return {}
    },
    datacollection () {
      if (this.isDataFetched) {
        return {
          labels: this.dailyLabels,
          datasets: this.filteredDailyForecast
        }
      } else return {}
    }
  },

  watch: {
    data (val) {
      this.dailyForecast = Object.keys(val).map((entry, index) => {
        return {
          fill: false,
          label: entry,
          data: this.data[entry].map(entry => entry.avg),
          borderColor: this.colors[index]
        }
      })
      this.setFilteredDailyForecast()
    }
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
      forecastTypes: [true, true, true, true],
      test: true,
      dailyForecast: [],
      filteredDailyForecast: []
    }
  },
  methods: {
    toggleForecastTypes (index) {
      this.forecastTypes[index] = !this.forecastTypes[index]
      this.setFilteredDailyForecast()
      this.$forceUpdate()
    },
    setFilteredDailyForecast () {
      this.filteredDailyForecast =
          this.dailyForecast.filter((entry, i) => this.forecastTypes[i])
    },
    toggleChart () {
      this.$emit('toggleChart')
    }
  }
}
</script>
