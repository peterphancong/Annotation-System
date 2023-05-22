<template>
  <div class="hello">
    Wellcome {{ email }} with role:
    <div v-if="role === 0"> admin place</div>
    <div v-else-if="role === 1"> leader parts are displayed here</div>
    <div v-else-if="role === 2"> curator component are displayed here</div>
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
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
