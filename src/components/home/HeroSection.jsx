import { defineComponent, ref, onMounted } from 'vue'
import BrutalButton from '../ui/BrutalButton.jsx'
import MarqueeStrip from '../ui/MarqueeStrip.jsx'
import styles from './HeroSection.module.css'

export default defineComponent({
  name: 'HeroSection',
  setup() {
    const isMounted = ref(false)

    onMounted(() => {
      isMounted.value = true
    })

    const marqueeItems = ['INNOVATE', 'IDEATE', 'BUILD', 'LAUNCH', 'CONNECT', 'STARTUP', 'PITCH', 'HACK']

    return () => (
      <header class={styles.hero}>
        <MarqueeStrip items={marqueeItems} bg="var(--orange)" color="var(--black)" speed={15} />
        
        <div class={`${styles.heroContent} container`}>
          <div class={`${styles.textBlock} ${isMounted.value ? styles.animate : ''}`}>
            <h1 class={`${styles.title} text-hero`}>
              <span class={styles.accentText}>iEDC</span> <span class={styles.whiteText}>RIT</span>
            </h1>
            <p class={`${styles.subline} text-label`}>
              // Innovation • Entrepreneurship • Design • Collaboration
            </p>
            <p class={`${styles.tagline} text-body`}>
              Building tomorrow's innovators, creators, and tech leaders at Rajiv Gandhi Institute of Technology.
            </p>
            <div class={styles.ctas}>
              <BrutalButton href="/connect" variant="primary">
                EXPLORE →
              </BrutalButton>
              <BrutalButton href="https://youtube.com" target="_blank" rel="noopener noreferrer" variant="outline">
                WATCH REEL ▶
              </BrutalButton>
            </div>
          </div>

          <div class={`${styles.visualBlock} ${isMounted.value ? styles.animate : ''}`}>
            <div class={`${styles.illustrationWrapper} float-animation`}>
              <svg viewBox="0 0 500 500" class={styles.svgIllustration}>
                <rect x="50" y="320" width="400" height="30" fill="#0D0D0D" stroke="#FAFAFA" stroke-width="5" />
                <polygon points="80,350 420,350 440,380 60,380" fill="#0D0D0D" stroke="#FAFAFA" stroke-width="5" />
                <rect x="80" y="100" width="340" height="220" fill="#3BBFBF" stroke="#0D0D0D" stroke-width="5" />
                <rect x="95" y="115" width="310" height="190" fill="#FAFAFA" stroke="#0D0D0D" stroke-width="4" />
                <line x1="110" y1="140" x2="200" y2="140" stroke="var(--orange)" stroke-width="8" stroke-linecap="round" />
                <line x1="110" y1="165" x2="250" y2="165" stroke="#0D0D0D" stroke-width="8" stroke-linecap="round" />
                <line x1="110" y1="190" x2="180" y2="190" stroke="#7C3AED" stroke-width="8" stroke-linecap="round" />
                <line x1="130" y1="215" x2="280" y2="215" stroke="#3BBFBF" stroke-width="8" stroke-linecap="round" />
                <line x1="130" y1="240" x2="220" y2="240" stroke="#0D0D0D" stroke-width="8" stroke-linecap="round" />
                <path d="M 400 120 C 370 120 370 160 380 180 L 380 200 L 420 200 L 420 180 C 430 160 430 120 400 120 Z" fill="#FFD60A" stroke="#0D0D0D" stroke-width="5" />
                <rect x="388" y="200" width="24" height="6" fill="var(--orange)" stroke="#0D0D0D" stroke-width="3" />
                <rect x="392" y="206" width="16" height="6" fill="#0D0D0D" />
                <path d="M 390 150 L 410 150" stroke="#0D0D0D" stroke-width="3" />
                <path d="M 400 140 L 400 160" stroke="#0D0D0D" stroke-width="3" />
                <g>
                  <path d="M 250 50 C 220 100 220 220 250 260 C 280 220 280 100 250 50 Z" fill="var(--orange)" stroke="#0D0D0D" stroke-width="5" />
                  <circle cx="250" cy="130" r="20" fill="#FAFAFA" stroke="#0D0D0D" stroke-width="5" />
                  <circle cx="250" cy="130" r="12" fill="#3BBFBF" />
                  <path d="M 224 200 L 190 250 L 225 240 Z" fill="#7C3AED" stroke="#0D0D0D" stroke-width="5" />
                  <path d="M 276 200 L 310 250 L 275 240 Z" fill="#7C3AED" stroke="#0D0D0D" stroke-width="5" />
                  <polygon points="235,260 250,300 265,260" fill="#FFD60A" stroke="#0D0D0D" stroke-width="4" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </header>
    )
  }
})
