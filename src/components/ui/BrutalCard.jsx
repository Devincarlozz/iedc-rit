import { defineComponent } from 'vue'
import styles from './BrutalCard.module.css'

export default defineComponent({
  name: 'BrutalCard',
  props: {
    bg: { type: String, default: '' },
    borderColor: { type: String, default: '' },
    glass: { type: Boolean, default: false }
  },
  setup(props, { slots }) {
    return () => (
      <div 
        class={`brutal-card ${styles.card} ${props.glass ? styles.glass : ''}`} 
        style={{ 
          backgroundColor: props.bg && !props.glass ? props.bg : undefined,
          borderColor: props.borderColor ? props.borderColor : undefined
        }}
      >
        {slots.default ? slots.default() : null}
      </div>
    )
  }
})
