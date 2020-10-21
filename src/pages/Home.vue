<template>
  <div class="container-fluid">
    <div class="row">
        <div id="sidebarMenu" class="sidebar col-xs-12 col-md-4 col-lg-3 bg-light">
          <b-collapse v-model="isVisible">
            <sidebar @geoLocationRetrieved="setGeoLocation($event)" />
          </b-collapse>
        </div>
      <div class="col-md-8 ml-sm-auto col-lg-9">
        <Map @toggleSidebar="toggleSidebar()" :geo-location="geoLocation" ></Map>
      </div>
    </div>
  </div>
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
      test: '',
      geoLocation: {},
      setVisible: true,
      windowWidth: 0
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
      return this.windowWidth < 770
    },
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
<style lang="css">
</style>