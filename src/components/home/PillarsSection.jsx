import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { pillars } from '../../data/pillars.js'
import SectionTitle from '../ui/SectionTitle.jsx'
import BrutalCard from '../ui/BrutalCard.jsx'
import styles from './PillarsSection.module.css'

export default defineComponent({
  name: 'PillarsSection',
  setup() {
    const containerRef = ref(null)

    const observeReveal = (el) => {
      if (!el) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.disconnect()
        }
      }, { threshold: 0.15 })
      observer.observe(el)
      return observer
    }

    let observerInstance = null

    onMounted(() => {
      observerInstance = observeReveal(containerRef.value)
    })

    onUnmounted(() => {
      if (observerInstance) observerInstance.disconnect()
    })

    const renderIcon = (name) => {
      const size = 36
      const color = 'var(--black)'
      if (name === 'bulb') {
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} stroke={color} stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .4 2.5 1.5 3.5.7.8 1.3 1.5 1.5 2.5" />
            <line x1="9" y1="18" x2="15" y2="18" />
            <line x1="10" y1="22" x2="14" y2="22" />
          </svg>
        )
      }
      if (name === 'rocket') {
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} stroke={color} stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
            <path d="M12 2C6.5 2 2 6.5 2 12c0 3.58 1.9 6.7 4.75 8.45.24-.72.63-1.4 1.15-2 .52-.6 1.14-1.1 1.83-1.48L12 12l5.03 5.03c.69-.38 1.3-.88 1.83-1.48.52-.6.9-1.28 1.15-2C22.1 18.7 24 15.58 24 12c0-5.5-4.5-10-10-10Z" />
            <path d="M9 15c-1.5-1.5-1.5-3.5-1.5-3.5s2 0 3.5 1.5" />
          </svg>
        )
      }
      if (name === 'pencil') {
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} stroke={color} stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
        )
      }
      if (name === 'hands') {
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} stroke={color} stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
            <rect x="3" y="4" width="18" height="12" rx="2" />
            <circle cx="12" cy="10" r="2" />
          </svg>
        )
      }
      return null
    }

    return () => (
      <section ref={containerRef} class={`${styles.pillarsSection} container reveal`}>
        <SectionTitle accentText="OUR" text="PILLARS" />
        
        <div class={styles.grid}>
          {pillars.map((pillar, index) => (
            <div 
              key={pillar.id} 
              class={styles.cardContainer}
              style={{ '--i': index }}
            >
              <BrutalCard bg={pillar.color} class={styles.pillarCard}>
                <div class={styles.iconWrapper}>
                  {renderIcon(pillar.icon)}
                </div>
                <h3 class={`${styles.title} text-heading`}>{pillar.title}</h3>
                <p class={`${styles.desc} text-body`}>{pillar.desc}</p>
              </BrutalCard>
            </div>
          ))}
        </div>
      </section>
    )
  }
})
