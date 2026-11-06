import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { TRANSLATIONS } from '../constants/translations';
import { Mail, Phone, MapPin, Send, HelpCircle, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const ContactFAQ: React.FC = () => {
  const { language } = useFoodBridge();
  const t = TRANSLATIONS[language];

  // FAQ Accordion toggles
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormName('');
      setFormEmail('');
      setFormMsg('');
    }, 1500);
  };

  const faqData = [
    { num: 1, q: t.faq.q1, a: t.faq.a1 },
    { num: 2, q: t.faq.q2, a: t.faq.a2 },
    { num: 3, q: t.faq.q3, a: t.faq.a3 },
    { num: 4, q: t.faq.q4, a: t.faq.a4 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans text-left space-y-16">
      
      {/* 1. FREQUENTLY ANSWERED QUERIES (ACCORDION SECTION) */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600 bg-orange-100/40 dark:bg-orange-950/20 px-2.5 py-0.5 rounded-full inline-block">
            Support Desk
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            {t.faq.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {t.faq.subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={faq.num}
                className="rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm transition-all"
              >
                {/* Header toggle click strip */}
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left font-extrabold text-gray-900 dark:text-white flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-55"
                >
                  <span className="text-xs sm:text-sm leading-snug">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-orange-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {/* Answer body */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-50 dark:border-gray-850 animate-fade-in font-semibold">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. CONTACT FORM AND INFO CARDS SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-gray-100 dark:border-gray-900">
        
        {/* Info Column side */}
        <div className="md:col-span-5 space-y-6">
          <div className="space-y-3">
            <h3 className="text-xl font-black text-gray-900 dark:text-white">Establish Direct Touch</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Have questions regarding corporate marriage catering partnership, or volunteer fleet driver setups? Send us a direct query today.
            </p>
          </div>

          <div className="space-y-4 text-xs font-semibold text-gray-700 dark:text-gray-300">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-gray-900 dark:text-white">Headquarters Command Depot</p>
                <p className="text-gray-500 dark:text-gray-400 mt-1 leading-normal">
                  Venkateshwara Hills Road Phase 2, Gachibowli Outer Corridor, Hyderabad, TS, India
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-gray-900 dark:text-white">Hotline Response Desk</p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  +91 (40) 2993-4552 (Standard support hours: 9 AM to 11 PM IST)
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-gray-900 dark:text-white">Operations Email Hub</p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  allies@foodbridge.community.org
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messaging Form Column side */}
        <div className="md:col-span-7 rounded-3xl border border-gray-150 dark:border-gray-850 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4 text-green-600">
              <CheckCircle2 className="w-12 h-12 mx-auto animate-bounce" />
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Message Dispatched!</h4>
              <p className="text-xs text-gray-400">Our logistics operations coordinators will review your mail ticket and respond shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <h4 className="text-sm font-black uppercase text-orange-600 tracking-wide">Write Operational Query</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g., Amit Kumar"
                    className="w-full px-4 py-2 bg-transparent border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-950 dark:text-gray-100"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Your Email</label>
                  <input 
                    type="email" 
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="amit@cater.co"
                    className="w-full px-4 py-2 bg-transparent border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-950 dark:text-gray-100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Specific message</label>
                <textarea 
                  rows={3}
                  required
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  placeholder="Tell us what you would like to help with..."
                  className="w-full px-4 py-2 bg-transparent border border-gray-200 dark:border-gray-800 rounded-xl text-xs text-gray-950 dark:text-gray-100"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-xs font-bold flex items-center justify-center space-x-1 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 shrink-0" />
                <span>Submit Query Ticket</span>
              </button>
            </form>
          )}
        </div>

      </section>

    </div>
  );
};
