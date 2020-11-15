<template>
  <b-row class="pointer-none align-items-center" v-if="!isMobile">
    <b-col cols="11" class="pr-0">
      <b-overlay :show="isLoadingAqData">
        <div class="h-50px"
             :class="{'pointer-auto': !isLoadingAqData}">
          <slider-button
              v-for="(item, index) in buttonLabels"
              :key="index"
              @toggleForecastTypes="toggleForecastTypes(index)">
            {{ item[0] }}<sub>{{ item[1] }}</sub>
          </slider-button>
        </div>
        <b-card class="pointer-auto">
          <chart :options="options" :chart-data="datacollection" />
        </b-card>
      </b-overlay>
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
import SliderButton from '@/components/SliderButton'

export default {
  name: 'Slider',
  props: ['data', 'isMobile', 'isChartVisible', 'isLoadingAqData'],
  components: {
    Chart,
    SliderButton
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
      filteredDailyForecast: [],
      buttonLabels: [ ['O', '3'], ['PM', '10'], ['PM', '25'], ['UV', 'i'] ]
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
