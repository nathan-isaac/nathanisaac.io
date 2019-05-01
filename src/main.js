// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import './sass/tailwind.css'

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:400,400i,500,700',
  })

  head.bodyAttrs = {
    class: 'font-body'
  }

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
}
