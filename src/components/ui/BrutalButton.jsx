import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { sanitizeUrl } from '../../utils/security.js'
import styles from './BrutalButton.module.css'

export default defineComponent({
  name: 'BrutalButton',
  props: {
    type: { type: String, default: 'button' },
    variant: { type: String, default: 'primary' },
    href: { type: String, default: '' },
    target: { type: String, default: '' },
    rel: { type: String, default: '' }
  },
  setup(props, { slots }) {
    const btnRef = ref(null)

    const handleMouseMove = (e) => {
      const btn = btnRef.value
      if (!btn) return
      
      const el = btn.$el || btn // handle RouterLink ref wrapping ($el)
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
      el.style.transition = 'none'
    }

    const handleMouseLeave = () => {
      const btn = btnRef.value
      if (!btn) return
      const el = btn.$el || btn
      el.style.transform = 'translate(0px, 0px)'
      el.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
    }

    const isExternal = (url) => {
      return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('#')
    }

    return () => {
      const className = props.variant === 'outline' ? 'brutal-btn-outline' : 'brutal-btn'
      if (props.href) {
        const safeHref = sanitizeUrl(props.href)
        if (isExternal(safeHref)) {
          const safeRel = props.target === '_blank' && !props.rel
            ? 'noopener noreferrer'
            : props.rel
          return (
            <a
              ref={btnRef}
              href={safeHref}
              target={props.target}
              rel={safeRel}
              class={`${className} ${styles.btn}`}
              onMousemove={handleMouseMove}
              onMouseleave={handleMouseLeave}
            >
              {slots.default ? slots.default() : null}
            </a>
          )
        } else {
          return (
            <RouterLink
              ref={btnRef}
              to={safeHref}
              class={`${className} ${styles.btn}`}
              onMousemove={handleMouseMove}
              onMouseleave={handleMouseLeave}
            >
              {slots.default ? slots.default() : null}
            </RouterLink>
          )
        }
      }
      return (
        <button
          ref={btnRef}
          type={props.type}
          class={`${className} ${styles.btn}`}
          onMousemove={handleMouseMove}
          onMouseleave={handleMouseLeave}
        >
          {slots.default ? slots.default() : null}
        </button>
      )
    }
  }
})

