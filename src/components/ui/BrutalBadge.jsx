import { defineComponent } from 'vue'
import styles from './BrutalBadge.module.css'

export default defineComponent({
  name: 'BrutalBadge',
  props: {
    bg: { type: String, default: '' }
  },
  setup(props, { slots }) {
    return () => (
      <span 
        class={`brutal-tag ${styles.badge}`}
        style={{ backgroundColor: props.bg ? props.bg : undefined }}
      >
        {slots.default ? slots.default() : null}
      </span>
    )
  }
})
