import styles from '../styles/Header.module.css'
import { BADGES } from '../utils/constants'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.icon}>
        <img
          src="https://www.kleit.ac.in/wp-content/uploads/2020/10/KLE-SOCIETY-LOGO.png"
          alt="KLEIT Logo"
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'contain',
            borderRadius: '50%',
          }}
        />
      </div>
      <div>
        <h1 className={styles.title}>
          KLE Institute of Technology
        </h1>
        <p className={styles.subtitle}>
          AI-Powered Admission Guidance Assistant
        </p>
        <div className={styles.badges}>
          {BADGES.map(b => (
            <span key={b} className={styles.badge}>
              {b}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
