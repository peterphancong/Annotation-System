<template>
    <div>
        <h2>Dashboard</h2>
    </div>
</template>

<script>
import router from '../router'
import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios'

export default {
  name: 'Dashboard',
  data () {
    return {
      currentUser: ''
    }
  },
  methods: {
  },
  mounted () {
    let token = localStorage.getItem('user')
    if (!token) {
      router.push('/')
    } else {
      var data = {token: token}
      axios.post('/api/verify', data)
        .then((response) => {
          if (response.status === 201) {
            this.currentUser = VueJwtDecode.decode(token)
          } else {
            router.push('/')
          }
        })
        .catch((e) => {
          this.error = 'Login Error'
        })
    }
  }
}
</script>
