<template>
  <div class="container-fluid">
    <b-row>
      <b-col
        xs="12" md="4" lg="3"
        id="sidebarMenu"
        class="sidebar bg-light">
          <b-collapse v-model="isVisible">
            <sidebar
            @geoLocationRetrieved="setGeoLocation($event)"
            @forecastFetched="setForecast($event)" />
          </b-collapse>
      </b-col>
      <b-col md="8" lg="9">
        <b-col
          xl="7" lg="8" md="10" sm="12"
          :class="{'chart-visible': !isChartVisible}"
          class="slide-animation chart-container">
          <Slider
            :is-chart-visible="isChartVisible"
            @toggleChart="toggleChart()"
            :data="forecast"
            :is-mobile="isMobile" />
        </b-col>
        <Map
        @toggleSidebar="toggleSidebar()"
        :geo-location="geoLocation" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Map from '../components/Map'
import Slider from '../components/Slider'

export default {
  name: 'Home',
  components: {
    Map,
    Sidebar,
    Slider
  },
  data () {
    return {
      geoLocation: {},
      setVisible: true,
      windowWidth: 0,
      forecast: {},
      isChartVisible: true
    }
  },

  computed: {
    isVisible: {
      get () {
        if (this.isMobile) return this.setVisible
        else return true
      },
      set (val) {
        this.setVisible = val
      }
    },
    isMobile () {
      return this.windowWidth < 768
    }
  },

  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth)
      //Init
      this.getWindowWidth()
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth)
  },

  methods: {
    toggleChart () {
      this.isChartVisible = !this.isChartVisible
    },

    setForecast (forecast) {
      this.forecast = forecast
    },

    getWindowWidth () {
        this.windowWidth = document.documentElement.clientWidth
    },

    toggleSidebar () {
      this.isVisible = !this.isVisible
    },

    setGeoLocation (geoLocation) {
      this.geoLocation = geoLocation
    }
  }
}
</script>
<style lang="css" scoped>
.slide-animation {
  -webkit-transition: all .5s;
  transition: all .5s;
}

.chart-visible {
  transform: translateX(-93%);
}

.chart-container {
  z-index: 401;
  bottom: 0;
  position: absolute;
  margin-left: 0;
  padding: 0;
}

@media only screen and (max-width: 770px) {
  .chart-container {
    transform: translateY(-43vh);
  }

  .chart-visible {
    transform: translateY(-93vh);
  }
}
</style>
