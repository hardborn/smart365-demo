import axios from 'axios'

const GET_CUSTOMERS = 'GET_CUSTOMERS'

const state = {
  name: null,
  customers: []
}

const actions = {
  getCustomers ({
    commit,
    state
  }) {
    axios.get('/api/customer/list.json')
      .then(function (response) {
        console.log(response.data)
        commit('GET_CUSTOMERS', {customers: response.data})
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
const mutations = {
  [GET_CUSTOMERS] (state, payload) {
    state.customers = payload.customers.data
    // console.log(state.customers)
  }
}

export default {
  state,
  actions,
  mutations
}
