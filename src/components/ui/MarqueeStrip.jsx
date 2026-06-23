import { defineComponent } from 'vue'
import styles from './MarqueeStrip.module.css'

export default defineComponent({
  name: 'MarqueeStrip',
  props: {
    items: { type: Array, required: true },
    bg: { type: String, default: 'var(--orange)' },
    color: { type: String, default: 'var(--white)' },
    speed: { type: Number, default: 20 }
  },
  setup(props) {
    return () => {
      const duplicatedItems = [...props.items, ...props.items]
      return (
        <div 
          class={styles.marquee} 
          style={{ backgroundColor: props.bg, color: props.color }}
        >
          <div 
            class="marquee-track" 
            style={{ '--speed': `${props.speed}s` }}
          >
            {duplicatedItems.map((item, index) => (
              <span key={index} class={`${styles.item} text-label`}>
                {item}
                <span class={styles.bullet}>•</span>
              </span>
            ))}
          </div>
        </div>
      )
    }
  }
})
