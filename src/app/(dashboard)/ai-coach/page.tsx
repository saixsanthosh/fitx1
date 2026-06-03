"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, Mic, Sparkles, Dumbbell, Utensils } from "lucide-react";
import { FitxCard } from "@/components/ui/FitxCard";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: string;
}

const quickReplies = [
  "Build me a 45-min dumbbell workout",
  "Why am I not losing weight?",
  "Am I overtraining?",
  "What should I eat post-workout?",
  "Analyze my progress this week",
];

const initialMessages: Message[] = [
  {
    id: "1",
    role: "ai",
    content: "Hey Alex! Great to see you. You've been crushing it with a 14-day streak! 🔥\n\nYour push day is scheduled for today. Based on your last session, I'd recommend increasing your bench press by 2.5kg to 82.5kg. Your recovery score is 78/100 — solid enough for progressive overload.\n\nYour protein was a bit low yesterday (135g vs 180g target). Try to hit your protein goal today for optimal recovery.\n\nWhat can I help you with?",
    timestamp: "Now",
  },
];

export default function AICoachPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponses: Record<string, string> = {
        "Build me a 45-min dumbbell workout": "Here's a killer 45-minute dumbbell workout for you:\n\n1. **Dumbbell Bench Press** — 4×10 @ 30kg (2 min rest)\n2. **Dumbbell Row** — 4×10 @ 28kg (90 sec rest)\n3. **Dumbbell Shoulder Press** — 3×12 @ 22kg (90 sec rest)\n4. **Dumbbell Lunges** — 3×12 each leg (60 sec rest)\n5. **Hammer Curls** — 3×12 @ 14kg (60 sec rest)\n6. **Dumbbell Skull Crushers** — 3×12 @ 12kg (60 sec rest)\n\nThis hits all major muscle groups and fits in 45 minutes with warm-up. Want me to add this to your workout plan?",
        "Why am I not losing weight?": "Let me check your data... 📊\n\nLooking at the last 2 weeks:\n- Your average calorie intake is 2,380 kcal/day\n- Your target for cutting is 2,000 kcal/day\n- You're in a small surplus, not a deficit\n\nAlso, your weight actually dropped 0.3kg this week — the scale fluctuates daily due to water retention, especially on leg days.\n\nMy recommendation: Track calories more precisely (you logged 80% of meals), and give it 2 more weeks. Weight loss isn't always linear.\n\nWant me to adjust your meal plan?",
        "Am I overtraining?": "Let me analyze your training load... 🔍\n\n**This week:**\n- 4 sessions (typical for you)\n- Total volume: 42,500 kg (up 8% from last week)\n- Recovery score: 78/100\n- Sleep: averaging 7.5 hours\n\n**Verdict: Not overtraining.** ✅\n\nYour recovery score is healthy and your volume increase is within the recommended 5-10% weekly progression. However, if you notice:\n- Persistent fatigue\n- Declining performance\n- Sleep disruption\n\n...then it's time for a deload week. You're on track right now. Keep it up!",
      };

      const defaultResponse = "That's a great question! Based on your current training data and goals, I'd recommend focusing on consistency with your current program. You're making solid progress — your bench press is up 15% this quarter and your body composition is improving.\n\nWant me to dive deeper into any specific aspect?";

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: aiResponses[text] || defaultResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-0px)]">
      <div className="p-6 border-b border-fitx-divider">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-fitx-primary/20 border-2 border-fitx-primary/40 flex items-center justify-center">
            <Bot size={20} className="text-fitx-primary" />
          </div>
          <div>
            <h1 className="text-xl font-display tracking-wider text-fitx-text uppercase">AI Coach</h1>
            <p className="text-xs text-fitx-text-secondary font-body flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-fitx-success" />
              Powered by GPT-4 &middot; Knows your workouts, nutrition &amp; goals
            </p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === "user"
                ? "bg-fitx-primary/20 border border-fitx-primary/30 rounded-br-md"
                : "bg-fitx-card border border-fitx-border rounded-bl-md"
            }`}>
              <p className="text-sm text-fitx-text font-body whitespace-pre-line leading-relaxed">
                {msg.content}
              </p>
              <p className="text-[10px] text-fitx-text-disabled font-mono mt-2">{msg.timestamp}</p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-fitx-card border border-fitx-border rounded-2xl rounded-bl-md p-4">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-fitx-text-disabled rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t border-fitx-divider">
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {quickReplies.map((qr) => (
            <button
              key={qr}
              onClick={() => sendMessage(qr)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-fitx-surface border border-fitx-border text-xs font-heading text-fitx-text-secondary uppercase tracking-wider hover:border-fitx-primary/40 hover:text-fitx-text transition-all"
            >
              {qr}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-xl bg-fitx-surface border border-fitx-border flex items-center justify-center text-fitx-text-secondary hover:text-fitx-text hover:border-fitx-primary/40 transition-all">
            <Mic size={18} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask your AI coach anything..."
            className="flex-1 bg-fitx-surface border border-fitx-border rounded-xl px-4 py-2.5 text-sm font-body text-fitx-text placeholder:text-fitx-text-disabled focus:outline-none focus:border-fitx-primary/60 transition-all"
          />
          <button
            onClick={() => sendMessage(input)}
            className="w-10 h-10 rounded-xl bg-fitx-primary flex items-center justify-center text-white hover:bg-fitx-primary-bright transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
