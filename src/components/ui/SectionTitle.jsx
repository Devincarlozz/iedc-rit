import { defineComponent } from 'vue'
import styles from './SectionTitle.module.css'

export default defineComponent({
  name: 'SectionTitle',
  props: {
    accentText: { type: String, default: '' },
    text: { type: String, required: true },
    vertical: { type: Boolean, default: false }
  },
  setup(props) {
    return () => (
      <h2 class={`${styles.title} ${props.vertical ? styles.vertical : ''} text-display`}>
        {props.accentText ? (
          <span class={styles.accent}>{props.accentText}</span>
        ) : null}
        <span class={styles.text}>{props.text}</span>
      </h2>
    )
  }
})
