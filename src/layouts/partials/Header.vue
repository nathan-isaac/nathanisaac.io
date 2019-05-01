<template>
  <header class="flex items-center py-4 px-6 bg-primary text-white shadow">
    <div class="flex-1 font-bold text-2xl">
      <g-link to="/">{{ $static.metaData.siteName }}</g-link>
    </div>

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
