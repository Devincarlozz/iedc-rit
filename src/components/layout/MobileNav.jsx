import { defineComponent } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import styles from './MobileNav.module.css'

export default defineComponent({
  name: 'MobileNav',
  setup() {
    const route = useRoute()

    const navItems = [
      {
        name: 'Home',
        path: '/',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        )
      },
      {
        name: 'About',
        path: '/about',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
        )
      },
      {
        name: 'Events',
        path: '/events',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        )
      },
      {
        name: 'WiTe',
        path: '/wite',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        )
      },
      {
        name: 'Connect',
        path: '/connect',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )
      }
    ]

    return () => (
      <div class={styles.mobileNav}>
        <div class={styles.container}>
          {navItems.map(item => {
            const isActive = route.path === item.path
            return (
              <RouterLink
                key={item.path}
                to={item.path}
                class={`${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                <span class={styles.icon}>{item.icon}</span>
                <span class={styles.label}>{item.name}</span>
              </RouterLink>
            )
          })}
        </div>
      </div>
    )
  }
})
