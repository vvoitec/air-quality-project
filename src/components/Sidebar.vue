<template>
    <div class="sidebar-sticky pt-3">
      <button type="button" class="btn btn-dark" @click="findMe()"> Find Me </button>
      <SearchBox/>
    </div>
<!-- <div> -->
  <!-- <b-row class="text-center">
    <b-col cols="12" class="">
        <button type="button" class="btn btn-dark" @click="findMe()"> Find Me </button>
    </b-col>
  </b-row>
  <b-row>
    <b-col cols="12">
      <search-box/>
    </b-col>
  </b-row>
</div> -->
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
      geoLocation: {},
      aqData: {},
    }
  },
  methods: {
    async findMe () {
      await this.fetchGeoLocationFromNavigator()
      await this.fetchAqData(this.aqData)
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
      let url = `https://api.waqi.info/feed/geo:${geoLocation.lat};${geoLocation.lng}/?token=59b9288df06ffabdbffd3b6f385773a5342bec01`
      const response = await new ApiService(url).get()
      if (response.data.status === 'error') {
        console.error(response.data.data)
        return
      }
      this.aqData = response.data
    }
  }
}
</script>

<style scoped>

</style>
