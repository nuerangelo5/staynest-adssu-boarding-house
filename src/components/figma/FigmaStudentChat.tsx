import React, { useState } from 'react';
import {
  ArrowLeft,
  Camera,
  CheckCheck,
  Home,
  Info,
  Plus,
  Search,
  Send,
  Compass,
  MessageSquare,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';
import { StayNestEmblem } from './StayNestEmblem';

export interface Message {
  id: string;
  sender: 'student' | 'landlord';
  text: string;
  time: string;
}

export interface ChatThread {
  id: string;
  name: string;
  landlord: string;
  roomInfo: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  avatar: string;
  phone: string;
  messages: Message[];
}

const INITIAL_THREADS: ChatThread[] = [];

export interface FigmaStudentChatProps {
  threads?: ChatThread[];
  setThreads?: React.Dispatch<React.SetStateAction<ChatThread[]>>;
  activeThreadId?: string | null;
  setActiveThreadId?: (id: string | null) => void;
  onBackToExplore?: () => void;
}

export const FigmaStudentChat: React.FC<FigmaStudentChatProps> = ({
  threads: externalThreads,
  setThreads: externalSetThreads,
  activeThreadId: externalActiveThreadId,
  setActiveThreadId: externalSetActiveThreadId,
  onBackToExplore,
}) => {
  const [internalThreads, setInternalThreads] = useState<ChatThread[]>(INITIAL_THREADS);
  const [internalActiveThreadId, setInternalActiveThreadId] = useState<string | null>(null);

  const threads = externalThreads !== undefined ? externalThreads : internalThreads;
  const setThreads = externalSetThreads || setInternalThreads;

  const activeThreadId = externalActiveThreadId !== undefined ? externalActiveThreadId : internalActiveThreadId;
  const setActiveThreadId = externalSetActiveThreadId || setInternalActiveThreadId;

  const [inputText, setInputText] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const activeThread = threads.find((t) => t.id === activeThreadId);

  // Clear unread flag when viewing an active thread
  React.useEffect(() => {
    if (activeThreadId) {
      setThreads((prev) =>
        prev.map((t) => (t.id === activeThreadId && t.unread ? { ...t, unread: false } : t))
      );
    }
  }, [activeThreadId]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || !activeThreadId) return;

    const newMsg: Message = {
      id: `m-${Date.now()}`,
      sender: 'student',
      text,
      time: 'Just now',
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThreadId
          ? {
              ...t,
              messages: [...t.messages, newMsg],
              lastMessage: `You: "${text}"`,
              time: 'Just now',
            }
          : t
      )
    );
    setInputText('');

    // Landlord Auto-reply simulation in Bisaya
    setTimeout(() => {
      let replyText = 'Sige Angelo, bisita lang kamo sa boarding house anytime buntag or hapon. Naa ra ko diri!';
      if (text.toLowerCase().includes('reserve')) {
        replyText = 'Sige, pwede nimo i-reserve through StayNest o GCash para ma-hold nato ang slot!';
      } else if (text.toLowerCase().includes('tan-aw') || text.toLowerCase().includes('ocular') || text.toLowerCase().includes('visit')) {
        replyText = 'Oo pwede kaayo! Anhi lang unya alas-3 sa hapon. Tultulan tika sa Room 01!';
      } else if (text.toLowerCase().includes('wifi') || text.toLowerCase().includes('tubig')) {
        replyText = 'Kusog kaayo atong Starlink / Fiber WiFi, ug 24/7 ang agas sa tubig diri sa Purok 3.';
      }

      const replyMsg: Message = {
        id: `r-${Date.now()}`,
        sender: 'landlord',
        text: replyText,
        time: 'Just now',
      };

      setThreads((latest) =>
        latest.map((t) =>
          t.id === activeThreadId
            ? {
                ...t,
                messages: [...t.messages, replyMsg],
                lastMessage: `${t.landlord.split(' ')[0]}: "${replyText}"`,
              }
            : t
        )
      );
    }, 1200);
  };

  const filteredThreads = threads.filter(
    (t) =>
      t.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.landlord.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.roomInfo.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // --- VIEW 1: ACTIVE CHAT THREAD CONVERSATION ---
  if (activeThread) {
    return (
      <div className="relative w-full h-full min-h-[500px] bg-[#F7F9F7] flex flex-col justify-between font-sans">
        {/* Top Header with Prominent Exit / Back Pathways */}
        <div className="bg-[#053728] text-white px-4 py-3 flex items-center justify-between shadow-md border-b border-[#03241A] shrink-0">
          <div className="flex items-center gap-3">
            {/* Step back to chat list */}
            <button
              onClick={() => setActiveThreadId(null)}
              title="Back to all conversations"
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1 text-xs font-semibold cursor-pointer active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">All Chats</span>
            </button>

            <div className="w-9 h-9 rounded-full bg-[#00875A] border border-emerald-400 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {activeThread.avatar}
            </div>

            <div>
              <h3 className="text-xs sm:text-sm font-bold leading-tight flex items-center gap-1.5">
                <span>{activeThread.landlord}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <p className="text-[11px] text-emerald-200">
                {activeThread.name} • Verified Landlord
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Exit to Explore Boarding Houses */}
            {onBackToExplore && (
              <button
                onClick={onBackToExplore}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95 border border-emerald-500/50"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Explore Houses</span>
              </button>
            )}
          </div>
        </div>

        {/* Room Context Sticky Card */}
        <div className="bg-white border-b border-slate-200 p-2.5 px-4 flex items-center justify-between shadow-xs shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#00875A] flex items-center justify-center shrink-0 border border-emerald-200">
              <Home className="w-4 h-4 text-[#00875A]" />
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-slate-800 block truncate">
                {activeThread.roomInfo}
              </span>
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                Purok 3, San Jose, Bunawan • Walking distance to ADSSU
              </span>
            </div>
          </div>

          {onBackToExplore && (
            <button
              onClick={onBackToExplore}
              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline shrink-0 ml-2"
            >
              View Listing
            </button>
          )}
        </div>

        {/* Message Bubble Thread - Independent Scroll Area */}
        <div className="flex-1 p-4 space-y-3.5 overflow-y-auto min-h-0">
          <div className="text-center my-1">
            <span className="px-3 py-1 rounded-full bg-slate-200/80 text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              OFFICIAL INQUIRY CONVERSATION
            </span>
          </div>

          {activeThread.messages.map((m) => {
            const isStudent = m.sender === 'student';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isStudent ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                    isStudent
                      ? 'bg-[#00875A] text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 px-1">
                  <span className="text-[10px] text-slate-400">{m.time}</span>
                  {isStudent && <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bisaya Quick Prompt Suggestions */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200/80 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Quick Ask:
          </span>
          <button
            onClick={() => handleSendMessage('Pwede mo-tan-aw sa room ugma alas-2 sa hapon?')}
            className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 whitespace-nowrap shadow-2xs active:scale-95 transition-all cursor-pointer"
          >
            "Pwede mo-tan-aw sa room ugma?"
          </button>
          <button
            onClick={() => handleSendMessage('Unsaon pag-reserve sir? Pila ang down payment?')}
            className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 whitespace-nowrap shadow-2xs active:scale-95 transition-all cursor-pointer"
          >
            "Unsaon pag-reserve sir?"
          </button>
          <button
            onClick={() => handleSendMessage('Naa ba study table ug free wifi sa kwarto?')}
            className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-emerald-500 hover:text-emerald-700 whitespace-nowrap shadow-2xs active:scale-95 transition-all cursor-pointer"
          >
            "Naa ba study table ug WiFi?"
          </button>
        </div>

        {/* Bottom Input Row - Sticky Pinned above Mobile Nav */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 sticky bottom-0 z-20 pb-4 sm:pb-3 shrink-0">
          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="I-type ang imong pangutana o mensahe..."
              className="w-full pl-4 pr-10 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
            />
          </div>

          <button
            onClick={() => handleSendMessage()}
            className="px-4 py-2.5 rounded-full bg-[#00875A] text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-[#00704A] active:scale-95 shrink-0 transition-all cursor-pointer"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // --- VIEW 2: CHATS LIST ---
  return (
    <div className="relative w-full h-full min-h-[680px] bg-[#F7F9F7] flex flex-col justify-between font-sans">
      {/* Top Header with Back to Explore Navigation */}
      <div className="bg-[#053728] text-white px-5 pt-4 pb-4 shadow-md border-b border-[#03241A]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <StayNestEmblem size="sm" />
            <div>
              <h2 className="text-sm font-bold text-white leading-tight">Landlord Inquiries</h2>
              <p className="text-[11px] text-emerald-200">ADSSU Bunawan Student Accommodation</p>
            </div>
          </div>

          {/* Prominent Back to Explore Button */}
          {onBackToExplore && (
            <button
              onClick={onBackToExplore}
              className="px-3.5 py-1.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-800" />
              <span>Back to Explore</span>
            </button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search landlord name or boarding house..."
            className="w-full pl-10 pr-3 py-2 rounded-xl bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none shadow-xs"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Active Landlord Conversations ({filteredThreads.length})
          </h3>
          <span className="text-[11px] text-emerald-800 font-semibold">
            Direct & Unmoderated
          </span>
        </div>

        {/* Chat List */}
        {filteredThreads.length === 0 ? (
          <div className="py-16 px-4 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
              <MessageSquare className="w-8 h-8 text-emerald-700" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-800">Active Landlord Conversations (0)</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Your inbox is completely clean. Click "Chat Owner" on any Bunawan boarding house property card to start an active chat thread instantly.
              </p>
            </div>
            {onBackToExplore && (
              <button
                onClick={onBackToExplore}
                className="px-5 py-2.5 rounded-xl bg-[#00875A] text-white text-xs font-bold shadow-md hover:bg-[#00704A] transition-all cursor-pointer inline-flex items-center gap-2 active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Browse Boarding Houses & Inquire</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredThreads.map((t) => (
              <div
                key={t.id}
                onClick={() => setActiveThreadId(t.id)}
                className={`p-3.5 rounded-2xl bg-white border cursor-pointer hover:border-emerald-500 hover:shadow-sm transition-all flex items-center justify-between ${
                  t.unread ? 'border-emerald-500 shadow-xs' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-[#00875A] border border-emerald-200 flex items-center justify-center font-bold text-xs shrink-0">
                    {t.avatar}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight truncate">
                      {t.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">Landlord: {t.landlord}</p>
                    <p className="text-[11px] text-emerald-800 font-medium truncate max-w-[240px] sm:max-w-md mt-0.5">
                      {t.lastMessage}
                    </p>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-1.5 shrink-0 ml-2">
                  <span className="text-[10px] text-slate-400 font-medium">{t.time}</span>
                  {t.unread ? (
                    <span className="px-2 py-0.5 rounded-full bg-[#00875A] text-white text-[9px] font-bold">
                      New Reply
                    </span>
                  ) : (
                    <span className="text-[9px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">
                      Open
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom helper banner to return to explore */}
      {onBackToExplore && (
        <div className="p-3 bg-white border-t border-slate-200 text-center">
          <button
            onClick={onBackToExplore}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-emerald-800 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>Return to Browse ADSSU Boarding Houses</span>
          </button>
        </div>
      )}
    </div>
  );
};
