<template>
  <div class="border-2 border-gray-400 rounded overflow-auto w-[500px]">
    <input v-model="search" type="search" :placeholder="'Search Countries...                  (' +  selectedCountries.length + ' selected)'" class="sticky w-11/12 mx-auto top-0 text-xl pt-3 pb-2 pl-3 border-b-2 border-gray-400 outline-none" />
    <div class="grid grid-cols-3 gap-y-2 w-11/12 py-4 mx-auto">
      <CountryCheckbox v-for="country in filterCountries(search)" @toggle-country="toggleCountry" :country="country" :selectedCountries="selectedCountries" :key="country" />
    </div>
  </div>
</template>

<script>
import CountryCheckbox from './CountryCheckbox.vue';

export default {
  data() {
    return {
      countries: [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
        'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina', 'Burundi',
        'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'CAR', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czechia',
        'Denmark', 'Djibouti', 'Dominica', 
        'Ecuador', 'Egypt', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia',
        'Fiji', 'Finland', 'France',
        'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guyana',
        'Haiti', 'Holy See', 'Honduras', 'Hungary',
        'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Italy',
        'Jamaica', 'Japan', 'Jordan',
        'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, South', 'Kosovo', 'Kuwait', 'Kyrgyzstan',
        'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg',
        'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
        'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway',
        'Oman',
        'Pakistan', 'Palau', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
        'Qatar',
        'Romania', 'Russia', 'Rwanda',
        'Saint Lucia', 'Samoa', 'San Marino', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
        'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu',
        'Uganda', 'Ukraine', 'UK', 'USA', 'Uruguay', 'Uzbekistan',
        'Vanuatu', 'Venezuela', 'Vietnam',
        'Yemen',
        'Zambia', 'Zimbabwe'],
      search: "",
    }
  },
  components: {
    CountryCheckbox
  },
  props: {
    selectedCountries: Array,
  },
  methods: {
    toggleCountry(country) {
      this.$emit('toggle-country', country)
    },
    filterCountries(search) {
      return this.countries.filter((country) => country.toLowerCase().includes(search.toLowerCase()))
    }
  }
}
</script>