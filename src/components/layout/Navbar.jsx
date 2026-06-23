import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import BrutalButton from '../ui/BrutalButton.jsx'
import iedcLogo from '../../assets/iedc-logo.png'
import styles from './Navbar.module.css'

export default defineComponent({
  name: 'Navbar',
  setup() {
    const isScrolled = ref(false)
    const isMobileMenuOpen = ref(false)
    const route = useRoute()

    const handleScroll = () => {
      isScrolled.value = window.scrollY > 80
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      handleScroll()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }

    const links = [
      { name: 'HOME', path: '/' },
      { name: 'ABOUT', path: '/about' },
      { name: 'EVENTS', path: '/events' },
      { name: 'TEAM', path: '/team' },
      { name: 'WiTe', path: '/wite' },
      { name: 'CONNECT', path: '/connect' }
    ]

    return () => {
      const isWite = route.path === '/wite'
      return (
        <nav 
          class={`${styles.navbar} ${isScrolled.value ? styles.scrolled : ''} ${isWite ? styles.witeNavbar : ''}`}
        >
          <div class={`${styles.container} container`}>
            <RouterLink to="/" class={styles.logoLink} onClick={closeMobileMenu}>
              <img src={iedcLogo} alt="IEDC RIT" class={styles.logoSvg} />
            </RouterLink>

            <div class={styles.desktopLinks}>
              {links.map(link => {
                const isActive = route.path === link.path
                return (
                  <RouterLink 
                    key={link.path}
                    to={link.path}
                    class={`${styles.navLink} ${isActive ? styles.activeLink : ''} ${link.name === 'WiTe' ? styles.witeLink : ''}`}
                  >
                    {link.name}
                  </RouterLink>
                )
              })}
            </div>

            <div class={styles.rightSection}>
              <div class={styles.navAction}>
                <BrutalButton href="/connect" class={styles.joinBtn}>
                  JOIN US →
                </BrutalButton>
              </div>

              <button 
                class={`${styles.hamburger} ${isMobileMenuOpen.value ? styles.hamburgerActive : ''}`} 
                onClick={toggleMobileMenu}
                aria-label="Toggle Navigation"
              >
                <span class={styles.bar}></span>
                <span class={styles.bar}></span>
                <span class={styles.bar}></span>
              </button>
            </div>
          </div>

          <div class={`${styles.mobileMenu} ${isMobileMenuOpen.value ? styles.mobileMenuOpen : ''}`}>
            <div class={styles.mobileLinks}>
              {links.map(link => {
                const isActive = route.path === link.path
                return (
                  <RouterLink 
                    key={link.path}
                    to={link.path}
                    class={`${styles.mobileNavLink} ${isActive ? styles.mobileActiveLink : ''}`}
                    onClick={closeMobileMenu}
                  >
                    {link.name}
                  </RouterLink>
                )
              })}
              <div class={styles.mobileJoinBtn}>
                <BrutalButton href="/connect" onClick={closeMobileMenu}>
                  JOIN US →
                </BrutalButton>
              </div>
            </div>
          </div>
        </nav>
      )
    }
  }
})
