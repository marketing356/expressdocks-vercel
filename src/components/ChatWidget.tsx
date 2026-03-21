'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Show speech bubble after 3 seconds
  useEffect(() => {
    const dismissed = sessionStorage.getItem('wadeBubbleDismissed');
    if (dismissed) {
      setBubbleDismissed(true);
      return;
    }
    
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowBubble(true);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Hide bubble when chat opens
  useEffect(() => {
    if (isOpen) {
      setShowBubble(false);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const dismissBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBubble(false);
    setBubbleDismissed(true);
    sessionStorage.setItem('wadeBubbleDismissed', 'true');
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }]
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble connecting. Please call us at 800-370-2285!" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes wadeBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        
        @keyframes wadePing {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        @keyframes bubbleSlideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes bubbleWiggle {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(0) rotate(-2deg); }
          75% { transform: translateY(0) rotate(2deg); }
        }
        
        @keyframes bubblePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .wade-bounce {
          animation: wadeBounce 2s ease-in-out infinite;
        }
        
        .wade-ping {
          animation: wadePing 2s ease-out infinite;
        }
        
        .bubble-enter {
          animation: bubbleSlideUp 0.4s ease-out forwards, bubbleWiggle 0.5s ease-in-out 0.4s, bubblePulse 2s ease-in-out 0.9s infinite;
        }
      `}</style>

      <div className="fixed bottom-6 right-6 z-50">
        {/* Speech Bubble */}
        {showBubble && !bubbleDismissed && !isOpen && (
          <div className="bubble-enter absolute bottom-20 right-0 w-72 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100">
            {/* Bubble Arrow */}
            <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45 border-r border-b border-gray-100"></div>
            
            {/* Close Button */}
            <button
              onClick={dismissBubble}
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Bubble Content */}
            <p className="text-gray-800 text-sm font-medium pr-4">
              Hey! 👋 I'm Wade — your dock guru. Got questions? I'm here!
            </p>
          </div>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-[#0a1628] rounded-2xl shadow-2xl overflow-hidden border border-cyan-500/30">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Mini Wade Face */}
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xl">👷</span>
                </div>
                <div>
                  <h3 className="text-white font-bold">💬 Wade</h3>
                  <p className="text-cyan-100 text-xs">ExpressDocks Dock Guru</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-[#0a1628]">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-8">
                  <p className="text-2xl mb-2">👷‍♂️</p>
                  <p className="text-sm">Hey there! I'm Wade.</p>
                  <p className="text-xs mt-1">Ask me anything about docks!</p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 rounded-2xl px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-700 bg-[#0d1d33]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your question..."
                  className="flex-1 bg-gray-700 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Wade Avatar Button */}
        <div className="relative">
          {/* Ping Ring */}
          <div className="absolute inset-0 rounded-full bg-cyan-400 wade-ping"></div>
          
          {/* Main Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`wade-bounce relative w-[70px] h-[70px] rounded-full bg-[#00D4FF] shadow-lg hover:shadow-cyan-500/50 transition-shadow flex items-center justify-center group ${isOpen ? 'ring-4 ring-cyan-300' : ''}`}
            aria-label={isOpen ? 'Close chat' : 'Open chat with Wade'}
          >
            {isOpen ? (
              /* Close Icon when open */
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              /* Wade Face with Hard Hat */
              <div className="relative flex flex-col items-center">
                {/* Hard Hat */}
                <div className="absolute -top-1 w-10 h-5 bg-[#FFD700] rounded-t-full border-b-2 border-yellow-600 shadow-sm">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-yellow-600 rounded-full mt-0.5"></div>
                </div>
                {/* Face */}
                <div className="mt-3 text-2xl">
                  <span className="block text-white font-bold" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    😊
                  </span>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
