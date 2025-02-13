import React from 'react'

import Filter from './components/Filter/Filter'
import Tabs from './components/Tabs/Tabs'
import TicketCard from './components/TicketCard/TicketCard'
import styles from './styles/App.module.scss'

const mockTicket = [
  {
    id: 'ticket-1',
    price: 13400,
    carrier: 'S7',
    segments: [
      {
        id: 'seg-1-1',
        origin: 'MOW',
        destination: 'HKT',
        date: '2024-03-10T10:45:00.000Z',
        stops: ['HKG', 'JNB'],
        duration: 1275, // 21ч 15м
      },
      {
        id: 'seg-1-2',
        origin: 'HKT',
        destination: 'MOW',
        date: '2024-03-11T11:20:00.000Z',
        stops: ['HKG'],
        duration: 810, // 13ч 30м
      },
    ],
  },
  {
    id: 'ticket-2',
    price: 15600,
    carrier: 'SU',
    segments: [
      {
        id: 'seg-2-1',
        origin: 'MOW',
        destination: 'JFK',
        date: '2024-04-05T08:00:00.000Z',
        stops: ['LHR'],
        duration: 980, // 16ч 20м
      },
      {
        id: 'seg-2-2',
        origin: 'JFK',
        destination: 'MOW',
        date: '2024-04-12T15:00:00.000Z',
        stops: [],
        duration: 600, // 10ч 00м
      },
    ],
  },
  {
    id: 'ticket-3',
    price: 18200,
    carrier: 'BA',
    segments: [
      {
        id: 'seg-3-1',
        origin: 'MOW',
        destination: 'LON',
        date: '2024-05-15T12:30:00.000Z',
        stops: [],
        duration: 250, // 4ч 10м
      },
      {
        id: 'seg-3-2',
        origin: 'LON',
        destination: 'MOW',
        date: '2024-05-20T14:50:00.000Z',
        stops: ['FRA'],
        duration: 480, // 8ч 00м
      },
    ],
  },
]

function App() {
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
            {mockTicket.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
          <button type="button" className={styles.showMore}>
            ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
          </button>
        </main>
      </div>
    </div>
  )
}

export default App
