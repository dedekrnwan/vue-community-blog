<template>
    <div>
        <div class="container">
            <div class="d-flex justify-content-between">
                <button class="btn btn-warning" :disabled="articles.prev_page_url === null || loading" @click="getArticles(articles.prev_page_url)">Prev Page</button>
                <button class="btn btn-warning" :disabled="articles.next_page_url === null || loading" @click="getArticles(articles.next_page_url)">Next Page</button>
            </div>
            <div class="row"  v-if="!loading">
                <div class="col-md-8 offset-md-2" v-for="article in articles.data" :key="article.id">
                    <Article :article="article"></Article>
                </div>
            </div>
            <div class="loader text-center" v-else>
                <span>
                    <i class="fa fa-5x fa-spin fa-spinner"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import config from "@/config";

import Article from "@/components/Article";

export default {
    name: 'Home',
    components: {
        Article
    },
    data() {
        return {
            articles: [],
            loading: true
        }
    },
    mounted() {
        this.getArticles();
    },
    methods: {
        getArticles(url = `${config.apiUrl}/articles`){
            this.loading = true
            axios.get(url).then((result) => {
                this.loading = false
                this.articles = result.data.data
            }).catch((err) => {
                this.loading = false
                console.error(err)
            });
        },
    }
}
</script>

<style>
    .btn-warning {
        color: white
    }
</style>