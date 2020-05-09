<template>
    <div class="row mt-5">
        <div class="col-md-4 offset-md-4">
            <div class="card">
                <div class="card-body">
                    <h3 class="text-center mb-4">Signup</h3>
                    <div class="form-group">
                        <input :class="{ 'is-invalid' :errors.name, 'is-valid': !errors.name && submitted }" v-model="name" type="text" class="form-control" placeholder="Name">
                        <div class="errors" v-if="errors.name">
                            <small class="text-danger" :key="error" v-for="error in errors.name">{{error}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <input :class="{ 'is-invalid' :errors.email, 'is-valid': !errors.email && submitted }" v-model="email" type="email" class="form-control" placeholder="Email">
                        <div class="errors" v-if="errors.email">
                            <small class="text-danger" :key="error" v-for="error in errors.email">{{error}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <input :class="{ 'is-invalid' :errors.password,'is-valid': !errors.password && submitted }" v-model="password" type="password" class="form-control" placeholder="Password">
                         <div class="errors" v-if="errors.password">
                            <small class="text-danger" :key="error" v-for="error in errors.password">{{error}}</small>
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button @click="registerUser" :disabled="loading" class="btn btn-success form-control">
                            <span v-if="loading"><i class="fa fa-spin fa-spinner"></i></span>
                            {{loading ? '' : 'Signup'}}
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
    name: 'Signup',
    beforeRouteEnter(to, from, next) {
        if(localStorage.getItem('auth')) {
            return next({
                path:'/'
            })
        }
        next()
    },
    data() {
        return {
            name: '',
            email: '',
            password: '',
            errors: {},
            submitted: false,
            loading: false
        }
    },
    methods: {
        registerUser(){
            this.loading = true
            axios.post(`${config.apiUrl}/auth/register`, {
                name: this.name,
                email: this.email,
                password: this.password
            }).then((result) => {
                this.submitted = true
                this.loading = false

                this.$noty.success('Successfully register')

                localStorage.setItem('auth', JSON.stringify(result.data.data))
                this.$root.auth = result.data.data
                this.$router.push('/')
            }).catch((err) => {
                this.$noty.error('Oops something went wrong')

                this.submitted = true
                this.loading = false

                this.errors = err.response.data
            });
        }
    }
}
</script>