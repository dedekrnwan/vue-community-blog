<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card">
                    <div class="card-body">
                        <picture-input 
                            @change="onChange"
                            accept="image/jpeg,image/png" 
                            size="10" 
                            buttonClass="btn btn-danger"
                         >
                        </picture-input>
                        <input v-model="title" type="text" class="form-control my-3" placeholder="Title">
                        <select v-model="category" class="form-control mb-3">
                            <option :value="category.id" v-for="category in categories" :key="category.id">{{category.name}}</option>
                        </select>
                        <wysiwyg v-model="content" />
                        <div class="text-center">
                            <button @click="createArticle" :disabled="loading" class="btn btn-success form-control">
                            <span v-if="loading"><i class="fa fa-spin fa-spinner"></i></span>
                            {{loading ? '' : 'Create Article'}}
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PictureInput from 'vue-picture-input'
import axios from "axios";
import config from "@/config";

export default {
    name: 'CreatArticle',
    components: {
        PictureInput
    },
    mounted(){
        this.getCategories()
    },
    beforeRouteEnter(to, from, next) {
        if(!localStorage.getItem('auth')) {
            return next({
                path:'/login'
            })
        }
        next()
    },
    data(){
        return {
            title: '',
            content: '',
            image: null,
            categories: [],
            category: '',
            loading: false
        }
    },
    methods: {
        onChange(image) {
            this.image = image
        },
        createArticle(){
            if(!this.title || !this.category || !this.content){
                this.$noty.error('Please fill in all field')
                return
            }

            this.loading = true
            const form = new FormData()
            form.append('file',this.image)
            form.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET)
            form.append('api_key', process.env.VUE_APP_CLOUDINARY_API_KEY)

            axios.post(`${process.env.VUE_APP_CLOUDINARY_URL}/image/upload`, form).then((result) => {
                axios.post(`${config.apiUrl}/articles`, {
                    title: this.title,
                    content: this.content,
                    category_id: this.category,
                    imageUrl: result.data.secure_url
                },{
                    headers: {
                        Authorization: `Bearer ${this.$root.auth.token}`
                    }
                }).then(() => {
                    this.loading = false
                    this.$noty.success('Article created successfully')
                    this.$router.push('/')
                }).catch(() => {
                    this.loading = false
                    this.$noty.error('Oops something went wrong')
                });
            }).catch(() => {
                this.loading = false
                this.$noty.error('Oops something went wrong')
            });
        },
        getCategories(){
            const categories = localStorage.getItem('categories')
            if(categories) {
                this.categories = JSON.parse(categories)
            }else{
                axios.get(`${config.apiUrl}/categories`).then((result) => {
                    this.categories = result.data.categories

                    localStorage.setItem('categories', JSON.stringify(this.categories))
                }).catch((err) => {
                    console.log(err)
                });
            }
        }
    }
}
</script>