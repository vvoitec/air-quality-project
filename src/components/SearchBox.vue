<template>
<b-row>
  <b-col class="ml-3" cols="12">
    <b-form @submit="submit">
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
            type="text"
            id="zipcode_input"
            v-model="adress.zipCode"
            v-debounce:600ms="search"
          ></b-form-input>
      </b-col>
      <b-col cols="12">
        <label for="city_input">City:</label>
          <b-form-input
            type="text"
            id="city_input"
            v-debounce:600ms="search"
            v-model="adress.city"
          ></b-form-input>
      </b-col>
    </b-form>
  </b-col>
  <b-col cols="12">
    {{ isAdressValid }}
  </b-col>
</b-row>
</template>

<script>
import ApiService from '../utils/ApiService'

export default {
  name: 'SearchBox',
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
      if (this.searchResult) {
        return Boolean(this.searchResult.length)
      } else return false
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
      let url
      url = `https://nominatim.openstreetmap.org/search.php?format=jsonv2`
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
