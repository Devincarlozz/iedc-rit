import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { events } from '../../data/events.js'
import SectionTitle from '../ui/SectionTitle.jsx'
import BrutalCard from '../ui/BrutalCard.jsx'
import BrutalBadge from '../ui/BrutalBadge.jsx'
import BrutalButton from '../ui/BrutalButton.jsx'
import styles from './EventsSection.module.css'

export default defineComponent({
  name: 'EventsSection',
  props: {
    limit: { type: Number, default: 0 },
    showTitle: { type: Boolean, default: true }
  },
  setup(props) {
    const activeTab = ref('ALL')
    const sectionRef = ref(null)

    const tabs = ['ALL', 'HACKATHON', 'WORKSHOP', 'PITCH', 'TALK']

    const filteredEvents = computed(() => {
      let list = events
      if (activeTab.value !== 'ALL') {
        list = events.filter(e => e.tag === activeTab.value)
      }
      if (props.limit > 0) {
        list = list.slice(0, props.limit)
      }
      return list
    })

    const observeReveal = (el) => {
      if (!el) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.disconnect()
        }
      }, { threshold: 0.1 })
      observer.observe(el)
      return observer
    }

    let observerInstance = null

    onMounted(() => {
      observerInstance = observeReveal(sectionRef.value)
    })

    onUnmounted(() => {
      if (observerInstance) observerInstance.disconnect()
    })

    return () => (
      <section ref={sectionRef} class={`${styles.eventsSection} container reveal`}>
        {props.showTitle ? (
          <SectionTitle accentText="UPCOMING" text="EVENTS" />
        ) : null}

        {props.limit === 0 ? (
          <div class={styles.tabs}>
            {tabs.map(tab => (
              <button
                key={tab}
                class={`${styles.tabBtn} ${activeTab.value === tab ? styles.activeTab : ''}`}
                onClick={() => activeTab.value = tab}
              >
                {tab}
              </button>
            ))}
          </div>
        ) : null}

        <div class={styles.grid}>
          {filteredEvents.value.map((event, index) => (
            <div 
              key={event.id} 
              class={styles.cardContainer}
              style={{ '--i': index }}
            >
              <BrutalCard glass={true} class={styles.eventCard}>
                <div class={styles.imageWrapper}>
                  <img 
                    src={event.img} 
                    alt={event.title}
                    class={styles.image}
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="400"
                  />
                </div>
                <div class={styles.cardContent}>
                  <div class={styles.tagWrapper}>
                    <BrutalBadge>{event.tag}</BrutalBadge>
                    {event.status === 'Registration Open' ? (
                      <span class={styles.liveBadge}>
                        <span class="pulse-dot"></span>
                        <span class={styles.liveLabel}>REGISTRATION OPEN</span>
                      </span>
                    ) : null}
                  </div>
                  <h3 class={`${styles.eventTitle} text-heading`}>{event.title}</h3>
                  <p class={`${styles.meta} text-label`}>
                    {event.date} · {event.location}
                  </p>
                  <p class={`${styles.desc} text-body`}>{event.desc}</p>
                  <div class={styles.btnWrapper}>
                    <BrutalButton href="/connect" class={styles.registerBtn}>
                      REGISTER →
                    </BrutalButton>
                  </div>
                </div>
              </BrutalCard>
            </div>
          ))}
        </div>
      </section>
    )
  }
})
