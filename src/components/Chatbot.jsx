import { useState, useRef, useEffect } from 'react'
import styles from '../styles/Chatbot.module.css'
import { Message, TypingIndicator } from './Message'
import { sendToClaudeAPI } from '../utils/api'
import { QUICK_QUESTIONS, WELCOME_MESSAGE } from '../utils/constants'

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: WELCOME_MESSAGE },
  ])
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async (text) => {
    const userText = (text || input).trim()
    if (!userText || loading) return

    setInput('')

    const updated = [
      ...messages, 
      { role: 'user', content: userText }
    ]
    setMessages(updated)
    setLoading(true)

    try {
      const history = updated.map(m => ({ 
        role: m.role, 
        content: m.content 
      }))
      const reply = await sendToClaudeAPI(history)
      setMessages([
        ...updated, 
        { role: 'assistant', content: reply }
      ])
    } catch (err) {
      setMessages([
        ...updated,
        {
          role: 'assistant',
          content: `⚠️ ${err.message}\n\nFor urgent queries please call KLEIT: 0836 223 2681`,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className={styles.chatbox}>

      {/* Messages */}
      <div className={styles.messages}>
        {messages.map((msg, i) => (
          <Message 
            key={i} 
            role={msg.role} 
            content={msg.content} 
          />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Quick Questions */}
      <div className={styles.quickWrap}>
        {QUICK_QUESTIONS.map(q => (
          <button
            key={q}
            className={styles.quickBtn}
            onClick={() => handleSend(q)}
            disabled={loading}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className={styles.inputArea}>
        <textarea
          className={styles.textarea}
          rows={2}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about admissions, courses, fees, eligibility…"
          disabled={loading}
        />
        <button
          className={styles.sendBtn}
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          aria-label="Send message"
        >
          ✈️
        </button>
      </div>

    </div>
  )
}
