import React, { useState, useEffect, useRef } from 'react';
import { Conversation, UserRole } from '../types/staynest';
import {
  MessageSquare,
  Send,
  X,
  Phone,
  ShieldCheck,
  Calendar,
} from 'lucide-react';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onSendMessage: (conversationId: string, text: string) => void;
  currentRole: UserRole;
  onOpenBookingModal?: (houseId: string) => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onSendMessage,
  currentRole,
  onOpenBookingModal,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    onSendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const handleQuickQuestion = (question: string) => {
    if (!activeConv) return;
    onSendMessage(activeConv.id, question);
  };

  const quickQuestions = [
    'Is there an available bedspace right now?',
    'Kumusta po ang water supply sa umaga?',
    'Pwede po ba mag-ocular visit tomorrow morning?',
    'Kasama na po ba ang kuryente at WiFi sa monthly rate?',
  ];

  return (
    <>
      <div 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200 text-slate-900">
      {/* Drawer Header */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-emerald-800/50 bg-slate-50 dark:bg-[#051F17] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#0F4A38] dark:bg-[#E5A93C]/20 dark:text-[#E5A93C] flex items-center justify-center font-bold">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-slate-50">StayNest Direct Chat</h3>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
              {currentRole === 'student' ? 'Connected directly to Landlords' : 'Student Tenant Inquiries'}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white bg-white dark:bg-emerald-950/60 border border-slate-200 dark:border-emerald-800/40"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Conversations Tab Strip */}
      <div className="flex border-b border-slate-200 dark:border-emerald-800/40 bg-slate-100 dark:bg-[#072F23] overflow-x-auto p-1.5 gap-1.5">
        {conversations.map((c) => {
          const isActive = c.id === activeConv?.id;
          return (
            <button
              key={c.id}
              onClick={() => onSelectConversation(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-white text-[#0F4A38] shadow-xs font-bold dark:bg-[#E5A93C] dark:text-[#051F17]'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-emerald-900/60'
              }`}
            >
              <span>{c.houseName}</span>
              {c.unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              )}
            </button>
          );
        })}
      </div>

      {activeConv ? (
        <>
          {/* Active Conversation Contact Banner */}
          <div className="px-5 py-2.5 bg-slate-50 dark:bg-[#051F17]/90 border-b border-slate-200 dark:border-emerald-900 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-slate-900 dark:text-slate-200">
                {currentRole === 'student' ? activeConv.landlordName : activeConv.studentName}
              </span>
              <span className="text-slate-500 dark:text-slate-400">· {activeConv.houseName}</span>
            </div>
            {currentRole === 'student' && onOpenBookingModal && (
              <button
                onClick={() => onOpenBookingModal(activeConv.houseId)}
                className="text-[11px] font-bold text-[#0F4A38] dark:text-[#E5A93C] hover:underline flex items-center gap-1"
              >
                <Calendar className="w-3 h-3" />
                <span>Schedule Visit</span>
              </button>
            )}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/60 dark:bg-[#06241B]/60">
            {activeConv.messages.map((msg) => {
              const isMine =
                (currentRole === 'student' && msg.senderRole === 'student') ||
                (currentRole === 'landlord' && msg.senderRole === 'landlord');

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <span className="text-[10px] text-slate-400 dark:text-slate-400 mb-0.5 px-1 font-medium">
                    {msg.senderName} · {msg.timestamp}
                  </span>
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                      isMine
                        ? 'bg-[#0F4A38] text-white rounded-tr-none font-medium shadow-xs dark:bg-[#E5A93C] dark:text-[#051F17]'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200 shadow-2xs dark:bg-[#0E3D2F] dark:text-slate-100 dark:border-emerald-700/60'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Inquiry Chips (for students) */}
          {currentRole === 'student' && (
            <div className="px-4 py-2 border-t border-slate-200 dark:border-emerald-900 bg-white dark:bg-[#051F17]/80">
              <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold uppercase tracking-wider block mb-1">
                Quick Questions:
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(q)}
                    className="px-2.5 py-1 rounded-full text-[11px] bg-slate-100 hover:bg-slate-200 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 border border-slate-200 dark:border-emerald-700/60 text-slate-700 dark:text-emerald-200 whitespace-nowrap transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input Field */}
          <form
            onSubmit={handleSend}
            className="p-3.5 border-t border-slate-200 dark:border-emerald-800/50 bg-white dark:bg-[#051F17] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                currentRole === 'student'
                  ? `Message ${activeConv.landlordName}...`
                  : `Reply to ${activeConv.studentName}...`
              }
              className="flex-1 px-3.5 py-2.5 bg-slate-50 dark:bg-[#08291F] border border-slate-200 dark:border-emerald-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#0F4A38] dark:focus:border-[#E5A93C] placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-[#0F4A38] text-white disabled:opacity-40 hover:bg-emerald-800 dark:bg-[#E5A93C] dark:hover:bg-[#F59E0B] dark:text-[#051F17] rounded-xl font-bold transition-all shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center p-6 text-center text-slate-400 text-xs">
          No active conversations. Click "Message Landlord" on any boarding house to start!
        </div>
      )}
      </div>
    </>
  );
};
