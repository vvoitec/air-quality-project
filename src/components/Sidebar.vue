<template>
<div class="pt-2 pl-0 pr-0 ml-0 mr-0">
  <b-card>
    <template #header>
    </template>
  <SearchBox
    :geoLocation="geoLocation"
    @searchResult="setSearchResult($event)"
    @setSearchProgress="setSearchProgress($event)"
  />
  <template #footer>
    <h5 class="text-center">Enter an address or press the button:</h5>
    <div class="text-center mb-2">
      <button
        type="button"
        class="btn btn-dark"
        @click="findMe()">
          <b-icon icon="geo-fill" aria-hidden="true"></b-icon>
          Find Me
      </button>
    </div>
    <b-progress height="2px" variant="dark" :value="searchProgress"></b-progress>
  </template>
  </b-card>
  <transition-group tag="ul" class="address-list list-group" name="address-list">
    <b-list-group-item
      button
      class="address-list-item"
      @click="selectLocation(index)"
      v-for="(item, index) in searchResult" :key="index">
      {{ item['display_name'] }}
    </b-list-group-item>
  </transition-group>
  
</div>
</template>

<script>
import ApiService from '../utils/ApiService'
import SearchBox from './SearchBox.vue'

export default {
  name: 'Sidebar',
  components: {
    SearchBox
  },
  data () {
    return {
      searchProgress: 0,
      geoLocation: {},
      aqData: {},
      searchResult: [],
      datacollection: null
    }
  },
  watch: {
  },
  methods: {
    setSearchProgress (progress) {
      this.searchProgress = progress
    },
    setSearchResult (searchResult) {
      this.searchResult = searchResult
      this.selectLocation()
    },
    selectLocation (index = 0) {
      this.fetchAqData({
        lat: this.searchResult[index].lat,
        lng: this.searchResult[index].lon
      })
      this.$emit('geoLocationRetrieved', {
        lat: this.searchResult[index].lat,
        lng: this.searchResult[index].lon
      })
    },
    async findMe () {
      await this.fetchGeoLocationFromNavigator()
      await this.fetchAqData(this.geoLocation)
    },
    async fetchGeoLocationFromNavigator () {
      this.setSearchProgress(0)
      try {
        const pos = await new Promise((resolve, reject) => {
          navigator
          .geolocation
          .getCurrentPosition(resolve, reject)
        })
        this.setSearchProgress(100)
        this.geoLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        this.$emit('geoLocationRetrieved', this.geoLocation)
      } catch (e) {
        console.error(e)
      }
    },
    async fetchAqData (geoLocation) {
      this.$emit('isLoadingAqData')
      let url = `https://api.waqi.info/feed/geo:${geoLocation.lat};${geoLocation.lng}/?token=${process.env.VUE_APP_WAQI_TOKEN}`
      const response = await new ApiService(url).get()
      if (response.data.status === 'error') {
        console.error(response.data.data)
        return
      }
      this.aqData = response.data
      this.$emit('isLoadingAqData')
      this.$emit('forecastFetched', this.aqData.data.forecast.daily)
    }
  }
}
</script>

<style scoped>
.address-list-item {
  margin-left: 0;
  transition: all 0.75s;
  left: 0;
}

.address-list-enter,
.address-list-leave-to {
  left: -300px;
}

.address-list-leave-active {
  left: -300px;
}

.list-group-item {
  padding-left: 2rem;
  margin-left: 0;
  margin-right: 0;
}
</style>
