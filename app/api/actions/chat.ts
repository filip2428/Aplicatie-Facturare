"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

type Message = {
  role: "user" | "ai";
  content: string;
};

export async function askGemini(history: Message[]) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return { ok: false, answer: "Lipsește cheia API." };

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

    // 1. Luăm datele din DB
    const customers = await prisma.customer.findMany({
      select: { name: true, cif: true, email: true },
    });

    const invoices = await prisma.invoice.findMany({
      select: {
        number: true,
        total: true,
        status: true,
        dueDate: true,
        customer: { select: { name: true } },
      },
    });

    const lastMessage = history[history.length - 1];
    const question = lastMessage.content;

    const recentHistory = history.slice(-10);
    const conversationString = recentHistory
      .map(
        (msg) =>
          `${msg.role === "user" ? "Utilizator" : "Asistent"}: ${msg.content}`,
      )
      .join("\n");

    const dataContext = JSON.stringify({ customers, invoices }, null, 2);

    const today = new Date().toLocaleDateString("ro-RO", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const prompt = `
      Ești un asistent financiar capabil să rețină contextul conversației.
      
      DATE DIN BAZA DE DATE:
      ${dataContext}

      ISTORICUL CONVERSAȚIEI (folosește-l pentru context):
      ${conversationString}

      DATA AZI: ${today}

      Rolul tău nu e doar să cauți date, ci să analizezi sănătatea financiară.
  Dacă un client are multe facturi neplătite vechi, marchează-l ca "Riscant".
  Dacă încasările scad, avertizează utilizatorul.

      Reguli:
      1. Răspunde scurt în română.
      2. Dacă utilizatorul se referă la "el", "ea", "ei", folosește istoricul pentru a înțelege despre cine e vorba.
      3. Fii politicos și util.
      4. Dacă nu știi răspunsul, spune "Nu știu".
      5. Nu inventa informații.
      6. Raspunde uman, nu robot.

      Ultima întrebare a utilizatorului: "${question}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { ok: true, answer: text };
  } catch (error) {
    console.error("Eroare AI:", error);
    return { ok: false, answer: "Nu am putut procesa cererea." };
  }
}
