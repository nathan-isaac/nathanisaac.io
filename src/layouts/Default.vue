<template>
  <div>
    <Header/>

    <slot/>
  </div>
</template>

<script>
  import Header from './partials/Header.vue'

  export default {
    components: {
      Header,
    }
  }
</script>
