<template>
    <div class="row my-5">
        <div class="col-md-4 offset-md-4">
            <div class="card">
                <div class="card-body">
                    <h3 class="text-center mb-4">Login</h3>
                    <div class="form-group">
                        <input :class="{ 'is-invalid' :errors.email, 'is-valid': !errors.email && submitted }" v-model="email" type="email" class="form-control" placeholder="Email">
                        <div class="errors" v-if="errors.email">
                            <small class="text-danger" :key="error" v-for="error in errors.email">{{error}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <input :class="{ 'is-invalid' :errors.password, 'is-valid': !errors.password && submitted }" v-model="password" type="password" class="form-control" placeholder="Password">
                        <div class="errors" v-if="errors.password">
                            <small class="text-danger" :key="error" v-for="error in errors.password">{{error}}</small>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button @click="loginUser" :disabled="loading" class="btn btn-success form-control">
                            <span v-if="loading"><i class="fa fa-spin fa-spinner"></i></span>
                            {{loading ? '' : 'Login'}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import config from "@/config";

export default {
    name: 'Login',
    beforeRouteEnter(to, from, next) {
        if(localStorage.getItem('auth')) {
            return next({
                path:'/'
            })
        }
        next()
    },
    data(){
        return {
            email: '',
            password: '',
            errors: {},
            submitted: false,
            loading: false
        }
    },
    methods: {
        loginUser(){
            this.loading = true
            axios.post(`${config.apiUrl}/auth/login`, {
                email: this.email,
                password: this.password
            }).then((result) => {
                this.submitted = true
                this.loading = false

                this.$noty.success('Successfully login')

                this.$root.auth = result.data.data
                localStorage.setItem('auth', JSON.stringify(result.data.data))
                this.$router.push('/')
            }).catch(({response}) => {
                this.$noty.error('Oops something went wrong')

                this.submitted = true
                this.loading = false

                if(response.status === 401) {
                    this.errors = {
                        email: ['These credentials are invalid']
                    }
                }else {
                    this.errors = response.data
                }
            });
        }
    }
}
</script>