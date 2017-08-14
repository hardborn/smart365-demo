<template lang="html">
  <div id="container_demo" >
    <!-- hidden anchor to stop jump http://www.css3create.com/Astuce-Empecher-le-scroll-avec-l-utilisation-de-target#wrap4  -->
    <div id="wrapper">
        <div id="login" class="animate form">
            <form  autocomplete="on">
                <p>
                    <label for="username" class="uname" data-icon="u" > Your email or username </label>
                    <input id="username" name="username" v-model="user.username"  required="required" type="text" placeholder="user name"/>
                </p>
                <p>
                    <label for="password" class="youpasswd" data-icon="p"> Your password </label>
                    <input id="password" name="password" v-model="user.password" requireq="required" type="password" placeholder="password" />
                </p>
                <!-- <p class="keeplogin">
                    <input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" />
                    <label for="loginkeeping">Keep me logged in</label>
                </p> -->
                <p class="login button">
                    <!-- <input type="submit" value="Login" /> -->
                    <input type="button" value="Login" name="Login" @click="login(user)"></button>
                </p>
                <!-- <p class="change_link">
                    Not a member yet ?
                    <a href="#toregister" class="to_register">Join us</a>
                </p> -->
            </form>
        </div>
    </div>
</div>
</template>

<script>

export default {
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', {
                user: this.user
            }).then(() => {
                this.$router.push('Dashborad')
            })
        }
        // ...mapActions([
        //   'login'
        // ])
    }
}
</script>
