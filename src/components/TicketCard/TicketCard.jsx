import { format, addMinutes } from 'date-fns'
import styles from './TicketCard.module.scss'

const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}ч ${mins}м`
}

const formatStops = (stops) => {
    if (stops.length === 0) return 'БЕЗ ПЕРЕСАДОК'
    if (stops.length === 1) return '1 ПЕРЕСАДКА'
    return `${stops.length} ПЕРЕСАДКИ`
}

const formatTime = (date) => format(new Date(date), 'HH:mm')

const getTimeRange = (date, duration) => {
    const startDate = new Date(date)
    const endDate = addMinutes(startDate, duration)
    return `${formatTime(startDate)} – ${formatTime(endDate)}`
}

function TicketCard({ ticket }) {
    const { price, carrier, segments } = ticket

    return (
        <div className={styles.ticket}>
            <div className={styles.header}>
                <span className={styles.price}>{price.toLocaleString('ru-RU')} Р</span>
                <img
                    src={`//pics.avs.io/99/36/${carrier}.png`}
                    alt={`${carrier} Airlines`}
                    className={styles.carrier}
                />
            </div>
            <div className={styles.segments}>
                {segments.map((segment, index) => (
                    <div key={`${ticket.id}-${index}`} className={styles.segment}>
                        <div className={styles.column}>
              <span className={styles.label}>
                {segment.origin} – {segment.destination}
              </span>
                            <span className={styles.value}>
                {getTimeRange(segment.date, segment.duration)}
              </span>
                        </div>
                        <div className={styles.column}>
                            <span className={styles.label}>В ПУТИ</span>
                            <span className={styles.value}>
                {formatDuration(segment.duration)}
              </span>
                        </div>
                        <div className={styles.column}>
              <span className={styles.label}>
                {formatStops(segment.stops)}
              </span>
                            <span className={styles.value}>
                {segment.stops.join(', ') || '—'}
              </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TicketCard
