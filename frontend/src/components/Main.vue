<template>
  <div class="Main Screen">
    Wellcome {{ email }} with role:
    <div v-if="role < 1"> admin only place</div>
    <div v-if="role < 2"> leader and admin only</div>
    <div v-if="role < 3"> curator, leader and admin components are displayed here</div>
    <button class="border mt-6 h-10 bg-blue-300 rounded-lg shadow-md w-5/6" @click="logout()" type="button">Logout</button>
  </div>
</template>

<script>
import router from '../router'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data () {
    return {
      role: '--role--',
      email: '--email--'
    }
  },
  mounted () {
    let token = localStorage.getItem('user')
    console.log(token)
    if (!token) {
      router.push('/')
    } else {
      let user = VueJwtDecode.decode(token)
      console.log(user)
      this.role = user.role
      this.email = user.email
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('user')
      router.push('/')
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
