import { defineComponent, ref, onMounted } from 'vue'
import { sanitize, rateLimitCheck, validateEmail, generateFormToken, validateFormToken } from '../utils/security.js'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import BrutalCard from '../components/ui/BrutalCard.jsx'
import BrutalButton from '../components/ui/BrutalButton.jsx'
import Footer from '../components/layout/Footer.jsx'
import styles from './ConnectPage.module.css'

export default defineComponent({
  name: 'ConnectPage',
  setup() {
    const sectionRefs = ref([])
    const name = ref('')
    const email = ref('')
    const message = ref('')
    const honeypot = ref('')
    const formStatus = ref('')
    const isError = ref(false)
    const formToken = ref('')

    const activeFaq = ref(null)

    const faqs = [
      { q: 'How do I join IEDC RIT?', a: 'You can join by registering through our annual membership drive or by attending any of our open bootcamps. Keep an eye on our Instagram page for registration links.' },
      { q: 'When are events announced?', a: 'Events are announced 1-2 weeks in advance. We publish all timelines on our website events tab, official WhatsApp community groups, and Instagram handle.' },
      { q: 'Can non-RIT students participate?', a: 'Yes! Major events like HackRIT and our startup pitch competitions are open to students from all AICTE-approved colleges across India.' },
      { q: 'How do I pitch a startup idea?', a: 'Fill out this contact form with the subject line "Startup Pitch" or visit the Innovation Lab on Wednesdays to present directly to our nodal officer.' }
    ]

    const toggleFaq = (index) => {
      activeFaq.value = activeFaq.value === index ? null : index
    }

    const regenerateToken = () => {
      formToken.value = generateFormToken('contact')
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      if (honeypot.value !== '') return

      if (!validateFormToken('contact', formToken.value)) {
        formStatus.value = 'Session expired. Please try again.'
        isError.value = true
        regenerateToken()
        return
      }

      if (!rateLimitCheck('iedc_contact_submits')) {
        formStatus.value = 'Too many submissions. Please wait 10 minutes.'
        isError.value = true
        regenerateToken()
        return
      }

      const cleanName = sanitize(name.value, 50)
      const cleanEmail = sanitize(email.value, 80)
      const cleanMessage = sanitize(message.value, 500)

      if (!cleanName || !cleanEmail || !cleanMessage) {
        formStatus.value = 'Please fill out all fields.'
        isError.value = true
        regenerateToken()
        return
      }

      if (!validateEmail(cleanEmail)) {
        formStatus.value = 'Please enter a valid email address.'
        isError.value = true
        regenerateToken()
        return
      }

      formStatus.value = 'Message sent successfully! We will get back to you shortly.'
      isError.value = false

      name.value = ''
      email.value = ''
      message.value = ''
      regenerateToken()
    }

    const observeReveal = (el) => {
      if (!el) return
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.disconnect()
        }
      }, { threshold: 0.15 })
      observer.observe(el)
    }

    onMounted(() => {
      regenerateToken()
      sectionRefs.value.forEach(el => observeReveal(el))
    })

    return () => (
      <div class={styles.connectPage}>
        <header class={styles.hero}>
          <div class="container">
            <p class={`${styles.breadcrumb} text-label`}>HOME / CONNECT</p>
            <h1 class={`${styles.heroTitle} text-hero`}>LET'S BUILD SOMETHING →</h1>
          </div>
        </header>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.formSection} container reveal`}
        >
          <div class={styles.grid}>
            <div class={styles.col}>
              <h3 class={`${styles.colTitle} text-label`}>GET IN TOUCH</h3>
              <div class={styles.socialGrid}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class={`${styles.socialCard} ${styles.insta}`}>
                  <span class={styles.socialLabel}>INSTAGRAM ↗</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class={`${styles.socialCard} ${styles.linkedin}`}>
                  <span class={styles.socialLabel}>LINKEDIN ↗</span>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class={`${styles.socialCard} ${styles.yt}`}>
                  <span class={styles.socialLabel}>YOUTUBE ↗</span>
                </a>
                <a href="mailto:iedc@rit.ac.in" class={`${styles.socialCard} ${styles.email}`}>
                  <span class={styles.socialLabel}>EMAIL ↗</span>
                </a>
              </div>
            </div>

            <div class={styles.col}>
              <h3 class={`${styles.colTitle} text-label`}>SEND A MESSAGE</h3>
              <BrutalCard bg="var(--white)" class={styles.formCard}>
                <form onSubmit={handleSubmit} class={styles.form}>
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
                  <div class={styles.formGroup}>
                    <label class={styles.label}>NAME</label>
                    <input
                      type="text"
                      required
                      maxlength="50"
                      class={styles.input}
                      value={name.value}
                      onInput={e => name.value = e.target.value}
                    />
                  </div>
                  <div class={styles.formGroup}>
                    <label class={styles.label}>EMAIL</label>
                    <input
                      type="email"
                      required
                      maxlength="80"
                      class={styles.input}
                      value={email.value}
                      onInput={e => email.value = e.target.value}
                    />
                  </div>
                  <div class={styles.formGroup}>
                    <label class={styles.label}>MESSAGE</label>
                    <textarea
                      required
                      maxlength="500"
                      rows="4"
                      class={styles.textarea}
                      value={message.value}
                      onInput={e => message.value = e.target.value}
                    ></textarea>
                  </div>
                  <BrutalButton type="submit">
                    SEND MESSAGE →
                  </BrutalButton>
                </form>
                {formStatus.value ? (
                  <p class={`${styles.status} ${isError.value ? styles.error : styles.success}`}>
                    {formStatus.value}
                  </p>
                ) : null}
              </BrutalCard>
            </div>

            <div class={styles.col}>
              <h3 class={`${styles.colTitle} text-label`}>FIND US</h3>
              <BrutalCard bg="var(--white)" class={styles.mapCard}>
                <h4 class="text-heading">IEDC RIT HQ</h4>
                <p class={`${styles.address} text-body`}>
                  Rajiv Gandhi Institute of Technology (RIT)<br />
                  Velloor, Pampady<br />
                  Kottayam, Kerala — 686501
                </p>
                <div class={styles.mapWrapper}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.567156965039!2d76.61587647478672!3d9.56515717992484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062f689c1f6d3f%3A0x6b44558231c54b2d!2sRajiv%20Gandhi%20Institute%20of%20Technology%2C%20Kottayam!5e0!3m2!1sen!2sin!4v1717550000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowfullscreen=""
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    title="RIT Campus Location Map"
                  ></iframe>
                </div>
              </BrutalCard>
            </div>
          </div>
        </section>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.faqSection} container reveal`}
        >
          <SectionTitle accentText="FREQUENTLY ASKED" text="QUESTIONS" />
          <div class={styles.faqList}>
            {faqs.map((faq, index) => {
              const isOpen = activeFaq.value === index
              return (
                <div 
                  key={index} 
                  class={`${styles.faqItem} ${isOpen ? styles.faqOpen : ''}`}
                  onClick={() => toggleFaq(index)}
                >
                  <div class={styles.faqHeader}>
                    <span class={`${styles.faqQuestion} text-heading`}>{faq.q}</span>
                    <span class={styles.faqIcon}>+</span>
                  </div>
                  <div class={`${styles.faqBody} ${isOpen ? styles.bodyOpen : ''}`}>
                    <div class={styles.faqBodyInner}>
                      <p class="text-body">{faq.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <Footer />
      </div>
    )
  }
})
