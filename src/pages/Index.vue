<template>
  <div>
    <header class="header">
      <div class="ni">Nathan Isaac</div>

      <div class="hello">
        <h1 class="hello-title">Hello! I'm a <strong>Full Stack Developer</strong> based in College Place, WA.</h1>
        <p class="hello-subtitle">Got a project? <a href="mailto:nathanjisaac@gmail.com" class="hello-link">Contact me</a></p>
      </div>

      <nav class="hello-nav">
        <a href="https://twitter.com/nathanjisaac" class="hello-nav-link is-icon is-twitter" title="Twitter">
          <i class="fa fa-twitter" aria-hidden="true"></i>
        </a>
        <a href="https://github.com/nathanjisaac" class="hello-nav-link is-icon" title="Github">
          <i class="fa fa-github" aria-hidden="true"></i>
        </a>
        <a href="https://www.linkedin.com/in/nathanisaac" class="hello-nav-link is-icon" title="Linkedin">
          <i class="fa fa-linkedin" aria-hidden="true"></i>
        </a>
        <a href="mailto:nathanjisaac@gmail.com" class="hello-nav-link is-icon" title="Email">
          <i class="fa fa-envelope-o" aria-hidden="true"></i>
        </a>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Welcome'
  }
}
</script>

<style lang="sass">
  // Fonts
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,400i,500,700')
  @import url('https://unpkg.com/font-awesome@4.7.0/css/font-awesome.min.css')

  // Variables
  $family-sans-serif: 'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif
  $body-background: #ffffff
  $primary: #8BC34A

  // Bulma
  @import "../../node_modules/bulma/bulma.sass"

  .header
    align-items: center
    display: flex
    flex-direction: column
    height: 100vh
    justify-content: space-between
    padding-bottom: 3rem
    padding-top: calc(20vh - 4rem)
    border: 6px solid $primary

  .ni
    margin: 0
    font-size: 2.5em
    font-weight: bold

  .hello
    margin-left: auto
    margin-right: auto
    max-width: 60rem
    padding: 0 calc(2rem - 8px)
    font-size: 1.4rem

  .hello-title
    font-size: 2rem

    +tablet
      font-size: 3rem

  .hello-subtitle
    color: #7a7a7a
    font-size: 1em
    margin-top: 1rem

  .hello-link
    color: $primary
    border-bottom: 1px solid #dbdbdb

    &:hover
      color: $primary
      border-color: $primary

  .hello-nav
    height: 4em

  .hello-nav-link
    color: inherit
    border-bottom: 1px solid #dbdbdb
    padding-bottom: 2px
    margin: 0 10px
    font-size: 1.2em

    &.is-icon
      border-bottom: none

    &.is-twitter
      color: #1DA1F2

    &.is-projects
      color: #4CAF50
      &:hover
        border-color: #4CAF50

    &.is-articles
      color: #2196F3
      &:hover
        border-color: #2196F3

    &.is-favorites
      color: #FF9800
      &:hover
        border-color: #FF9800
</style>
