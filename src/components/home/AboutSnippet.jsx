import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import BrutalCard from '../ui/BrutalCard.jsx'
import BrutalButton from '../ui/BrutalButton.jsx'
import styles from './AboutSnippet.module.css'

export default defineComponent({
  name: 'AboutSnippet',
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
      <section class={`${styles.aboutSection} container`}>
        <div ref={sectionRef} class={`${styles.cardWrapper} reveal`}>
          <BrutalCard bg="var(--white)">
            <div class={styles.grid}>
              <div class={styles.leftCol}>
                <h2 class={`${styles.verticalTitle} text-display`}>ABOUT US</h2>
              </div>
              <div class={styles.rightCol}>
                <h3 class={`${styles.heading} text-heading`}>Fostering Innovation and Entrepreneurial Spirits at RIT</h3>
                <p class="text-body">
                  The Innovation & Entrepreneurship Development Cell (IEDC) of Rajiv Gandhi Institute of Technology is an active student-run community dedicated to bridging the gap between academic learning and industry creation.
                </p>
                <p class="text-body">
                  We empower tomorrow's creators by providing access to cutting-edge technology, seed fund advice, business modeling workshops, and mentorship from startup ecosystem leaders in Kerala.
                </p>
                <div class={styles.cta}>
                  <BrutalButton href="/about">
                    LEARN MORE ABOUT US →
                  </BrutalButton>
                </div>
              </div>
            </div>
          </BrutalCard>
        </div>
      </section>
    )
  }
})
