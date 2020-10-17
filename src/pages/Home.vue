<template>
<b-row align-h="between">
  <b-col sm="12" md="5" lg="4" xl="3" class="shadow-sidebar">
    <sidebar @geoLocationRetrieved="setGeoLocation($event)"></sidebar>
  </b-col>
  <b-col sm="12" md="7" lg="8" xl="9" class="pl-0">
    <Map :geo-location="geoLocation" ></Map>
  </b-col>
</b-row>
</template>

<script>
import Sidebar from '../components/Sidebar'
import Map from '../components/Map'

export default {
  name: 'Home',
  components: {
      Map,
      Sidebar
  },
  data () {
      return {
        geoLocation: {}
      }
  },
  methods: {
    setGeoLocation (geoLocation) {
      this.geoLocation = geoLocation
    }
  }
}
</script>
<style lang="scss">
.shadow-sidebar {
    z-index: 401;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  }
</style>