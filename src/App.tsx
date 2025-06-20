import React, { useState, useEffect, useRef } from 'react';

// Placeholder for the n8n webhook URL for Ella.
// CORRECTED: Using import.meta.env for Vite
const ELLA_N8N_WEBHOOK_URL = import.meta.env.VITE_ELLA_N8N_WEBHOOK_URL || 'YOUR_ELLA_N8N_WEBHOOK_URL_PLACEHOLDER';
// Placeholder for the Contact Form n8n webhook URL.
// CORRECTED: Using import.meta.env for Vite
const CONTACT_FORM_N8N_WEBHOOK_URL = import.meta.env.VITE_CONTACT_FORM_N8N_WEBHOOK_URL || 'YOUR_CONTACT_FORM_N8N_WEBHOOK_URL_PLACEHOLDER';

interface Message {
  id: number;
  sender: 'Ella' | 'User';
  content: string;
  time: string;
  typing: boolean;
  audioData?: string;
  storyText?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Ella', content: "Hi there! I'm Ella, your AI assistant. How can I help you today? You can ask about our services, or I can narrate an inspirational, sci-fi, or even a revenge story for you!", time: '10:00 AM', typing: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  
  // Contact Form State
  const [contactForm, setContactForm] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const testimonials = [
    {
      id: 1,
      name: "Alex Morgan",
      role: "CMO @ TechFusion",
      content: "Optiverse transformed our marketing strategy with their AI-powered campaigns. Our ROI increased by 300% in just 3 months!",
      avatar: "https://picsum.photos/seed/alex/200/200"
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Founder @ CreativeHub",
      content: "The video automation capabilities are mind-blowing. We're creating 10x more content with half the effort.",
      avatar: "https://picsum.photos/seed/sarah/200/200"
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Marketing Director @ GlobalBrand",
      content: "Ella handles our scheduling and client communications flawlessly. It's like having a 24/7 digital assistant.",
      avatar: "https://picsum.photos/seed/james/200/200"
    }
  ];

