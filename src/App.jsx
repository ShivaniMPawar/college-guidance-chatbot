import Chatbot from './components/Chatbot'
import Header from './components/Header'
import InfoStrip from './components/InfoStrip'

export default function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Chatbot />
      <InfoStrip />
      <p className="footer-note">
        KLEIT AdmissionBot • Powered by AI • 
        Always verify critical decisions with 
        the college directly
      </p>
    </div>
  )
}