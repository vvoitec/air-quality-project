<template>
  <button
      class="btn-select"
      type="button"
      @click="toggleForecastTypes()"
  >
    <slot>
    </slot>
  </button>
</template>

<script>
export default {
  name: 'SliderButton',
  methods: {
    toggleForecastTypes () {
      this.$emit('toggleForecastTypes')
    }
  }
}
</script>

<style scoped>

</style>