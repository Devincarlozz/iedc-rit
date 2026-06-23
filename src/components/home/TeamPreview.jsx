import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'
import { team } from '../../data/team.js'
import { sanitizeUrl } from '../../utils/security.js'
import SectionTitle from '../ui/SectionTitle.jsx'
import BrutalCard from '../ui/BrutalCard.jsx'
import styles from './TeamPreview.module.css'

export default defineComponent({
  name: 'TeamPreview',
  setup() {
    const sectionRef = ref(null)

    const execMembers = computed(() => {
      return team.filter(m => m.category === 'exec')
    })

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
      <section ref={sectionRef} class={`${styles.teamPreview} container reveal`}>
        <SectionTitle accentText="LEADERSHIP" text="TEAM" />
        
        <div class={styles.grid}>
          {execMembers.value.map((member, index) => (
            <div 
              key={member.id} 
              class={styles.cardContainer}
              style={{ '--i': index }}
            >
              <BrutalCard glass={true} class={styles.memberCard}>
                <div class={styles.photoWrapper}>
                  <img 
                    src={member.img} 
                    alt={member.name}
                    class={styles.photo}
                    loading="lazy"
                    decoding="async"
                    width="300"
                    height="300"
                  />
                </div>
                <h3 class={`${styles.name} text-heading`}>{member.name}</h3>
                <p class={`${styles.role} text-label`}>{member.role}</p>
                <div class={styles.socials}>
                  <a 
                    href={sanitizeUrl(member.linkedin)}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class={styles.socialBtn}
                    aria-label="LinkedIn"
                  >
                    IN
                  </a>
                  <a 
                    href={sanitizeUrl(member.instagram)}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class={styles.socialBtn}
                    aria-label="Instagram"
                  >
                    IG
                  </a>
                </div>
              </BrutalCard>
            </div>
          ))}
        </div>
      </section>
    )
  }
})
