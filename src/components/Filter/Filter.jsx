import styles from './Filter.module.scss'

const Filter = () => {
  return (
    <div className={styles.filter}>
      <h2 className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h2>
      <div className={styles.options}>
        <label className={styles.option}>
          <input type="checkbox" value="all" />
          <span>Все</span>
        </label>
        <label className={styles.option}>
          <input type="checkbox" value="0" />
          <span>Без пересадок</span>
        </label>
        <label className={styles.option}>
          <input type="checkbox" value="1" />
          <span>1 пересадка</span>
        </label>
        <label className={styles.option}>
          <input type="checkbox" value="2" />
          <span>2 пересадки</span>
        </label>
        <label className={styles.option}>
          <input type="checkbox" value="3" />
          <span>3 пересадки</span>
        </label>
      </div>
    </div>
  )
}

export default Filter
