"use client";

import { useState, useRef, useEffect } from "react";
import { askGemini } from "@/app/actions/chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Send, Sparkles, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content:
        "Salut! 👋 Sunt asistentul tău financiar. Pot analiza baza de date pentru tine. Întreabă-mă despre facturi, clienți sau situații financiare.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  // Referință pentru a derula automat la ultimul mesaj
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    // Construim noua listă de mesaje care include și întrebarea curentă
    const newHistory = [
      ...messages,
      { role: "user", content: userMsg } as Message,
    ];

    // Trimitem TOATĂ istoria la server
    const res = await askGemini(newHistory);

    setLoading(false);
    if (res.ok) {
      setMessages((prev) => [...prev, { role: "ai", content: res.answer }]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "Îmi pare rău, am întâmpinat o eroare de conexiune. Te rog să încerci din nou.",
        },
      ]);
    }
  };

  return (
    // FIX: h-screen și overflow-hidden pe containerul principal
    // Asta previne scroll-ul paginii întregi. Doar chat-ul va avea scroll.
    <div className="flex flex-col h-screen overflow-hidden ">
      <Header />

      <main className="flex-1 flex justify-center items-center p-4">
        {/* Card mai mic (max-w-2xl) și înălțime fixă rezonabilă (h-[600px]) */}
        <Card className="w-full max-w-2xl h-[600px] flex flex-col shadow-2xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardHeader className="border-b bg-slate-50/50 dark:bg-slate-900/50 px-6 py-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <CardTitle className="text-lg">Asistent Financiar</CardTitle>
                <CardDescription>Powered by Gemini 2.0</CardDescription>
              </div>
            </div>
          </CardHeader>

          {/* Zona de mesaje - Scroll nativ aici */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 dark:bg-black/10">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex w-full gap-3",
                  m.role === "user" ? "flex-row-reverse" : "flex-row",
                )}
              >
                <Avatar className="h-8 w-8 border shrink-0">
                  {m.role === "ai" ? (
                    <>
                      <AvatarImage src="/bot-avatar.png" />
                      <AvatarFallback className="bg-indigo-100 text-indigo-600">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback className="bg-slate-200 text-slate-700">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  )}
                </Avatar>

                <div
                  className={cn(
                    "relative max-w-[85%] px-4 py-3 text-sm shadow-sm",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-sm"
                      : "bg-white dark:bg-slate-800 border text-foreground rounded-2xl rounded-tl-sm",
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {m.content}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex w-full gap-3">
                <Avatar className="h-8 w-8 border shrink-0">
                  <AvatarFallback className="bg-indigo-100 text-indigo-600">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-white dark:bg-slate-800 border px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    Gândesc...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Zona de input */}
          <div className="p-4 bg-background border-t shrink-0">
            <div className="flex gap-2">
              <Input
                className="flex-1 bg-slate-50 dark:bg-slate-900 border-slate-200 focus-visible:ring-indigo-500"
                placeholder="Întreabă ceva..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                disabled={loading}
                autoFocus
              />
              <Button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                size="icon"
                className={cn(
                  "transition-all duration-200",
                  input.trim()
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "opacity-50",
                )}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              AI-ul poate greși. Verifică datele.
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
}
