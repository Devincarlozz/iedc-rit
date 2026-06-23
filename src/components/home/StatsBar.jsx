import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import styles from './StatsBar.module.css'

export default defineComponent({
  name: 'StatsBar',
  setup() {
    const containerRef = ref(null)
    const membersRef = ref(null)
    const eventsRef = ref(null)
    const startupsRef = ref(null)
    const yearsRef = ref(null)

    const countUp = (el, target, duration = 1500) => {
      let start = 0
      const step = target / (duration / 16)
      const tick = () => {
        start = Math.min(start + step, target)
        el.textContent = Math.floor(start) + '+'
        if (start < target) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    let observer = null

    onMounted(() => {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          if (membersRef.value) countUp(membersRef.value, 500)
          if (eventsRef.value) countUp(eventsRef.value, 25)
          if (startupsRef.value) countUp(startupsRef.value, 10)
          if (yearsRef.value) countUp(yearsRef.value, 5)
          observer.disconnect()
        }
      }, { threshold: 0.15 })

      if (containerRef.value) {
        observer.observe(containerRef.value)
      }
    })

    onUnmounted(() => {
      if (observer) observer.disconnect()
    })

    return () => (
      <section ref={containerRef} class={styles.statsBar}>
        <div class={`${styles.container} container`}>
          <div class={styles.statItem}>
            <span ref={membersRef} class={`${styles.number} text-hero`}>0+</span>
            <span class={`${styles.label} text-label`}>Members</span>
          </div>
          <div class={styles.divider}></div>
          <div class={styles.statItem}>
            <span ref={eventsRef} class={`${styles.number} text-hero`}>0+</span>
            <span class={`${styles.label} text-label`}>Events</span>
          </div>
          <div class={styles.divider}></div>
          <div class={styles.statItem}>
            <span ref={startupsRef} class={`${styles.number} text-hero`}>0+</span>
            <span class={`${styles.label} text-label`}>Startups Incubated</span>
          </div>
          <div class={styles.divider}></div>
          <div class={styles.statItem}>
            <span ref={yearsRef} class={`${styles.number} text-hero`}>0+</span>
            <span class={`${styles.label} text-label`}>Years Strong</span>
          </div>
        </div>
      </section>
    )
  }
})
