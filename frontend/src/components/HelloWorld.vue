<template>
  <div class="hello">
    Wellcome {{ email }} with role: {{ role }}
  </div>
</template>

<script>
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
    if(!token)
      router.push('/')
    else
      let user = VueJwtDecode.decode()
      this.role = user.role
      this.email = user.email
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
