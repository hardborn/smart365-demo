// import {getCookie} from '../utils/authService'
import querystring from 'querystring'
import axios from 'axios'
import {
  AUTHORIZED
} from '../types'

axios.defaults.withCredentials = true

const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

const state = {
  user: null,
  islogined: false
}

const actions = {
  login ({
    commit
  }, authInfo) {
    return new Promise((resolve, reject) => {
      axios.post('/api/login.json', querystring.stringify({
        username: authInfo.username,
        password: authInfo.password
      })).then(function (response) {
        if (response.data.errorCode === 0) {
          commit(LOGIN_SUCCESS, {
            user: response.data
          })
          commit(AUTHORIZED)
          resolve(response.data)
        } else {
          console.log(response.data)
        }
        // this.$route.push({path: 'dashborad'})
      })
        .catch(function (error) {
          reject(error)
          console.log(error)
        })
    })
  }
}

const mutations = {
  [LOGIN_SUCCESS] (state, payload) {
    // console.log(payload.user)
    state.user = payload.user
    state.islogined = true
  }
}

export default {
  state,
  actions,
  mutations
}
