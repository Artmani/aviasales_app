import styles from './Tabs.module.scss'

function Tabs() {
  return (
    <div className={styles.tabs}>
      <button type="button" className={`${styles.tab} ${styles.active}`}>
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button type="button" className={styles.tab}>
        САМЫЙ БЫСТРЫЙ
      </button>
      <button type="button" className={styles.tab}>
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  )
}

export default Tabs
