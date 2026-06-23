import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import SectionTitle from '../ui/SectionTitle.jsx'
import BrutalCard from '../ui/BrutalCard.jsx'
import BrutalBadge from '../ui/BrutalBadge.jsx'
import styles from './TestimonialsSection.module.css'

export default defineComponent({
  name: 'TestimonialsSection',
  setup() {
    const sectionRef = ref(null)

    const successStories = [
      {
        id: 1,
        name: 'Bhagath Krishnan',
        role: 'Founder',
        startup: 'DevSync',
        tag: 'DEV TOOLS',
        img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        quote: 'IEDC RIT gave us the raw support, workspace, and community feedback that turned a late-night side project into a funded developer tool.'
      },
      {
        id: 2,
        name: 'Joel Joseph',
        role: 'Co-founder',
        startup: 'Mechano',
        tag: 'HARDWARE',
        img: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        quote: 'The ideation bootcamps and funding advice helped us structure our hardware startup and build our first working prototype.'
      },
      {
        id: 3,
        name: 'Anjali Nair',
        role: 'Founder',
        startup: 'NutriTrack',
        tag: 'HEALTH TECH',
        img: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        quote: 'From pitching at HackRIT to securing our first pilot clients, the startup ecosystem here was absolutely instrumental.'
      }
    ]

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
      <section ref={sectionRef} class={`${styles.section} container reveal-stagger reveal`}>
        <SectionTitle accentText="SUCCESS" text="STORIES" />
        
        <div class={styles.grid}>
          {successStories.map((story, index) => (
            <div 
              key={story.id} 
              class={styles.cardWrapper} 
              style={{ '--i': index }}
            >
              <BrutalCard glass={true} class={styles.storyCard}>
                <div class={styles.header}>
                  <div class={styles.photoWrapper}>
                    <img 
                      src={story.img} 
                      alt={story.name} 
                      class={styles.photo}
                      loading="lazy"
                      width="60"
                      height="60"
                    />
                  </div>
                  <div class={styles.meta}>
                    <h3 class={`${styles.name} text-heading`}>{story.name}</h3>
                    <p class={`${styles.role} text-label`}>
                      {story.role} · <span class={styles.startup}>{story.startup}</span>
                    </p>
                  </div>
                </div>
                <div class={styles.quoteWrapper}>
                  <p class={`${styles.quote} text-body`}>“ {story.quote} ”</p>
                </div>
                <div class={styles.footer}>
                  <BrutalBadge bg="var(--yellow)">{story.tag}</BrutalBadge>
                </div>
              </BrutalCard>
            </div>
          ))}
        </div>
      </section>
    )
  }
})
