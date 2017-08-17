import axios from 'axios'

const GET_DISTCLUSTER = 'GET_DISTCLUSTER'

const state = {
  distCluster: []
}

const actions = {
  getDistCluster ({commit, state}) {
    axios.get('/test/amap-ui/static/data/10w.txt')
    .then(function (response) {
      commit('GET_DISTCLUSTER', {distCluster: response.data.split('\n')})
    })
    .catch(function (error) {
      console.log(error)
    })
  }
}

const mutations = {
  [GET_DISTCLUSTER] (state, payload) {
    state.distCluster = payload.distCluster
    console.log(state.distCluster)
  }
}

export default {
  state,
  actions,
  mutations
}
