import { useState } from 'react'
import styles from '../styles/Message.module.css'

function renderMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
}

export function Message({ role, content }) {
  const isUser = role === 'user'
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`${styles.row} ${isUser ? styles.rowUser : ''}`}>
      {!isUser && (
        <div className={`${styles.avatar} ${styles.avatarBot}`}>
          🎓
        </div>
      )}

      <div className={styles.messageWrapper}>
        <div
          className={`${styles.bubble} ${
            isUser ? styles.bubbleUser : styles.bubbleBot
          }`}
          dangerouslySetInnerHTML={{
            __html: isUser
              ? content
              : renderMarkdown(content)
          }}
        />

        <button
          className={`${styles.copyBtn} ${
            isUser ? styles.copyBtnUser : styles.copyBtnBot
          }`}
          onClick={handleCopy}
          title="Copy message"
        >
          {copied ? '✅ Copied!' : '📋 Copy'}
        </button>
      </div>

      {isUser && (
        <div className={`${styles.avatar} ${styles.avatarUser}`}>
          👤
        </div>
      )}
    </div>
  )
}

export function TypingIndicator() {
  return (
    <div className={styles.row}>
      <div className={`${styles.avatar} ${styles.avatarBot}`}>
        🎓
      </div>
      <div className={styles.typingBubble}>
        <div className={styles.dot} />
        <div className={styles.dot} />
        <div className={styles.dot} />
      </div>
    </div>
  )
}