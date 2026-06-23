import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.jsx'
import AboutPage from '../pages/AboutPage.jsx'
import EventsPage from '../pages/EventsPage.jsx'
import TeamPage from '../pages/TeamPage.jsx'
import ConnectPage from '../pages/ConnectPage.jsx'
import WitePage from '../pages/WitePage.jsx'

const routes = [
  {
    path: '/',
    component: HomePage,
    meta: { title: "IEDC RIT — Building Tomorrow's Innovators" }
  },
  {
    path: '/about',
    component: AboutPage,
    meta: { title: 'About — IEDC RIT' }
  },
  {
    path: '/events',
    component: EventsPage,
    meta: { title: 'Events — IEDC RIT' }
  },
  {
    path: '/team',
    component: TeamPage,
    meta: { title: 'Core Team — IEDC RIT' }
  },
  {
    path: '/connect',
    component: ConnectPage,
    meta: { title: 'Connect — IEDC RIT' }
  },
  {
    path: '/wite',
    component: WitePage,
    meta: { title: 'WiTe — Women in Technology & Entrepreneurship' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  document.title = to.meta.title || 'IEDC RIT'
})

export default router
