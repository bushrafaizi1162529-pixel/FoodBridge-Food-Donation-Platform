import React, { useState, useEffect, useRef } from 'react';
import Groq from 'groq-sdk';
import { Sparkles, X, MessageSquare, Mic, Send, Bot, ArrowLeft } from 'lucide-react';
import { useFoodBridge } from '../context/FoodBridgeContext';

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { language } = useFoodBridge();

  // Read from Vite environment variable
  const apiKey = (import.meta as any).env.VITE_GROQ_API_KEY;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setIsLoading(true);

    try {
      const API_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:5000';
      let replyText = '';

      // 1. Try secure backend endpoint first (keeps API key protected on server)
      try {
        const res = await fetch(`${API_URL}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, language })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.reply) {
            replyText = data.reply;
          }
        }
      } catch (backendErr) {
        // Backend not reachable, fall back if client key available
      }

      // 2. Fall back to client-side SDK if direct key is explicitly configured
      if (!replyText && apiKey) {
        const systemInstruction = `You are a helpful Food Rescue Expert AI Assistant. The user's language preference code is '${language}'. 
If they provide a food donation scenario (e.g. "I have 20 vegetable biryani packets prepared at 1 PM"), you must respond strictly using this format:
- Category: [Cooked Food/Raw/Packaged]
- Estimated Safe Duration: [hours]
- Suggested Expiry: [Time]
- Recommended Action: [Donate within X hours]

For all other questions, be helpful, concise, and focused on food rescue, donation, and safety.`;

        const groq = new Groq({ apiKey, dangerouslyAllowBrowser: true });
        const completion = await groq.chat.completions.create({
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: text }
          ],
          model: "llama-3.1-8b-instant",
          temperature: 0.2
        });
        replyText = completion.choices[0]?.message?.content || '';
      }

      if (!replyText) {
        replyText = "AI Assistant is running in offline demo mode. To enable live Groq AI responses, please configure GROQ_API_KEY in the backend environment.";
      }

      setMessages(prev => [...prev, { role: 'model', text: replyText }]);

      // Voice output
      const utterance = new SpeechSynthesisUtterance(replyText);
      window.speechSynthesis.speak(utterance);

    } catch (err: any) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: `Error: ${err.message || 'Could not connect to AI.'}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListen = () => {
    if (isListening) return;
    
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'en' ? 'en-US' : 'en-IN'; // Simplification for demo
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans">
      
      {/* Floating Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative group"
        >
          <Sparkles className="w-6 h-6 text-white" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-pulse" />
          <div className="absolute -top-10 right-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-[10px] font-bold px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask Food Assistant
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[500px] bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white mr-1 cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Food Rescue AI</h3>
                <p className="text-white/80 text-[10px]">Powered by Groq Llama 3</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 dark:text-gray-500 text-xs mt-10">
                <Bot className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p>Hello! I can classify your food and give expiry suggestions.</p>
                <p className="mt-2 text-[10px] italic">Try: "I have 20 vegetable biryani packets prepared at 1 PM"</p>
              </div>
            )}
            
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2 text-xs leading-relaxed ${m.role === 'user' ? 'bg-orange-600 text-white rounded-br-none' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-700'}`}>
                  {m.text.split('\n').map((line, j) => <p key={j}>{line}</p>)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-none px-4 py-3 flex space-x-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 flex items-center space-x-2">
            <button 
              onClick={toggleListen}
              className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200'}`}
            >
              <Mic className="w-4 h-4" />
            </button>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your scenario..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-xs text-gray-900 dark:text-white placeholder-gray-400"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white rounded-full transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
