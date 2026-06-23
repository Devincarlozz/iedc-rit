import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import BrutalCard from '../ui/BrutalCard.jsx'
import BrutalButton from '../ui/BrutalButton.jsx'
import styles from './ConnectSection.module.css'

export default defineComponent({
  name: 'ConnectSection',
  setup() {
    const sectionRef = ref(null)

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
      observerInstance = observeReveal(sectionRef.value)
    })

    onUnmounted(() => {
      if (observerInstance) observerInstance.disconnect()
    })

    return () => (
      <section ref={sectionRef} class={`${styles.connectSection} container reveal`}>
        <BrutalCard bg="var(--yellow)" class={styles.card}>
          <div class={styles.content}>
            <h2 class={`${styles.title} text-display`}>HAVE AN IDEA? LET'S BUILD IT.</h2>
            <p class={`${styles.subtitle} text-body`}>
              Join IEDC RIT today and get access to labs, mentorship, and funding opportunities.
            </p>
            <div class={styles.cta}>
              <BrutalButton href="/connect" variant="primary" class={styles.btn}>
                CONNECT WITH US →
              </BrutalButton>
            </div>
          </div>
        </BrutalCard>
      </section>
    )
  }
})
