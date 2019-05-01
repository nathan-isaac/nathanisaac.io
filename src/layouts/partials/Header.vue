<template>
    <header class="header">
        <strong>
            <g-link to="/">{{ $static.metaData.siteName }}</g-link>
        </strong>

        <nav class="nav">
            <g-link class="nav__link" to="/about">About</g-link>
        </nav>
    </header>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>
