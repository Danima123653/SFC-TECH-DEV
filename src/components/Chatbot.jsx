import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react'

export default function Chatbot({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi there! I am FreshBot, your neighborhood market helper. How can I assist you with local produce or market hours today?'
    }
  ])
  const messagesEndRef = useRef(null)

  const quickPrompts = [
    'Which markets are open today?',
    'What produce is in season?',
    'How do I bookmark a market?',
    'Where is organic kale available?'
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isTyping, isOpen])

 
  const resolveAnswer = (rawQuery) => {
    const query = rawQuery.toLowerCase()

    if (query.includes('open') || query.includes('hours') || query.includes('today')) {
      return 'You can spot open markets instantly by looking for the green "Open Now" badge. Check out the Market Directory tab and toggle the "Open Now Only" filter!'
    }
    
    if (query.includes('season') || query.includes('harvest') || query.includes('month')) {
      return 'We are currently highlighting sweet strawberries, heirloom tomatoes, and crisp wild greens! Head over to the Seasonal page to browse by Spring, Summer, Autumn, or Winter.'
    }

    if (query.includes('bookmark') || query.includes('save') || query.includes('favorite')) {
      return 'Click the heart icon on any market or fruit/vegetable card. Your favorites are saved to your browser and can be exported as JSON or a text report on the Bookmarks page!'
    }

    if (query.includes('kale') || query.includes('apple') || query.includes('vegetable') || query.includes('fruit')) {
      return 'Check our Produce Guide! You can filter by Fruits, Vegetables, Herbs, Grains, or Dairy to see which local markets stock them.'
    }

    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return 'Hey! Looking for crisp veggies, orchard fruits, or an artisan market near your area?'
    }

    return 'Great question! FreshFind tracks 10+ local markets with live hours and produce availability. Feel free to explore our Market Directory or check the Seasonal guide.'
  }

  const handleSendMessage = (text) => {
    const messageText = text || input
    if (!messageText.trim()) return

    const userMessage = { sender: 'user', text: messageText }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

   
    setTimeout(() => {
      const botResponse = { sender: 'bot', text: resolveAnswer(messageText) }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 550)
  }

  return (
    <div className="chatbot-floating">
      {!isOpen && (
        <button
          className="chatbot-btn"
          onClick={() => setIsOpen(true)}
          title="Chat with FreshBot"
          aria-label="Open FreshBot Assistant"
        >
          <MessageSquare size={26} />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>FreshBot Assistant</div>
                <div style={{ fontSize: '0.72rem', color: '#a7f3d0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} /> Online
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ color: 'var(--white)', opacity: 0.85, padding: '4px' }}
              aria-label="Close chat window"
            >
              <X size={18} />
            </button>
          </div>

        
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className="typing-indicator">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          
          <div className="chat-pills">
            {quickPrompts.map((promptText, idx) => (
              <button 
                key={idx} 
                className="chat-pill" 
                onClick={() => handleSendMessage(promptText)}
              >
                {promptText}
              </button>
            ))}
          </div>

          
          <div className="chat-input-area">
            <input
              type="text"
              placeholder="Ask about markets, hours, produce..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              className="btn-primary"
              style={{ padding: '8px 14px', borderRadius: 'var(--radius-full)' }}
              onClick={() => handleSendMessage()}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
