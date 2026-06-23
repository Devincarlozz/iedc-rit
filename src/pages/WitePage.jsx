import { defineComponent, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { sanitize, rateLimitCheck, validateEmail, generateFormToken, validateFormToken } from '../utils/security.js'
import { witePrograms, witeStories } from '../data/wite.js'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import BrutalCard from '../components/ui/BrutalCard.jsx'
import BrutalBadge from '../components/ui/BrutalBadge.jsx'
import BrutalButton from '../components/ui/BrutalButton.jsx'
import Footer from '../components/layout/Footer.jsx'
import styles from './WitePage.module.css'

export default defineComponent({
  name: 'WitePage',
  setup() {
    const sectionRefs = ref([])
    const name = ref('')
    const email = ref('')
    const dept = ref('')
    const honeypot = ref('')
    const formStatus = ref('')
    const isError = ref(false)
    const formToken = ref('')

    const activeStoryIndex = ref(0)

    const regenerateToken = () => {
      formToken.value = generateFormToken('wite')
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      if (honeypot.value !== '') return

      if (!validateFormToken('wite', formToken.value)) {
        formStatus.value = 'Session expired. Please try again.'
        isError.value = true
        regenerateToken()
        return
      }

      if (!rateLimitCheck('iedc_wite_submits')) {
        formStatus.value = 'Too many submissions. Please wait 10 minutes.'
        isError.value = true
        regenerateToken()
        return
      }

      const cleanName = sanitize(name.value, 50)
      const cleanEmail = sanitize(email.value, 80)
      const cleanDept = sanitize(dept.value, 50)

      if (!cleanName || !cleanEmail || !cleanDept) {
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

      formStatus.value = 'Successfully registered! We will email you onboarding details.'
      isError.value = false

      name.value = ''
      email.value = ''
      dept.value = ''
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
      <div class={styles.witePage}>
        <div class={styles.topBreadcrumbContainer}>
          <div class="container">
            <RouterLink to="/" class={`${styles.backLink} text-label`}>
              ← Back to IEDC RIT
            </RouterLink>
          </div>
        </div>

        <header class={styles.hero}>
          <div class={`${styles.heroGrid} container`}>
            <div class={styles.heroText}>
              <h1 class={`${styles.heroTitle} text-hero`}>WiTe</h1>
              <p class={`${styles.heroSub} text-heading`}>
                Women in Technology & Entrepreneurship
              </p>
              <p class={`${styles.heroDescription} text-body`}>
                We Build. We Lead. We Innovate. Empowering female developers, designers, and startup founders at RIT to lead the next technological generation.
              </p>
              <div class={styles.heroCta}>
                <BrutalButton href="#join-wite" class={styles.pinkBtn}>
                  JOIN THE CIRCLE →
                </BrutalButton>
              </div>
            </div>
            <div class={`${styles.heroImageWrapper} float-animation`}>
              <img
                src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Women in Tech representation"
                class={styles.heroImage}
                width="800"
                height="600"
              />
            </div>
          </div>
        </header>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.aboutSection} container reveal`}
        >
          <BrutalCard bg="var(--white)" class={styles.aboutCard}>
            <div class={styles.aboutGrid}>
              <div class={styles.aboutLeft}>
                <h3 class="text-heading">Empowering Innovation Without Barriers</h3>
                <p class="text-body">
                  WiTe is an exclusive subdivision of IEDC RIT established in 2021. Our primary goal is to address the gender gap in technology careers and business leadership. We provide a collaborative safe space, mentorship networks, hands-on hackathons, and scholarship guides to ensure female tech enthusiasts grow into industry leaders.
                </p>
              </div>
              <div class={styles.aboutRight}>
                <h2 class={`${styles.quoteText} text-display`}>SHATTER THE CEILING. BUILD THE FUTURE.</h2>
              </div>
            </div>
          </BrutalCard>
        </section>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.whySection} container reveal`}
        >
          <SectionTitle accentText="WHY" text="WiTe?" />
          <div class={styles.whyGrid}>
            <BrutalCard bg="var(--white)" class={styles.whyCard}>
              <div class={styles.whyNumber}>01</div>
              <h4 class="text-heading">BRIDGE THE GAP</h4>
              <p class="text-body">
                Get specific resource pathways, bootcamps, and coding hackathons designed to accelerate women developers.
              </p>
            </BrutalCard>
            <BrutalCard bg="var(--white)" class={styles.whyCard}>
              <div class={styles.whyNumber}>02</div>
              <h4 class="text-heading">MENTORSHIP</h4>
              <p class="text-body">
                Connect directly with female engineering heads and startup founders in the Kerala tech ecosystem.
              </p>
            </BrutalCard>
            <BrutalCard bg="var(--white)" class={styles.whyCard}>
              <div class={styles.whyNumber}>03</div>
              <h4 class="text-heading">OPPORTUNITIES</h4>
              <p class="text-body">
                Access exclusive tech scholarships, diversity internships, female-focused startup grants, and hackathons.
              </p>
            </BrutalCard>
          </div>
        </section>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.programsSection} container reveal`}
        >
          <SectionTitle accentText="OUR" text="PROGRAMS" />
          <div class={styles.programsGrid}>
            {witePrograms.map((prog, index) => (
              <div key={prog.id} class={styles.progCardContainer} style={{ '--i': index }}>
                <BrutalCard bg="var(--white)" class={styles.progCard}>
                  <div class={styles.progHeader}>
                    <BrutalBadge bg="var(--orange)">{prog.tag}</BrutalBadge>
                  </div>
                  <h4 class={`${styles.progTitle} text-heading`}>{prog.title}</h4>
                  <p class="text-body">{prog.desc}</p>
                </BrutalCard>
              </div>
            ))}
          </div>
        </section>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.storiesSection} container reveal`}
        >
          <SectionTitle accentText="SUCCESS" text="STORIES" />
          <div class={styles.storiesGrid}>
            <div class={styles.storyCardContent}>
              <BrutalCard bg="var(--white)" class={styles.storyCard}>
                <div class={styles.storyPhotoWrapper}>
                  <img
                    src={witeStories[activeStoryIndex.value].img}
                    alt={witeStories[activeStoryIndex.value].name}
                    class={styles.storyPhoto}
                    loading="lazy"
                    width="300"
                    height="300"
                  />
                </div>
                <div class={styles.storyTextWrapper}>
                  <p class={`${styles.storyQuote} text-heading`}>
                    "{witeStories[activeStoryIndex.value].quote}"
                  </p>
                  <h4 class={`${styles.storyName} text-label`}>
                    — {witeStories[activeStoryIndex.value].name}
                  </h4>
                  <p class={`${styles.storyRole} text-mono`}>
                    {witeStories[activeStoryIndex.value].role}
                  </p>
                </div>
              </BrutalCard>
              <div class={styles.carouselControls}>
                {witeStories.map((_, index) => (
                  <button
                    key={index}
                    class={`${styles.carouselDot} ${activeStoryIndex.value === index ? styles.carouselDotActive : ''}`}
                    onClick={() => activeStoryIndex.value = index}
                    aria-label={`Show story ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
            <div class={styles.storiesStaticImage}>
              <BrutalCard bg="var(--yellow)" class={styles.staticImageCard}>
                <img
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="WiTe team brainstorm session"
                  class={styles.staticImg}
                  width="800"
                  height="600"
                />
              </BrutalCard>
            </div>
          </div>
        </section>

        <section 
          id="join-wite"
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.joinSection} container reveal`}
        >
          <BrutalCard bg="var(--orange)" class={styles.joinCard}>
            <div class={styles.joinGrid}>
              <div class={styles.joinLeft}>
                <h2 class={`${styles.joinTitle} text-display`}>READY TO LEAD?</h2>
                <p class="text-body">
                  Register for the WiTe Circle. Get added to our Slack community workspace, weekly coding huddles, and diversity opportunity channels.
                </p>
              </div>
              <div class={styles.joinRight}>
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
                    <label class={styles.label}>DEPARTMENT & YEAR</label>
                    <input
                      type="text"
                      required
                      maxlength="50"
                      placeholder="e.g. CSE S4"
                      class={styles.input}
                      value={dept.value}
                      onInput={e => dept.value = e.target.value}
                    />
                  </div>
                  <BrutalButton type="submit" variant="outline">
                    REGISTER NOW →
                  </BrutalButton>
                </form>
                {formStatus.value ? (
                  <p class={`${styles.status} ${isError.value ? styles.errorStatus : styles.successStatus}`}>
                    {formStatus.value}
                  </p>
                ) : null}
              </div>
            </div>
          </BrutalCard>
        </section>

        <Footer />
      </div>
    )
  }
})
