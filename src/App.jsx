import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { fetchSearchId, fetchTickets } from './store/reducers/tickets/ticketsSlice'
import Filter from './components/Filter/Filter'
import Tabs from './components/Tabs/Tabs'
import TicketCard from './components/TicketCard/TicketCard'
import styles from './styles/App.module.scss'
import { createSelector } from '@reduxjs/toolkit'

const selectFilteredTickets = createSelector(
    (state) => state.tickets.tickets,
    (state) => state.filters,
    (tickets, filters) => {
        return tickets.filter((ticket) => {
            const stops = ticket.segments[0].stops.length
            return (
                (filters.all || filters.noStops || filters.oneStop || filters.twoStops || filters.threeStops) &&
                (filters.all ||
                    (filters.noStops && stops === 0) ||
                    (filters.oneStop && stops === 1) ||
                    (filters.twoStops && stops === 2) ||
                    (filters.threeStops && stops === 3))
            )
        })
    }
)

const selectSortedTickets = createSelector(
    selectFilteredTickets,
    (state) => state.sort,
    (tickets, sort) => {
        const sortedTickets = [...tickets]
        switch (sort) {
            case 'cheapest':
                sortedTickets.sort((a, b) => a.price - b.price)
                break
            case 'fastest':
                sortedTickets.sort((a, b) => a.segments[0].duration - b.segments[0].duration)
                break
            case 'optimal':
                sortedTickets.sort((a, b) => {
                    const metricA = a.price + a.segments[0].duration
                    const metricB = b.price + b.segments[0].duration
                    return metricA - metricB
                })
                break
            default:
                break
        }
        return sortedTickets
    }
)

function App() {
    const dispatch = useDispatch()
    const { error, allLoaded } = useSelector((state) => state.tickets)
    const tickets = useSelector(selectSortedTickets)

    // Состояние для количества отображаемых билетов
    const [visibleCount, setVisibleCount] = useState(5)

    useEffect(() => {
        dispatch(fetchSearchId()).then((action) => {
            if (action.payload) {
                dispatch(fetchTickets(action.payload))
            }
        })
    }, [dispatch])

    if (error) {
        return <div>Error: {error}</div>
    }

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 5)
    }

    return (
        <div className={styles.app}>
            <div className={styles.logo}>
                <img src="src/images/svg/logo.svg" alt="Aviasales" />
            </div>
            <div className={styles.content}>
                <aside className={styles.sidebar}>
                    <Filter />
                </aside>
                <main className={styles.main}>
                    <Tabs />
                    <div className={styles.tickets}>
                        {tickets.slice(0, visibleCount).map((ticket) => (
                            <TicketCard key={ticket.id} ticket={ticket} />
                        ))}
                    </div>
                    {!allLoaded && <Spin indicator={
                                    <LoadingOutlined
                                        style={{
                                            fontSize: 48,
                                        }}
                                        spin
                                    />}
                                         size="large" />}
                    {visibleCount < tickets.length && (
                        <button type="button" className={styles.showMore} onClick={handleShowMore}>
                            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
                        </button>
                    )}
                </main>
            </div>
        </div>
    )
}

export default App
