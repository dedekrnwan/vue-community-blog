<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card" v-if="!loading">
                    <img max-height="420px" :src="article.imageUrl" alt="" class="card-img top">
                    <div class="card-body">
                        <h1 class="card-title text-center my-3">
                            {{article.title}}
                        </h1>
                        <div class="article-content" v-html="article.content"></div>
                        <div class="comments my-4">
                            <vue-disqus shortname="community-blog" :identifier="article.slug" :url="`url`"></vue-disqus>
                        </div>
                    </div>
                </div>
                <div class="loader text-center" v-else>
                    <span>
                        <i class="fa fa-5x fa-spin fa-spinner"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import config from "@/config";

export default {
    name: 'Article',
    mounted(){
        this.getArticle()
    },
    data(){
        return {
            article: {},
            loading: true,
            url: window.location.href
        }
    },
    methods: {
        
        getArticle(){
            axios.get(`${config.apiUrl}/article/${this.$route.params.slug}`).then((result) => {
                this.loading = false
                this.article = result.data.data
            }).catch((err) => {
                this.loading = false

                console.error(err)
            });
        }
    }
}
</script>