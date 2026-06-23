import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import SectionTitle from '../components/ui/SectionTitle.jsx'
import BrutalCard from '../components/ui/BrutalCard.jsx'
import Footer from '../components/layout/Footer.jsx'
import styles from './AboutPage.module.css'

export default defineComponent({
  name: 'AboutPage',
  setup() {
    const sectionRefs = ref([])

    const timelineItems = [
      { year: '2019', title: 'Founded at RIT', desc: 'Established with a vision to build a thriving student entrepreneurship ecosystem.' },
      { year: '2020', title: 'First HackRIT', desc: 'Hosted the inaugural 24-hour campus hackathon with over 150+ participants.' },
      { year: '2021', title: 'Launched WiTe Initiative', desc: 'Introduced the Women in Technology & Entrepreneurship cell to empower female developers.' },
      { year: '2022', title: '100+ Member Milestone', desc: 'Grew the core membership to over 100 passionate builders and engineers.' },
      { year: '2023', title: 'First Startup Incubated', desc: 'Supported the first student-led SaaS platform to launch in the Kerala ecosystem.' },
      { year: '2024', title: 'National Recognition', desc: 'Awarded outstanding student chapter recognition from Kerala Startup Mission.' },
      { year: '2025', title: '500+ Community Members', desc: 'Fostered a community of half a thousand innovators active across multiple design streams.' }
    ]

    const awards = [
      { title: 'Best IEDC Chapter', year: '2024', agency: 'KSUM' },
      { title: 'Innovation Excellence', year: '2023', agency: 'RIT' },
      { title: 'Tech Community Award', year: '2025', agency: 'Startup India' }
    ]

    const affiliations = [
      { name: 'IEDC Kerala', logo: 'IK' },
      { name: 'KSUM', logo: 'KS' },
      { name: 'DST', logo: 'DS' },
      { name: 'Startup India', logo: 'SI' }
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
      <div class={styles.aboutPage}>
        <header class={styles.hero}>
          <div class="container">
            <p class={`${styles.breadcrumb} text-label`}>HOME / ABOUT</p>
            <h1 class={`${styles.heroTitle} text-hero`}>ABOUT IEDC RIT</h1>
            <p class={`${styles.subline} text-mono`}>// Empowering ideas, cultivating startup founders</p>
          </div>
        </header>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.missionSection} container reveal`}
        >
          <div class={styles.missionGrid}>
            <div class={styles.missionLeft}>
              <h2 class={styles.bebasQuote}>WE CULTIVATE LEADERSHIP AND RADICAL CREATIVITY.</h2>
            </div>
            <div class={styles.missionRight}>
              <h3 class="text-heading">Our Mission</h3>
              <p class="text-body">
                Our mission is to foster innovation, entrepreneurship, and product development skills among the students of Rajiv Gandhi Institute of Technology. We provide resources, workspace, seed funding advice, and corporate networking contacts to transform ideas into viable products and tech startups.
              </p>
            </div>
          </div>
        </section>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.visionSection} reveal`}
        >
          <div class="container">
            <div class={styles.visionGrid}>
              <div class={styles.visionLeft}>
                <h3 class="text-heading">Our Vision</h3>
                <p class="text-body">
                  We envision RIT as a leading hub for technological startups and sustainable social ventures in Kerala. By building an elite framework of product engineers, developers, and UI/UX designers, we seek to cultivate a self-sustaining innovation network.
                </p>
              </div>
              <div class={styles.visionRight}>
                <h2 class={`${styles.bebasQuote} ${styles.tealQuote}`}>WE RIDE THE EDGE OF THE NEXT TECHNOLOGY WAVE.</h2>
              </div>
            </div>
          </div>
        </section>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.timelineSection} container reveal`}
        >
          <SectionTitle accentText="OUR" text="HISTORY" />
          
          <div class={styles.timeline}>
            <div class={styles.timelineLine}></div>
            {timelineItems.map((item, index) => (
              <div 
                key={index} 
                class={`${styles.timelineItem} ${index % 2 === 0 ? styles.timelineLeft : styles.timelineRight}`}
              >
                <div class={styles.timelineDot}></div>
                <div class={styles.timelineContent}>
                  <BrutalCard bg="var(--white)" class={styles.timelineCard}>
                    <span class={`${styles.timelineYear} text-hero`}>{item.year}</span>
                    <h4 class="text-heading">{item.title}</h4>
                    <p class="text-body">{item.desc}</p>
                  </BrutalCard>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.awardsSection} container reveal`}
        >
          <SectionTitle accentText="AWARDS &" text="RECOGNITION" />
          <div class={styles.awardsGrid}>
            {awards.map((award, index) => (
              <BrutalCard key={index} bg="var(--yellow)" class={styles.awardCard}>
                <span class={`${styles.awardYear} text-label`}>{award.year}</span>
                <h4 class={`${styles.awardTitle} text-heading`}>{award.title}</h4>
                <p class={`${styles.awardAgency} text-label`}>ISSUED BY {award.agency}</p>
              </BrutalCard>
            ))}
          </div>
        </section>

        <section 
          ref={el => el && sectionRefs.value.push(el)} 
          class={`${styles.affiliationsSection} container reveal`}
        >
          <SectionTitle accentText="OUR" text="AFFILIATIONS" />
          <div class={styles.affiliationsGrid}>
            {affiliations.map((aff, index) => (
              <div key={index} class={styles.affiliateLogoCard}>
                <div class={styles.logoCircle}>{aff.logo}</div>
                <span class={`${styles.affName} text-label`}>{aff.name}</span>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    )
  }
})
