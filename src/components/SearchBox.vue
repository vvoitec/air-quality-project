<template>
  <b-form @submit="submit">
    <b-card class="searchbox">
    <b-col cols="12">
      <b-form-group
      label="Country: "
      label-for="country_input"
      >
        <b-form-select
        id="country_input"
        v-debounce:600ms="search"
        v-model="address.country"
        :options="countryOptions"/>
      </b-form-group>
    </b-col>
    <b-col sm="12">
      <label for="zipcode_input">Zip code:</label>
        <b-form-input
          autoComplete="off"
          class="active"
          type="text"
          id="zipcode_input"
          v-model="address.zipCode"
          v-debounce:600ms="search"
        ></b-form-input>
    </b-col>
    <b-col cols="12">
      <label for="city_input">City:</label>
        <b-form-input
          autoComplete="off"
          type="text"
          id="city_input"
          v-debounce:600ms="search"
          v-model="address.city"
        ></b-form-input>
    </b-col>
    </b-card>
  </b-form>
</template>

<script>
import ApiService from '../utils/ApiService'

export default {
  name: 'SearchBox',
  props: ['geoLocation'],
  data () {
    return {
      countryOptions: [],
      searchResult: [],
      address: {
        zipCode: '',
        country: '',
        city: ''
      }
    }
  },
  computed: {
    isaddressValid () {
      return this.searchResult ? Boolean(this.searchResult.length) : false
    }
  },
  watch: {
    geoLocation: {
      async handler (val) {
        let url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${val.lat}&lon=${val.lng}`
        const response = await new ApiService(url).get()
        console.log(await response.data)
        try {
          this.address.zipCode = response.data.address.postcode
          this.address.city = response.data.address.city
          this.$emit('searchResult', [response.data])
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  created () {
    this.fetchCountryOptions()
    // this.searchByZipCode()
  },
  // watch: {
  //   address: {
  //     deep: true,
  //     handler (val) {
  //       console.log(val)
  //     }
  //   }
  // },
  methods: {
    search () {
      this.searchByAddress(this.address)
    },
    submit () {
    },
    async searchByAddress (address) {
      let url = `https://nominatim.openstreetmap.org/search.php?format=jsonv2`
      if (address.country) {
        url += `&country=${address.country}`
      }
      if (address.zipCode) {
        url += `&postalcode=${address.zipCode}`
      }
      if (address.city) {
        url += `&city=${address.city}`
      }
      if (address.street) {
        url += `&street=${address.street}`
      }
      const response = await new ApiService(url).get()
      this.searchResult = response.data
      this.$emit('searchResult', response.data)
    },
    async fetchCountryOptions () {
      const response = await new ApiService(
          `https://restcountries.eu/rest/v2/all?fields=name`
          ).get()
      this.countryOptions = response.data.map(country => country.name)
    }
  }
}
</script>
