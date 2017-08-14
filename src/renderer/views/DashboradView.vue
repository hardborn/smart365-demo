<template>
<div>
  <header>Dashborad</header>
  <div>User {{ $route.params.user }}</div>
  <ul>
    <li v-for="customer in customers">
      <input type="button" v-bind:value="customer.customerName"></input>
    </li>
  </ul>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$store.dispatch('getCustomers')
    }
  },
  computed: mapState({
    customers: state => state.Customer.customers
  })

}
</script>
