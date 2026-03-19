import styles from '../styles/InfoStrip.module.css'
import { INFO_CARDS } from '../utils/constants'

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=KLE+Institute+of+Technology+Hubli+Karnataka"

export default function InfoStrip() {
  const handleClick = (label) => {
    if (label === 'Location') {
      window.open(MAPS_URL, '_blank')
    }
    if (label === 'Call Us') {
      window.open('tel:08362232681')
    }
  }

  return (
    <div className={styles.strip}>
      {INFO_CARDS.map(card => (
        <div
          key={card.label}
          className={`${styles.card} ${
            card.label === 'Location' || 
            card.label === 'Call Us' 
              ? styles.clickable 
              : ''
          }`}
          onClick={() => handleClick(card.label)}
        >
          <div className={styles.icon}>{card.icon}</div>
          <div className={styles.label}>{card.label}</div>
          <div className={styles.value}>{card.value}</div>
          {card.label === 'Location' && (
            <div className={styles.hint}>
              Click to open Maps
            </div>
          )}
          {card.label === 'Call Us' && (
            <div className={styles.hint}>
              Click to call
            </div>
          )}
        </div>
      ))}
    </div>
  )
}