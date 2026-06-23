import { defineComponent, ref, computed, onMounted } from 'vue'
import { team } from '../data/team.js'
import { sanitizeUrl } from '../utils/security.js'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import BrutalCard from '../components/ui/BrutalCard.jsx'
import BrutalButton from '../components/ui/BrutalButton.jsx'
import Footer from '../components/layout/Footer.jsx'
import styles from './TeamPage.module.css'

export default defineComponent({
  name: 'TeamPage',
  setup() {
    const sectionRefs = ref([])

    const nodalOfficer = computed(() => team.find(m => m.category === 'nodal'))
    const execCommittee = computed(() => team.filter(m => m.category === 'exec'))
    const coreTeam = computed(() => team.filter(m => m.category === 'core'))

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
      <div class={styles.teamPage}>
        <header class={styles.hero}>
          <div class="container">
            <p class={`${styles.breadcrumb} text-label`}>HOME / TEAM</p>
            <h1 class={`${styles.heroTitle} text-hero`}>MEET THE CREW</h1>
            <p class={`${styles.subline} text-mono`}>// The builders, developers, and visionaries of RIT</p>
          </div>
        </header>

        {nodalOfficer.value ? (
          <section 
            ref={el => el && sectionRefs.value.push(el)} 
            class={`${styles.nodalSection} container reveal`}
          >
            <SectionTitle accentText="FACULTY" text="ADVISOR" />
            <BrutalCard glass={true} class={styles.nodalCard}>
              <div class={styles.nodalGrid}>
                <div class={styles.nodalPhotoWrapper}>
                  <img 
                    src={nodalOfficer.value.img} 
                    alt={nodalOfficer.value.name}
                    class={styles.nodalPhoto}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="400"
                  />
                </div>
                <div class={styles.nodalInfo}>
                  <span class={`${styles.nodalRole} text-label`}>{nodalOfficer.value.role}</span>
                  <h3 class={`${styles.nodalName} text-heading`}>{nodalOfficer.value.name}</h3>
                  <p class="text-body">
                    Dr. Anoop K provides strategic direction, research mentorship, and ecosystem alignment for IEDC RIT. With over a decade of academic and industrial innovation experience, he guides students in converting concepts into intellectual property and startup initiatives.
                  </p>
                  <div class={styles.socials}>
                    <a href={sanitizeUrl(nodalOfficer.value.linkedin)} target="_blank" rel="noopener noreferrer" class={styles.socialBtn}>IN</a>
                    <a href={sanitizeUrl(nodalOfficer.value.instagram)} target="_blank" rel="noopener noreferrer" class={styles.socialBtn}>IG</a>
                  </div>
                </div>
              </div>
            </BrutalCard>
          </section>
        ) : null}

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.execSection} container reveal`}
        >
          <SectionTitle accentText="EXECUTIVE" text="COMMITTEE" />
          <div class={styles.execGrid}>
            {execCommittee.value.map((member, index) => (
              <div key={member.id} class={styles.cardContainer} style={{ '--i': index }}>
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
                    <a href={sanitizeUrl(member.linkedin)} target="_blank" rel="noopener noreferrer" class={styles.socialBtn}>IN</a>
                    <a href={sanitizeUrl(member.instagram)} target="_blank" rel="noopener noreferrer" class={styles.socialBtn}>IG</a>
                  </div>
                </BrutalCard>
              </div>
            ))}
          </div>
        </section>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.coreSection} container reveal`}
        >
          <SectionTitle accentText="CORE" text="LEADS" />
          <div class={styles.coreGrid}>
            {coreTeam.value.map((member, index) => (
              <div key={member.id} class={styles.cardContainer} style={{ '--i': index }}>
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
                  <h3 class={`${styles.coreName} text-heading`}>{member.name}</h3>
                  <p class={`${styles.coreRole} text-label`}>{member.role}</p>
                  <div class={styles.socials}>
                    <a href={sanitizeUrl(member.linkedin)} target="_blank" rel="noopener noreferrer" class={styles.socialBtn}>IN</a>
                    <a href={sanitizeUrl(member.instagram)} target="_blank" rel="noopener noreferrer" class={styles.socialBtn}>IG</a>
                  </div>
                </BrutalCard>
              </div>
            ))}
          </div>
        </section>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.ctaSection} container reveal`}
        >
          <BrutalCard bg="var(--orange)" class={styles.ctaCard}>
            <div class={styles.ctaContent}>
              <h2 class={`${styles.ctaTitle} text-display`}>WANT TO BE PART OF THE CREW?</h2>
              <p class="text-body">
                We recruit new executive committee members and tech leads every academic year. Apply to manage events, lead designs, or manage tech labs.
              </p>
              <div class={styles.ctaAction}>
                <BrutalButton href="/connect" variant="outline">
                  APPLY FOR RECRUITMENT →
                </BrutalButton>
              </div>
            </div>
          </BrutalCard>
        </section>

        <Footer />
      </div>
    )
  }
})
