import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/layout/Navbar.jsx'
import MobileNav from './components/layout/MobileNav.jsx'
import './styles/global.css'
import './styles/brutalism.css'
import './styles/animations.css'
import styles from './App.module.css'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div class={styles.appWrapper}>
        <Navbar />
        <main class={styles.mainContent}>
          <RouterView />
        </main>
        <MobileNav />
      </div>
    )
  }
})
