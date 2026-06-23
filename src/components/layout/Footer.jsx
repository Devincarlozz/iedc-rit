import { defineComponent, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { sanitize, rateLimitCheck, validateEmail, generateFormToken, validateFormToken, sanitizeUrl } from '../../utils/security.js'
import BrutalButton from '../ui/BrutalButton.jsx'
import iedcLogo from '../../assets/iedc-logo.png'
import styles from './Footer.module.css'

export default defineComponent({
  name: 'Footer',
  setup() {
    const email = ref('')
    const honeypot = ref('')
    const message = ref('')
    const isError = ref(false)
    const formToken = ref('')

    const regenerateToken = () => {
      formToken.value = generateFormToken('footer_newsletter')
    }

    onMounted(() => {
      regenerateToken()
    })

    const handleSubscribe = (e) => {
      e.preventDefault()
      if (honeypot.value !== '') return

      if (!validateFormToken('footer_newsletter', formToken.value)) {
        message.value = 'Session expired. Please try again.'
        isError.value = true
        regenerateToken()
        return
      }

      if (!rateLimitCheck('iedc_footer_submits')) {
        message.value = 'Too many attempts. Wait a few minutes.'
        isError.value = true
        regenerateToken()
        return
      }

      const cleanEmail = sanitize(email.value, 80)
      if (!cleanEmail || !validateEmail(cleanEmail)) {
        message.value = 'Please enter a valid email.'
        isError.value = true
        regenerateToken()
        return
      }

      message.value = 'Subscribed successfully!'
      isError.value = false
      email.value = ''
      regenerateToken()
    }

    return () => (
      <footer class={styles.footer}>
        <div class={`${styles.container} container`}>
          <div class={styles.brandCol}>
            <div class={styles.logo}>
              <img src={iedcLogo} alt="IEDC RIT" class={styles.logoSvg} />
            </div>
            <p class={`${styles.tagline} text-body`}>Building tomorrow's innovators, today.</p>
          </div>

          <div class={styles.linksGrid}>
            <div class={styles.col}>
              <h4 class={`${styles.title} text-label`}>NAVIGATE</h4>
              <RouterLink to="/" class={styles.link}>Home</RouterLink>
              <RouterLink to="/about" class={styles.link}>About</RouterLink>
              <RouterLink to="/events" class={styles.link}>Events</RouterLink>
              <RouterLink to="/team" class={styles.link}>Team</RouterLink>
              <RouterLink to="/wite" class={styles.link}>WiTe</RouterLink>
              <RouterLink to="/connect" class={styles.link}>Connect</RouterLink>
            </div>

            <div class={styles.col}>
              <h4 class={`${styles.title} text-label`}>PROGRAMS</h4>
              <a href="#" class={styles.link}>Bootcamp</a>
              <a href="#" class={styles.link}>Hackathon</a>
              <a href="#" class={styles.link}>IdeaLab</a>
              <a href="#" class={styles.link}>WiTe Cell</a>
            </div>

            <div class={styles.col}>
              <h4 class={`${styles.title} text-label`}>CONNECT</h4>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class={styles.link}>Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class={styles.link}>LinkedIn</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class={styles.link}>YouTube</a>
              <a href="mailto:iedc@rit.ac.in" class={styles.link}>Email</a>
            </div>

            <div class={styles.newsletterCol}>
              <h4 class={`${styles.title} text-label`}>NEWSLETTER</h4>
              <form onSubmit={handleSubscribe} class={styles.form}>
                <input
                  type="text"
                  name="website"
                  aria-hidden="true"
                  tabIndex="-1"
                  autocomplete="off"
                  class={styles.honeypot}
                  value={honeypot.value}
                  onInput={e => honeypot.value = e.target.value}
                />
                <input
                  type="email"
                  placeholder="email@domain.com"
                  required
                  maxlength="80"
                  class={styles.input}
                  value={email.value}
                  onInput={e => email.value = e.target.value}
                />
                <BrutalButton type="submit" class={styles.subBtn}>
                  SUBSCRIBE
                </BrutalButton>
              </form>
              {message.value ? (
                <p key={message.value} class={`${styles.message} ${isError.value ? `${styles.error} shake-anim` : styles.success} fade-in`}>
                  {message.value}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div class={`${styles.bottom} container`}>
          <p class={styles.copy}>
            © 2025 IEDC RIT · All rights reserved · Created by Bhagath Krishnan (<a href={sanitizeUrl('https://instagram.com/b_k.dev')} target="_blank" rel="noopener noreferrer" class={styles.creditLink}>@b_k.dev</a> | <a href={sanitizeUrl('https://github.com/Devincarlozz')} target="_blank" rel="noopener noreferrer" class={styles.creditLink}>GitHub</a>)
          </p>
        </div>
      </footer>
    )
  }
})
