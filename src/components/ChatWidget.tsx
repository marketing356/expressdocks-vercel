'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const pathname = usePathname();
  const isConfiguratorPage = pathname?.includes('/configurator') || pathname?.includes('/dock3d');
  
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-show bubble after 3 seconds, but NOT on configurator pages
  useEffect(() => {
    const dismissed = sessionStorage.getItem('wadeBubbleDismissed');
    if (dismissed) {
      setBubbleDismissed(true);
      return;
    }
    
    if (isConfiguratorPage) {
      setShowBubble(false);
      return;
    }
    
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowBubble(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isOpen, isConfiguratorPage]);

  // Hide bubble when chat opens
  useEffect(() => {
    if (isOpen) {
      setShowBubble(false);
    }
  }, [isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      setMessages(prev => [...prev, { role: 'assistant', content: data.response || data.message || 'Sorry, I could not process that.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Suppress unused var warning
  void bubbleDismissed;

  return (
    <>
      {/* Speech Bubble - hidden on configurator pages */}
      {showBubble && !isOpen && !isConfiguratorPage && (
        <div 
          className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-xl p-4 max-w-xs z-40 cursor-pointer"
          onClick={() => { setShowBubble(false); setIsOpen(true); }}
        >
          <button
            onClick={dismissBubble}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-sm"
            aria-label="Dismiss"
          >
            ×
          </button>
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white transform rotate-45"></div>
          <p className="text-gray-800 text-sm font-medium">
            👋 Hi! I&apos;m Wade. Need help designing your dock?
          </p>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-300"
        aria-label="Chat with Wade"
      >
        {isOpen ? (
          <span style={{ fontSize: '22px', lineHeight: 1 }}>✕</span>
        ) : (
          <span style={{ fontSize: '26px', lineHeight: 1 }}>👷</span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-sky-600 text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-xl">
              👷
            </div>
            <div>
              <h3 className="font-semibold">Wade</h3>
              <p className="text-xs text-sky-100">ExpressDocks Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-4xl mb-2">👷</p>
                <p className="font-medium">Hi, I&apos;m Wade!</p>
                <p className="text-sm">Ask me anything about our aluminum docks.</p>
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
                      ? 'bg-sky-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2 text-gray-500">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask Wade a question..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-sky-500"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-sky-600 hover:bg-sky-700 disabled:bg-gray-300 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
