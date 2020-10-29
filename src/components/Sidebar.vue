<template>
<div>
  <SearchBox
    :geoLocation="geoLocation"
    @searchResult="setSearchResult($event)"
  />
  <div class="text-center">
    <button type="button" class="btn btn-sm btn-dark" @click="findMe()"> Find Me </button>
  </div>
  <transition-group tag="ul" style="height: 40vh; overflow: hidden; overflow-y:scroll;" name="mylist" class="list-group">
    <li
      class="mylist-item list-group-item"
      v-for="item in searchResult" :key="item">
      {{ item.display_name }}
    </li>
  </transition-group>
</div>
</template>

<script>
import ApiService from '../utils/ApiService'
import SearchBox from './SearchBox.vue'
// import Slider from './Slider'

export default {
  name: 'Sidebar',
  components: {
    SearchBox,
    // Slider
  },
  data () {
    return {
      geoLocation: {},
      aqData: {},
      searchResult: [],
      datacollection: null
    }
  },
  watch: {
    searchResult (val) {
      this.$emit('geoLocationRetrieved', {
        lat: val[0].lat,
        lng: val[0].lon
      })
    }
  },
  methods: {
    setSearchResult (searchResult) {
      this.searchResult = searchResult
      console.log(searchResult)
      this.fetchAqData({
        lat:this.searchResult[0].lat,
        lng: this.searchResult[0].lon
      })
      this.$emit('searchResult', this.searchResult)
    },
    async findMe () {
      await this.fetchGeoLocationFromNavigator()
      this.fetchAqData(this.geoLocation)
    },
    async fetchGeoLocationFromNavigator () {
      let pos
      try {
        pos = await new Promise((resolve, reject) => {
          navigator
          .geolocation
          .getCurrentPosition(resolve, reject)
        })
      } catch (e) {
        console.error(e)
        return
      }
      this.geoLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }
      this.$emit('geoLocationRetrieved', this.geoLocation)
    },
    async fetchAqData (geoLocation) {
      let url = `https://api.waqi.info/feed/geo:${geoLocation.lat};${geoLocation.lng}/?token=${process.env.VUE_APP_WAQI_TOKEN}`
      const response = await new ApiService(url).get()
      if (response.data.status === 'error') {
        console.error(response.data.data)
        return
      }
      this.aqData = response.data
      this.$emit('forecastFetched', this.aqData.data.forecast)
    }
  }
}
</script>

<style scoped>
.mylist-item {
  transition: all 1s;
  left: 0;
}

.mylist-enter,
.mylist-leave-to {
  opacity: 0;
  left: -200px;
  transition: 1s;
}

.mylist-leave-active {
  opacity: 0;
  left: -200px;
  transition: 1s;
}

.list-group-item {
  margin-left: 15px;
  margin-right: 0;
}
</style>
