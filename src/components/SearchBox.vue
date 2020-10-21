<template>
<!-- <form class="needs-validation" novalidate>
<div class="form-row justify-content-center">
  <div class="col-md-8 col-sm-12">
    <select class="custom-select">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
</div>
</form> -->
<b-row>
  <b-col cols="12">
    <b-form @submit="submit">
      <b-col cols="12">
        <b-form-group
        label="Country: "
        label-for="country_input"
        class="w-label"
        >
          <b-form-select
          id="country_input"
          v-debounce:600ms="search"
          v-model="adress.country"
          :options="countryOptions"/>
        </b-form-group>
      </b-col>
      <b-col sm="12">
        <label class="w-label" for="zipcode_input">Zip code:</label>
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
        <label class="w-label" for="city_input">City:</label>
          <b-form-input
            autoComplete="off"
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
      return this.searchResult ? Boolean(this.searchResult.length) : false
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
