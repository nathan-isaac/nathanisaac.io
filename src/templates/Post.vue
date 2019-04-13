<template>
    <Layout>
        <div v-html="content"></div>
    </Layout>
</template>

<page-query>
query ($path: String!) {
    post: post(path: $path) {
        id
        title
        content
        timeToRead
    }
}
</page-query>

<script>
    export default {
        metaData() {
            return {
                title: this.$page.post.title
            }
        },
        computed: {
            content() {
                return this.$page.post.content;
            }
        }
    }
</script>