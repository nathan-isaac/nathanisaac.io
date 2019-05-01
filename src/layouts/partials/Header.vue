<template>
  <header class="flex items-center py-4 px-6 bg-primary text-white shadow">
    <div class="flex-1 font-bold text-2xl">
      <g-link to="/">{{ $static.metaData.siteName }}</g-link>
    </div>

    <nav class="text-xl flex items-center">
<!--      <g-link class="nav__link" to="/about">About</g-link>-->
      <a href="https://twitter.com/nathanjisaac" class="px-2" title="Twitter">
        <font-awesome :icon="['fab', 'twitter']"/>
      </a>
      <a href="https://github.com/nathanjisaac" class="px-2" title="Github">
        <font-awesome :icon="['fab', 'github']"/>
      </a>
      <a href="https://www.linkedin.com/in/nathanisaac" class="px-2" title="Linkedin">
        <font-awesome :icon="['fab', 'linkedin']"/>
      </a>
      <a href="mailto:nathanjisaac@gmail.com" class="px-2" title="Email">
        <font-awesome :icon="['fas', 'envelope']"/>
      </a>
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
