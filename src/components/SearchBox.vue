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
        v-model="adress.country"
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
          v-model="adress.zipCode"
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
          v-model="adress.city"
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
      adress: {
        zipCode: '',
        country: '',
        city: ''
      }
    }
  },
  computed: {
    isAdressValid () {
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
          this.adress.zipCode = response.data.address.postcode
          this.adress.city = response.data.address.city
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
  //   adress: {
  //     deep: true,
  //     handler (val) {
  //       console.log(val)
  //     }
  //   }
  // },
  methods: {
    search () {
      this.searchByAdress(this.adress)
    },
    submit () {
    },
    async searchByAdress (adress) {
      let url = `https://nominatim.openstreetmap.org/search.php?format=jsonv2`
      if (adress.country) {
        url += `&country=${adress.country}`
      }
      if (adress.zipCode) {
        url += `&postalcode=${adress.zipCode}`
      }
      if (adress.city) {
        url += `&city=${adress.city}`
      }
      if (adress.street) {
        url += `&street=${adress.street}`
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
