import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSort } from '../../../../../src/store/reducers/sort/sortSlice.js'

import styles from './Tabs.module.scss'

function Tabs() {
  const dispatch = useDispatch()
  const sort = useSelector((state) => state.sort)

  const handleSortChange = (newSort) => {
    dispatch(setSort(newSort))
  }

  return (
    <div className={styles.tabs}>
      <button
        type="button"
        className={`${styles.tab} ${sort === 'cheapest' ? styles.active : ''}`}
        onClick={() => handleSortChange('cheapest')}
      >
        САМЫЙ ДЕШЕВЫЙ
      </button>
      <button
        type="button"
        className={`${styles.tab} ${sort === 'fastest' ? styles.active : ''}`}
        onClick={() => handleSortChange('fastest')}
      >
        САМЫЙ БЫСТРЫЙ
      </button>
      <button
        type="button"
        className={`${styles.tab} ${sort === 'optimal' ? styles.active : ''}`}
        onClick={() => handleSortChange('optimal')}
      >
        ОПТИМАЛЬНЫЙ
      </button>
    </div>
  )
}
export default Tabs
