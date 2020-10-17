<template>
  <b-row>
    <b-col style="height: 100vh;">
        <l-map
          ref="map"
          style="height: 100%; width: 100%"
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
        </l-map>
    </b-col>
  </b-row>
</template>

<script>
import {LMap, LTileLayer, LMarker} from 'vue2-leaflet'
// import ApiService from '../../utils/ApiService'

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  props: ['geoLocation'],
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
      this.addMarker(val)
      this.setZoom()
    }
  },
  methods: {
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
