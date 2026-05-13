import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { sendChat } from '../services/api'

const QUICK_PROMPTS = [
  'How do I apply for a student visa?',
  'What scholarships are available for Indian students?',
  'Explain GRE requirements for US universities',
  'Best countries for affordable education',
  'How does education loan work?',
  'Tips for writing a great SOP',
]

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm EduCare AI — your education planning copilot. Ask me anything about universities, costs, visas, scholarships, or financial planning for studying abroad.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')

    const newMessages = [...messages, { role: 'user', content: msg }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const history = newMessages.slice(0, -1).map((m) => ({ role: m.role, content: m.content }))
      const { data } = await sendChat({ message: msg, history })
      setMessages([...newMessages, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, I couldn't connect to the server. Please make sure the backend is running on port 5001." }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="relative min-h-screen text-white flex flex-col">
      <Navbar />
      <div className="relative z-10 flex flex-col flex-1 px-6 md:px-12 lg:px-16 py-12 max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-blue-400 font-bold mb-3">Conversational AI</p>
          <h1 className="text-4xl font-bold tracking-tight">EduCare AI Copilot</h1>
          <p className="text-white/50 mt-2 text-sm">Your personal advisor for every step of your international journey.</p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-6 mb-8 pr-2 scroll-smooth" style={{ minHeight: '400px', maxHeight: '60vh' }}>
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] px-5 py-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-xl ${
                  m.role === 'user'
                    ? 'bg-white text-black font-medium rounded-tr-sm'
                    : 'glass-card rounded-tl-sm text-white/90 border-white/10'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="glass-card px-5 py-4 rounded-2xl rounded-tl-sm border-white/10">
                <div className="flex gap-1.5 items-center h-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Interaction Area */}
        <div className="mt-auto space-y-6">
          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2.5">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-xl glass-card border-white/5 text-white/40 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="glass-card flex items-end gap-4 p-4 rounded-3xl border-white/10 shadow-2xl">
            <textarea
              className="flex-1 bg-transparent text-sm text-white placeholder-white/20 outline-none resize-none py-2"
              rows={1}
              placeholder="Ask me about visas, universities, or financial planning..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              style={{ minHeight: '24px', maxHeight: '150px' }}
              onInput={(e) => {
                e.target.style.height = 'auto'
                e.target.style.height = e.target.scrollHeight + 'px'
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="bg-white text-black px-6 py-3 rounded-2xl text-xs font-bold hover:bg-white/90 transition-all disabled:opacity-20 shadow-lg shadow-white/5"
            >
              Send
            </button>
          </div>
          <p className="text-center text-[10px] text-white/20 font-medium uppercase tracking-widest">Powered by Gemini 3.5 AI Engine</p>
        </div>
      </div>
    </div>
  )
}
