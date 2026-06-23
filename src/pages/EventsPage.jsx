import { defineComponent, ref, onMounted } from 'vue'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import BrutalCard from '../components/ui/BrutalCard.jsx'
import BrutalBadge from '../components/ui/BrutalBadge.jsx'
import BrutalButton from '../components/ui/BrutalButton.jsx'
import EventsSection from '../components/home/EventsSection.jsx'
import Footer from '../components/layout/Footer.jsx'
import styles from './EventsPage.module.css'

export default defineComponent({
  name: 'EventsPage',
  setup() {
    const sectionRefs = ref([])

    const pastEvents = [
      { id: 101, title: 'IdeaStorm 2.0', year: '2024', tag: 'COMPETITION', desc: 'Over 50+ business pitches submitted by students across multiple regional zones.' },
      { id: 102, title: 'AR/VR Hands-on', year: '2024', tag: 'WORKSHOP', desc: 'Deep dive session on building immersive games using Unity and Meta Quest integrations.' },
      { id: 103, title: 'Web3 Dev Summit', year: '2023', tag: 'BOOTCAMP', desc: 'Introduced smart contracts development, solidity scripting, and IPFS data storage.' }
    ]

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
      sectionRefs.value.forEach(el => observeReveal(el))
    })

    return () => (
      <div class={styles.eventsPage}>
        <header class={styles.hero}>
          <div class="container">
            <p class={`${styles.breadcrumb} text-label`}>HOME / EVENTS</p>
            <h1 class={`${styles.heroTitle} text-hero`}>EVENTS & PROGRAMS</h1>
            <p class={`${styles.subline} text-mono`}>// Learn, build, and pitch with the RIT community</p>
          </div>
        </header>

        <div class={styles.mainEvents}>
          <EventsSection limit={0} showTitle={false} />
        </div>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.legacySection} container reveal`}
        >
          <SectionTitle accentText="LEGACY" text="EVENTS" />
          
          <div class={styles.legacyGrid}>
            {pastEvents.map((event, index) => (
              <div 
                key={event.id}
                class={styles.legacyCardContainer}
                style={{ '--i': index }}
              >
                <BrutalCard glass={true} class={styles.legacyCard}>
                  <div class={styles.legacyHeader}>
                    <BrutalBadge bg="var(--teal)">{event.tag}</BrutalBadge>
                    <span class={`${styles.year} text-label`}>{event.year}</span>
                  </div>
                  <h3 class={`${styles.legacyTitle} text-heading`}>{event.title}</h3>
                  <p class="text-body">{event.desc}</p>
                </BrutalCard>
              </div>
            ))}
          </div>
        </section>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.ctaSection} reveal`}
        >
          <div class="container">
            <div class={styles.ctaBanner}>
              <h2 class={`${styles.ctaTitle} text-display`}>HAVE AN IDEA FOR AN EVENT?</h2>
              <p class={`${styles.ctaText} text-body`}>
                Pitch your workshop, hackathon, or talk request. We will provide funding and logistic support to host it.
              </p>
              <div class={styles.ctaAction}>
                <BrutalButton href="/connect" variant="outline" class={styles.ctaBtn}>
                  PITCH IT TO US →
                </BrutalButton>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }
})
