import { defineComponent } from 'vue'
import HeroSection from '../components/home/HeroSection.jsx'
import MarqueeStrip from '../components/ui/MarqueeStrip.jsx'
import StatsBar from '../components/home/StatsBar.jsx'
import AboutSnippet from '../components/home/AboutSnippet.jsx'
import PillarsSection from '../components/home/PillarsSection.jsx'
import EventsSection from '../components/home/EventsSection.jsx'
import TeamPreview from '../components/home/TeamPreview.jsx'
import TestimonialsSection from '../components/home/TestimonialsSection.jsx'
import ConnectSection from '../components/home/ConnectSection.jsx'
import Footer from '../components/layout/Footer.jsx'

export default defineComponent({
  name: 'HomePage',
  setup() {
    const marqueeTeal = ['INNOVATE', 'IDEATE', 'BUILD', 'LAUNCH', 'CONNECT', 'STARTUP', 'PITCH', 'HACK']
    const marqueeOrange = ['CREATE', 'EMPOWER', 'MENTOR', 'COLLABORATE', 'DISRUPT', 'GROW', 'SCALE']

    return () => (
      <div>
        <HeroSection />
        <MarqueeStrip items={marqueeTeal} bg="var(--teal)" color="var(--black)" speed={20} />
        <StatsBar />
        <AboutSnippet />
        <PillarsSection />
        <MarqueeStrip items={marqueeOrange} bg="var(--orange)" color="var(--white)" speed={25} />
        <EventsSection limit={3} />
        <TeamPreview />
        <TestimonialsSection />
        <ConnectSection />
        <Footer />
      </div>
    )
  }
})
