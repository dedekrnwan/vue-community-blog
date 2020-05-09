<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                <img src="@/assets/logo.png" width="30px" height="30px" alt="">
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link" v-if="!isAuthenticated">Login</router-link>
                    </li>
                      <li class="nav-item">
                        <router-link to="/signup" class="nav-link" v-if="!isAuthenticated">Signup</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/articles/create" class="nav-link" v-if="isAuthenticated">Create New Article</router-link>
                    </li>
                    <li class="nav-item dropdown" v-if="isAuthenticated">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Hi {{$root.auth.user.name}}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" @click="logout">Logout</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Navbar',
    mounted(){
    },
    computed: {
        isAuthenticated(){
            return this.$root.auth.user
        }
    },
    methods: {
        logout(){
            localStorage.removeItem('auth')
            this.$root.auth = {}
            this.$noty.success('Successfully logout')
            this.$router.push('login')
        }
    }
}
</script>