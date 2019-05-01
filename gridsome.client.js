import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

library.add(faGithub, faTwitter, faLinkedin, faEnvelope)

export default function (Vue) {
  Vue.component('font-awesome', FontAwesomeIcon)
}
