<template lang="html">
  <div class="">
    <div class="client">
      <ul>
        <li v-for="customer in customers">
          <input type="button" v-bind:value="customer.customerName" name="Login"></input>
        </li>
      </ul>
    </div>
    <div class="">
      <input type="button" @click='getCustomers' value="获取客户列表"/>
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'

export default {
  computed: mapState({
    // customers: state => state.Customer.customers,
    customers (state) {
      if (state.isAuthorized) {
        return state.Customer.customers
      }
    }
  }),
  methods: {
    getCustomers () {
      this.$store.dispatch('getCustomers')
    }
  }
}
</script>

<style lang="css">
</style>
