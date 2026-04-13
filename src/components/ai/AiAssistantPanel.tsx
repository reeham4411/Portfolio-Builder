"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  X,
  ChevronDown,
  Lightbulb,
  FileText,
  Zap,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortfolio } from "@/hooks/usePortfolio";
import { generateAIContent } from "@/lib/ai";
import Badge from "@/components/ui/Badge";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  action?: ApplyAction;
}

interface ApplyAction {
  label: string;
  field: "bio" | "projectDesc";
  projectId?: string;
  value: string;
}

interface QuickPrompt {
  icon: React.ElementType;
  label: string;
  prompt: string;
  badge?: string;
}

// ─── Quick prompts ────────────────────────────────────────────────────────────

const getQuickPrompts = (name: string, title: string): QuickPrompt[] => [
  {
    icon: FileText,
    label: "Write my bio",
    prompt: `Write a compelling 3-4 sentence first-person professional bio for ${name || "me"}, a ${title || "professional"}. Make it engaging, confident, and portfolio-ready.`,
    badge: "Popular",
  },
  {
    icon: Sparkles,
    label: "Make bio punchier",
    prompt: `Rewrite this bio to be more concise, confident, and memorable — like a standout personal brand statement. Keep it under 3 sentences.`,
  },
  {
    icon: Zap,
    label: "Project description",
    prompt: `Write a strong 2-sentence project description for a portfolio. Ask me for the project name and tech stack first.`,
  },
  {
    icon: Lightbulb,
    label: "Improve my title",
    prompt: `Suggest 5 alternative professional titles for someone who is a "${title || "developer"}". Make them specific, modern, and recruiter-friendly.`,
  },
  {
    icon: RefreshCw,
    label: "Skills gap check",
    prompt: `Based on the role "${title || "software developer"}", what key skills should I add to my portfolio to stand out in 2024? Give a short prioritized list.`,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface AIAssistantPanelProps {
  /** Controlled: whether the panel is open */
  open?: boolean;
  onClose?: () => void;
  /** Uncontrolled: renders as a floating button + panel */
  floating?: boolean;
}

export default function AIAssistantPanel({
  open: openProp,
  onClose,
  floating = true,
}: AIAssistantPanelProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = openProp !== undefined ? openProp : internalOpen;
  const handleClose = onClose ?? (() => setInternalOpen(false));
  const handleOpen = () => setInternalOpen(true);

  const { data, updatePersonalInfo } = usePortfolio();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Hi${data.personalInfo.name ? ` ${data.personalInfo.name.split(" ")[0]}` : ""}! I'm your AI portfolio assistant. I can help you write a compelling bio, craft project descriptions, improve your professional title, or anything else for your portfolio. What would you like to work on?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickPrompts = getQuickPrompts(
    data.personalInfo.name,
    data.personalInfo.title,
  );

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setShowPrompts(false);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const context = `
You are an AI portfolio writing assistant embedded inside a portfolio builder app.
The user's current data:
- Name: ${data.personalInfo.name || "not set"}
- Title: ${data.personalInfo.title || "not set"}
- Current bio: ${data.personalInfo.bio || "empty"}
- Skills: ${data.skills.map((s) => s.name).join(", ") || "none added"}
- Projects: ${data.projects.map((p) => p.title).join(", ") || "none added"}

Keep responses concise (2-4 sentences max unless listing). 
If you generate a bio or project description the user can apply, end with:
[APPLY:bio] for bio text, or [APPLY:projectDesc] for project descriptions.
Only output the content after the tag, nothing else on that line.
Be friendly, direct, and professional.
`.trim();

      const result = await generateAIContent(
        `${context}\n\nUser: ${text.trim()}`,
      );

      // Parse apply actions from the response
      let cleanContent = result;
      let action: ApplyAction | undefined;

      const bioMatch = result.match(/\[APPLY:bio\]\s*([\s\S]+)$/m);
      const projMatch = result.match(/\[APPLY:projectDesc\]\s*([\s\S]+)$/m);

      if (bioMatch) {
        const value = bioMatch[1].trim();
        action = { label: "Apply to Bio", field: "bio", value };
        cleanContent = result.replace(/\[APPLY:bio\][\s\S]*$/, "").trim();
        if (!cleanContent)
          cleanContent = `Here's a bio you can use — click "Apply to Bio" to add it to your portfolio.`;
      } else if (projMatch) {
        const value = projMatch[1].trim();
        action = { label: "Apply to Project", field: "projectDesc", value };
        cleanContent = result
          .replace(/\[APPLY:projectDesc\][\s\S]*$/, "")
          .trim();
        if (!cleanContent)
          cleanContent = `Here's a project description — click to apply it.`;
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: cleanContent,
        timestamp: new Date(),
        action,
      };
      setMessages((m) => [...m, assistantMsg]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, I couldn't connect right now. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const applyAction = (action: ApplyAction) => {
    if (action.field === "bio") {
      updatePersonalInfo({ bio: action.value });
      setMessages((m) => [
        ...m,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "✓ Bio applied to your portfolio! You can edit it anytime in the Personal Info section.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Chat cleared! How else can I help you with your portfolio?`,
        timestamp: new Date(),
      },
    ]);
    setShowPrompts(true);
  };

  // ─── Floating trigger button ────────────────────────────────────────────────

  if (floating && !isOpen) {
    return (
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-semibold text-white shadow-[0_8px_32px_rgba(124,106,255,0.4)] hover:scale-105 hover:shadow-[0_12px_40px_rgba(124,106,255,0.5)] transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
        }}
      >
        <Sparkles size={15} />
        AI Assistant
        <Badge variant="success" size="xs" dot className="ml-1">
          Online
        </Badge>
      </button>
    );
  }

  // ─── Panel ─────────────────────────────────────────────────────────────────

  return (
    <div
      className={cn(
        "flex flex-col bg-(--surface) border border-(--border) overflow-hidden transition-all duration-300",
        floating
          ? "fixed bottom-6 right-6 z-50 w-95 h-145 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
          : "w-full h-full rounded-2xl",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-(--border) bg-(--surface-2) shrink-0">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background:
                "linear-gradient(135deg, var(--accent), var(--accent-2))",
            }}
          >
            <Sparkles size={13} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight">
              AI Assistant
            </div>
            <div className="text-[10px] text-(--text-muted)">
              Portfolio writing helper
            </div>
          </div>
          <Badge variant="success" size="xs" dot className="ml-1">
            Online
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="p-1.5 rounded-lg text-(--text-muted) hover:text-(--text) hover:bg-(--surface) transition-all"
            title="Clear chat"
          >
            <RefreshCw size={13} />
          </button>
          {floating && (
            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-(--text-muted) hover:text-(--text) hover:bg-(--surface) transition-all"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex",
              msg.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div className="max-w-[85%] space-y-2">
              <div
                className={cn(
                  "px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
                  msg.role === "user"
                    ? "text-white rounded-br-sm"
                    : "bg-(--surface-2) text-(--text) border border-(--border) rounded-bl-sm",
                )}
                style={
                  msg.role === "user"
                    ? {
                        background:
                          "linear-gradient(135deg, var(--accent), var(--accent-2))",
                      }
                    : undefined
                }
              >
                {msg.content}
              </div>

              {/* Apply action button */}
              {msg.action && (
                <button
                  onClick={() => applyAction(msg.action!)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-(--accent) border border-(--accent)/30 bg-(--accent)/5 hover:bg-(--accent)/10 transition-all"
                >
                  <Zap size={11} />
                  {msg.action.label}
                </button>
              )}

              <div className="text-[10px] text-(--text-muted) px-1">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-(--surface-2) border border-(--border) rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex items-center gap-1.5">
                {[0, 0.15, 0.3].map((delay) => (
                  <div
                    key={delay}
                    className="w-1.5 h-1.5 rounded-full bg-(--accent) animate-bounce"
                    style={{ animationDelay: `${delay}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick prompts (shown at start) */}
        {showPrompts && !loading && (
          <div className="pt-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1 bg-(--border)" />
              <span className="text-[10px] text-(--text-muted) font-medium uppercase tracking-wide">
                Quick prompts
              </span>
              <div className="h-px flex-1 bg-(--border)" />
            </div>
            <div className="grid grid-cols-1 gap-2">
              {quickPrompts.map(({ icon: Icon, label, prompt, badge }) => (
                <button
                  key={label}
                  onClick={() => sendMessage(prompt)}
                  className="group flex items-center gap-3 p-3 rounded-xl border border-(--border) bg-(--surface) hover:border-(--accent)/40 hover:bg-(--surface-2) transition-all text-left"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(124,106,255,.15), rgba(255,107,157,.15))",
                    }}
                  >
                    <Icon size={13} className="text-(--accent)" />
                  </div>
                  <span className="text-sm flex-1">{label}</span>
                  {badge && (
                    <Badge variant="accent" size="xs">
                      {badge}
                    </Badge>
                  )}
                  <ChevronDown
                    size={12}
                    className="text-(--text-muted) -rotate-90 opacity-0 group-hover:opacity-100 transition-all"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-(--border) shrink-0">
        <div className="flex items-end gap-2 p-2 rounded-xl border border-(--border) bg-(--surface-2) focus-within:border-(--accent)/50 transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask me to write your bio, improve descriptions…"
            rows={1}
            className="flex-1 bg-transparent text-sm text-(--text) placeholder-(--text-muted) resize-none outline-none leading-relaxed min-h-7 max-h-25"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
            disabled={loading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-30 hover:scale-105 active:scale-95"
            style={{
              background:
                "linear-gradient(135deg, var(--accent), var(--accent-2))",
            }}
          >
            <Send size={13} className="text-white" />
          </button>
        </div>
        <div className="text-center text-[10px] text-(--text-muted) mt-2">
          Press Enter to send · Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}
