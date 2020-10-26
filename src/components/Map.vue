<template>
  <l-map
    ref="map"
    style="height: 100vh; width: 100%"
    :zoom="zoom"
    :center="center"
    :inertia="true"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated(currentPosition)"
    @update:bounds="boundsUpdated"
  >
    <template v-if="markers.length > 0">
      <template v-for="(marker, index) in markers">
        <l-marker :lat-lng="marker" :key="index"></l-marker>
      </template>
    </template>
    <l-tile-layer :url="url"></l-tile-layer>
    <l-control position="topright" >
      <div class="d-md-none">
        <button
            class="btn btn-dark"
            @click="toggleSidebar()"
            type="button"
        ><i class="fa fa-bars fa-lg"></i></button>
      </div>
    </l-control>
  </l-map>
</template>

<script>
import {LMap, LTileLayer, LMarker, LControl} from 'vue2-leaflet'
// import ApiService from '../../utils/ApiService'

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControl
  },
  props: ['geoLocation', 'isMobile'],
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [47.413220, -1.219482],
      bounds: null,
      currentPosition: {},
      map: {},
      markers: [],
      data: {}
    }
  },
  watch: {
    'geoLocation' (val) {
      this.currentPosition = val
      this.center = [val.lat, val.lng]
      this.markers = []
      this.addMarker(val)
      this.setZoom()
    }
  },
  methods: {
    toggleSidebar () {
      this.$emit('toggleSidebar')
      this.isVisible = !this.isVisible
    },
    zoomUpdated (zoom) {
      this.zoom = zoom
    },
    centerUpdated (center) {
      this.center = center
    },
    boundsUpdated (bounds) {
      this.bounds = bounds
    },

    addMarker (position) {
      this.markers.push(position)
    },
    setZoom () {
      this.zoom = 12
    }
  }
}
</script>

<style lang="scss">
</style>
