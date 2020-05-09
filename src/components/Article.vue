<template>
    <div class="card my-3">
        <div class="card-header">{{article.title}}</div>
        <div class="card-body">
            <div class="my-3" v-html="article.content.substring(0,200)"></div>
            <router-link class="btn btn-primary" :to="`/article/${article.slug}`">Read more</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Article',
    props: ['article']
}
</script>