  const services = [
    {
      id: 1,
      title: "AI Video Automation",
      description: "Create viral-ready videos and short movies using our ComfyUI pipeline integrated with Google Gemini's TTS and advanced editing capabilities.",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6L12 18M12 6C12 4.89543 12.8954 4 14 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H14C12.8954 20 12 19.1046 12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 8H8M4 16H8M4 12H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Social Media Mastery",
      description: "Automate content creation, scheduling, and audience engagement across all major platforms using our AI-powered tools.",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.5 12C16.5 14.2091 14.7091 16 12.5 16C10.2909 16 8.5 14.2091 8.5 12C8.5 9.79086 10.2909 8 12.5 8C14.7091 8 16.5 9.79086 16.5 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 16V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "SEO-Optimized Content",
      description: "Generate search engine optimized prompts and content strategies that guarantee visibility and engagement.",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6V12L16 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "Workflow Automation",
      description: "Seamlessly integrate Google Sheets, Calendar, Slack, and Cloud services using our n8n-powered automation pipelines.",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  const sendMessageToElla = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessageContent = inputMessage;
    const newUserMessage: Message = {
      id: Date.now(),
      sender: 'User',
      content: userMessageContent,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      typing: false
    };

    setMessages(prev => [...prev.filter(m => !m.typing), newUserMessage]);
    setInputMessage('');

    const ellaTypingId = Date.now() + 1;
    setMessages(prev => [...prev, {
      id: ellaTypingId,
      sender: 'Ella',
      content: "Typing...",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      typing: true
    }]);

    if (ELLA_N8N_WEBHOOK_URL === 'YOUR_ELLA_N8N_WEBHOOK_URL_PLACEHOLDER') {
      console.warn("Ella n8n webhook URL is not configured. Using mock response. Please set VITE_ELLA_N8N_WEBHOOK_URL in your environment."); // Updated suggestion
      setTimeout(() => {
        setMessages(prev => prev.filter(m => m.id !== ellaTypingId));
        setMessages(prev => [...prev, {
          id: Date.now() + 2,
          sender: 'Ella',
          content: "Sorry, my connection to the n8n brain is not set up. This is a mock response. (Configure VITE_ELLA_N8N_WEBHOOK_URL)", // Updated suggestion
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          typing: false
        }]);
      }, 1500);
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout

    try {
      const response = await fetch(ELLA_N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessageContent }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      setMessages(prev => prev.filter(m => m.id !== ellaTypingId)); 

      if (!response.ok) {
        const errorData = await response.text();
        console.error("N8n response error:", response.status, errorData);
        throw new Error(`Network response was not ok: ${response.status}. ${errorData}`);
      }

      const data = await response.json();
      const aiReplyContent = data.reply || "Sorry, I couldn't process that. Please try again.";
      
      const ellaResponseMessage: Message = {
        id: Date.now() + 2,
        sender: 'Ella',
        content: aiReplyContent,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        typing: false,
        audioData: data.audioData,
        storyText: data.storyText
      };
      setMessages(prev => [...prev, ellaResponseMessage]);

    } catch (error: any) {
      clearTimeout(timeoutId);
      setMessages(prev => prev.filter(m => m.id !== ellaTypingId));
      let errorMessage = "I'm having a bit of trouble connecting right now. Please try again later.";
      if (error.name === 'AbortError') {
        errorMessage = "The connection to Ella timed out. Please try again.";
      }
      console.error("Error sending message to Ella (n8n):", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 2,
        sender: 'Ella',
        content: errorMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        typing: false
      }]);
    }
  };
  
  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessage(null);

    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      setFormMessage({ type: 'error', text: 'Please fill out all fields.' });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      setFormMessage({ type: 'error', text: 'Please enter a valid email address.'});
      return;
    }

    setFormSubmitting(true);

    if (CONTACT_FORM_N8N_WEBHOOK_URL === 'YOUR_CONTACT_FORM_N8N_WEBHOOK_URL_PLACEHOLDER') {
      console.warn("Contact form n8n webhook URL is not configured. Simulating submission. Please set VITE_CONTACT_FORM_N8N_WEBHOOK_URL in your environment."); // Updated suggestion
      setTimeout(() => {
        setFormMessage({ type: 'success', text: 'Thank you! Your message has been sent (simulated).' });
        setContactForm({ name: '', email: '', message: '' });
        setFormSubmitting(false);
      }, 1000);
      return;
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 second timeout

    try {
      const response = await fetch(CONTACT_FORM_N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Network response was not ok: ${response.status}. ${errorData}`);
      }
      // const responseData = await response.json(); // Assuming n8n sends back a useful JSON response
      setFormMessage({ type: 'success', text: 'Thank you! Your message has been sent.' });
      setContactForm({ name: '', email: '', message: '' });
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error("Error submitting contact form:", error);
      let userError = 'Failed to send message. Please try again later.';
      if (error.name === 'AbortError') {
        userError = "The request timed out. Please check your connection and try again."
      }
      setFormMessage({ type: 'error', text: userError });
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleNavClick = (sectionId: string) => {
    setActiveTab(sectionId);
    if (sectionId === 'chat') {
        const contactSection = document.getElementById('contact'); 
        if (contactSection) { 
            const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
            const elementPosition = contactSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
             window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        return; 
    }

    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  
  const ChatWindow = () => (
    <div className={`fixed bottom-24 right-6 md:right-8 w-80 md:w-96 h-[calc(100vh-12rem)] max-h-[600px] ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg shadow-xl flex flex-col transition-all duration-300 z-50`}>
        <div className={`p-3 border-b ${darkMode ? 'border-gray-700 bg-gray-800/80' : 'border-gray-200 bg-gray-50/80'} rounded-t-lg flex justify-between items-center`}>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Chat with Ella</h3>
            <button 
                onClick={() => setActiveTab('home')} 
                aria-label="Close chat"
                className={`p-1 rounded-full ${darkMode ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-800'}`}
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>
        </div>

        <div className="flex-grow p-4 space-y-3 overflow-y-auto">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-2.5 rounded-lg shadow ${msg.sender === 'User' 
                        ? `bg-emerald-500 text-white rounded-br-none` 
                        : `${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'} rounded-bl-none`}`
                    }>
                        {msg.typing ? (
                            <div className="flex items-center space-x-1">
                                <span className="sr-only">Typing</span>
                                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce animation-delay-100"></div>
                                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce animation-delay-200"></div>
                                <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce animation-delay-300"></div>
                            </div>
                        ) : (
                          <>
                            <p className="text-sm">{msg.content}</p>
                            {msg.audioData && (
                              <div className="mt-2">
                                <audio controls src={`data:audio/mp3;base64,${msg.audioData}`} className="w-full h-10">
                                  Your browser does not support the audio element.
                                </audio>
                              </div>
                            )}
                            {msg.storyText && msg.audioData && (
                              <details className="mt-2 text-xs">
                                <summary className="cursor-pointer hover:underline">Show story text</summary>
                                <p className="mt-1 whitespace-pre-wrap">{msg.storyText}</p>
                              </details>
                            )}
                          </>
                        )}
                        {!msg.typing && (
                            <p className={`text-xs mt-1 ${msg.sender === 'User' ? 'text-emerald-200' : (darkMode ? 'text-gray-400' : 'text-gray-500')}`}>
                                {msg.time}
                            </p>
                        )}
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessageToElla} className={`p-3 border-t ${darkMode ? 'border-gray-700 bg-gray-800/80' : 'border-gray-200 bg-gray-50/80'} rounded-b-lg flex items-center`}>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                aria-label="Chat message input"
                className={`flex-grow p-2.5 border rounded-lg focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500'}`}
            />
            <button type="submit" aria-label="Send message" className={`ml-2 p-2.5 rounded-lg text-white ${darkMode ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-purple-600 hover:bg-purple-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'focus:ring-emerald-500 focus:ring-offset-gray-800' : 'focus:ring-purple-500 focus:ring-offset-white'}`}>
                <svg className="w-5 h-5 transform rotate-45" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 16.571V11a1 1 0 112 0v5.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            </button>
        </form>
    </div>
  );


  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${darkMode ? 'bg-gray-900/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button onClick={() => handleNavClick('home')} className="flex-shrink-0 flex items-center focus:outline-none" aria-label="Optiverse AI Home">
                <svg className="h-8 w-8 text-emerald-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-emerald-500 to-purple-600 bg-clip-text text-transparent">Optiverse AI</span>
              </button>
              <div className="hidden md:ml-6 md:flex md:space-x-1">
                {['home', 'services', 'workflow', 'pricing', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    aria-label={`Go to ${item} section`}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                      activeTab === item 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : darkMode ? 'hover:bg-gray-700/80 hover:text-emerald-400' : 'hover:bg-gray-200 hover:text-emerald-600'
                    } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setDarkMode(!darkMode)}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                className={`p-2 rounded-full transition-colors duration-150 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'focus:ring-offset-gray-900 focus:ring-emerald-500' : 'focus:ring-offset-white focus:ring-purple-600'}`}
              >
                {darkMode ? (
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
               <button 
                onClick={() => setActiveTab(prev => prev === 'chat' ? 'home' : 'chat')} 
                aria-label={activeTab === 'chat' ? "Close chat with Ella" : "Open chat with Ella"}
                className={`ml-3 p-2 rounded-full transition-colors duration-150 relative ${darkMode ? 'hover:bg-gray-700 text-emerald-400' : 'hover:bg-gray-200 text-purple-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${darkMode ? 'focus:ring-offset-gray-900 focus:ring-emerald-500' : 'focus:ring-offset-white focus:ring-purple-600'}`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.74 8.74 0 01-4.086-.986Ob-3.203a1 1 0 00-.62.928V18a1 1 0 001 1h1.086A8.997 8.997 0 0010 19c4.418 0 8-3.134 8-7s-3.582-7-8-7H8c-1.175 0-2.281.24-3.287.676a1 1 0 00-.58.904L4 8a1 1 0 001 1h5c.552 0 1 .448 1 1s-.448 1-1 1H5a3 3 0 01-3-3V4a1 1 0 011-1h1c1.316 0 2.574.274 3.713.776A8.007 8.007 0 0110 3c4.418 0 8 3.134 8 7zM7 7a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16"> 
        <section id="home" className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              Welcome to <span className="bg-gradient-to-r from-emerald-500 to-purple-600 bg-clip-text text-transparent">Optiverse AI</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-400">
              AI-driven solutions for Marketing, Video, and Automation. Let's elevate your business to the next dimension.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button onClick={() => handleNavClick('services')} className={`px-8 py-3 rounded-lg font-semibold text-lg transition-transform transform hover:scale-105 ${darkMode ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>
                Discover Our Services
              </button>
              <button onClick={() => handleNavClick('contact')} className={`px-8 py-3 rounded-lg font-semibold text-lg transition-transform transform hover:scale-105 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-emerald-400' : 'bg-gray-200 hover:bg-gray-300 text-purple-600'}`}>
                Get In Touch
              </button>
            </div>
          </div>
        </section>

        <section id="services" className="py-16 md:py-24 bg-opacity-20" style={{backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.5)' : 'rgba(243, 244, 246, 0.5)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">Our Core Services</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">Powering your growth with intelligent automation and creative AI.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service) => (
                <div key={service.id} className={`p-6 rounded-xl shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl ${darkMode ? 'bg-gray-800 hover:shadow-emerald-500/30' : 'bg-white hover:shadow-purple-500/30'}`}>
                  <div className={`mb-4 inline-flex items-center justify-center p-3 rounded-full ${darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-purple-500/20 text-purple-600'}`}>
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section id="workflow" className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Streamlined AI Workflow</h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Our process ensures seamless integration and maximum impact, from concept to deployment.
            </p>
            <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50 transform -translate-y-1/2"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {['Consultation', 'AI Development', 'Integration & Launch'].map((step, index) => (
                        <div key={index} className={`p-6 rounded-lg shadow-lg relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${darkMode ? 'bg-emerald-600' : 'bg-purple-600'}`}>
                                {index + 1}
                            </div>
                            <h3 className="text-xl font-semibold mt-6 mb-2">{step}</h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {index === 0 && "Understanding your needs and defining project scope."}
                                {index === 1 && "Building custom AI models and automation pipelines."}
                                {index === 2 && "Deploying solutions and providing ongoing support."}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-16 md:py-24 bg-opacity-20" style={{backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.5)' : 'rgba(243, 244, 246, 0.5)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">Flexible Pricing Plans</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">Choose the plan that best fits your needs. Custom enterprise solutions available.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              <div className={`p-8 rounded-xl shadow-xl flex flex-col ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <h3 className="text-2xl font-semibold mb-1">Starter</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>For individuals & small projects</p>
                <div className="text-4xl font-bold mb-1">$49<span className={`text-base font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>/mo</span></div>
                <ul className={`space-y-2 my-6 flex-grow ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-center"><svg className={`w-4 h-4 mr-2 ${darkMode ? 'text-emerald-500' : 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>1 AI Workflow</li>
                  <li className="flex items-center"><svg className={`w-4 h-4 mr-2 ${darkMode ? 'text-emerald-500' : 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Basic AI Video Tools</li>
                  <li className="flex items-center"><svg className={`w-4 h-4 mr-2 ${darkMode ? 'text-emerald-500' : 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Community Support</li>
                </ul>
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${darkMode ? 'bg-gray-700 hover:bg-emerald-600 text-white' : 'bg-gray-200 hover:bg-purple-600 hover:text-white text-purple-700'}`}>Get Started</button>
              </div>
              <div className={`p-8 rounded-xl shadow-2xl flex flex-col relative overflow-hidden ${darkMode ? 'bg-gray-800 border-2 border-emerald-500' : 'bg-white border-2 border-purple-600'}`}>
                <div className={`absolute top-0 right-0 px-4 py-1 text-xs font-semibold tracking-wider uppercase rounded-bl-lg ${darkMode ? 'bg-emerald-500 text-gray-900' : 'bg-purple-600 text-white'}`}>Popular</div>
                <h3 className="text-2xl font-semibold mb-1">Pro</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>For growing businesses</p>
                <div className="text-4xl font-bold mb-1">$199<span className={`text-base font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>/mo</span></div>
                 <ul className={`space-y-2 my-6 flex-grow ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-center"><svg className={`w-4 h-4 mr-2 ${darkMode ? 'text-emerald-500' : 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>5 AI Workflows</li>
                  <li className="flex items-center"><svg className={`w-4 h-4 mr-2 ${darkMode ? 'text-emerald-500' : 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Advanced AI Video Suite</li>
                  <li className="flex items-center"><svg className={`w-4 h-4 mr-2 ${darkMode ? 'text-emerald-500' : 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Social Media Automation</li>
                  <li className="flex items-center"><svg className={`w-4 h-4 mr-2 ${darkMode ? 'text-emerald-500' : 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Priority Support</li>
                </ul>
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${darkMode ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>Choose Pro</button>
              </div>
              <div className={`p-8 rounded-xl shadow-xl flex flex-col ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                <h3 className="text-2xl font-semibold mb-1">Enterprise</h3>
                <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>For large scale operations</p>
                <div className="text-3xl font-bold mb-1">Custom</div>
                 <ul className={`space-y-2 my-6 flex-grow ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-center"><svg className={`w-4 h-4 mr-2 ${darkMode ? 'text-emerald-500' : 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Unlimited Workflows</li>
                  <li className="flex items-center"><svg className={`w-4 h-4 mr-2 ${darkMode ? 'text-emerald-500' : 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Full API Access</li>
                  <li className="flex items-center"><svg className={`w-4 h-4 mr-2 ${darkMode ? 'text-emerald-500' : 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Dedicated Account Manager</li>
                  <li className="flex items-center"><svg className={`w-4 h-4 mr-2 ${darkMode ? 'text-emerald-500' : 'text-purple-500'}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>Custom Integrations</li>
                </ul>
                <button onClick={() => handleNavClick('contact')} className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${darkMode ? 'bg-gray-700 hover:bg-emerald-600 text-white' : 'bg-gray-200 hover:bg-purple-600 hover:text-white text-purple-700'}`}>Contact Sales</button>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">What Our Clients Say</h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">Real results from businesses transformed by Optiverse AI.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <p className={`italic mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img className="w-12 h-12 rounded-full mr-4" src={testimonial.avatar} alt={testimonial.name} />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className={`text-sm ${darkMode ? 'text-emerald-400' : 'text-purple-600'}`}>{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-16 md:py-24 bg-opacity-20" style={{backgroundColor: darkMode ? 'rgba(17, 24, 39, 0.5)' : 'rgba(243, 244, 246, 0.5)'}}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">Get in Touch</h2>
              <p className="text-lg text-gray-400">Have questions or ready to start your AI journey? We'd love to hear from you.</p>
            </div>
            <form onSubmit={handleContactSubmit} className={`p-8 rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
                  <input type="text" name="name" id="name" value={contactForm.name} onChange={handleContactFormChange} required className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500'}`} placeholder="Your Name" />
                </div>
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
                  <input type="email" name="email" id="email" value={contactForm.email} onChange={handleContactFormChange} required className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500'}`} placeholder="you@example.com" />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message</label>
                <textarea name="message" id="message" value={contactForm.message} onChange={handleContactFormChange} rows={4} required className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500'}`} placeholder="How can we help you?"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" disabled={formSubmitting} className={`px-10 py-3 rounded-lg font-semibold text-lg transition-colors ${darkMode ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'} disabled:opacity-60 disabled:cursor-wait`}>
                  {formSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
              {formMessage && (
                <p className={`mt-4 text-center text-sm ${formMessage.type === 'success' ? (darkMode ? 'text-emerald-400' : 'text-green-600') : (darkMode ? 'text-red-400' : 'text-red-600')}`}>
                  {formMessage.text}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      {activeTab === 'chat' && <ChatWindow />}

      <footer className={`py-8 ${darkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-gray-100 border-t border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} Optiverse AI. All rights reserved.
          </p>
          <p className={`mt-1 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Powered by Innovation & Intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;