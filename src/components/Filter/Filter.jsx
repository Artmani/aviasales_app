import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFilter, toggleAllFilters } from '/src/store/reducers/filters/filtersSlice'
import styles from './Filter.module.scss'

const Filter = () => {
    const dispatch = useDispatch()
    const filters = useSelector((state) => state.filters)

    const handleFilterChange = (filter) => {
        dispatch(toggleFilter(filter))
    }

    const handleAllFiltersChange = () => {
        dispatch(toggleAllFilters())
    }

    useEffect(() => {
        if (Object.values(filters).filter(Boolean).length === 4) {
            dispatch(toggleAllFilters())
        }
    }, [filters, dispatch])

    return (
        <div className={styles.filter}>
            <h2 className={styles.title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h2>
            <div className={styles.options}>
                <label className={styles.option}>
                    <input
                        id="filter-all"
                        type="checkbox"
                        checked={filters.all}
                        onChange={handleAllFiltersChange}
                    />
                    <span>Все</span>
                </label>
                <label className={styles.option}>
                    <input
                        id="filter-noStops"
                        type="checkbox"
                        checked={filters.noStops}
                        onChange={() => handleFilterChange('noStops')}
                    />
                    <span>Без пересадок</span>
                </label>
                <label className={styles.option}>
                    <input
                        id="filter-oneStop"
                        type="checkbox"
                        checked={filters.oneStop}
                        onChange={() => handleFilterChange('oneStop')}
                    />
                    <span>1 пересадка</span>
                </label>
                <label className={styles.option}>
                    <input
                        id="filter-twoStops"
                        type="checkbox"
                        checked={filters.twoStops}
                        onChange={() => handleFilterChange('twoStops')}
                    />
                    <span>2 пересадки</span>
                </label>
                <label className={styles.option}>
                    <input
                        id="filter-threeStops"
                        type="checkbox"
                        checked={filters.threeStops}
                        onChange={() => handleFilterChange('threeStops')}
                    />
                    <span>3 пересадки</span>
                </label>
            </div>
        </div>
    )
}

export default Filter
