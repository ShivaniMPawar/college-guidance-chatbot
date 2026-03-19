import { SYSTEM_PROMPT } from './constants'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL =`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`

export async function sendToClaudeAPI(messages) {
  if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
    throw new Error(
      'API key not configured. Please set VITE_GEMINI_API_KEY in your .env file.'
    )
  }

  // Convert messages to Gemini format
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }))

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      }
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(
      err?.error?.message || `API error: ${response.status}`
    )
  }

  const data = await response.json()
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    'No response received.'
  )
}