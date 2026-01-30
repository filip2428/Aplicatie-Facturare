"use server";

import { prisma } from "@/lib/prisma";

export async function askGemini(question: string) {
  try {
    // 1. Luăm datele din baza de date
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

    // 2. Pregătim contextul pentru AI
    const dataContext = JSON.stringify({ customers, invoices }, null, 2);

    // Promptul sistemului
    const prompt = `
      Ești un asistent financiar.
      Ai acces la aceste date din baza de date:
      ${dataContext}

      Reguli:
      1. Răspunde scurt în română.
      2. Folosește datele de mai sus pentru a răspunde.
      
      Întrebarea utilizatorului: "${question}"
    `;

    // 3. Apelăm API-ul Google manual (fără bibliotecă)
    const apiKey = process.env.GEMINI_API_KEY;
    // Folosim modelul gemini-1.5-flash care e gratuit și rapid
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      // Dacă totuși dă eroare, vedem exact ce zice Google
      const errorData = await response.json();
      console.error("Gemini API Error:", JSON.stringify(errorData, null, 2));
      return {
        ok: false,
        answer: "Eroare de configurare AI (API Key sau Model).",
      };
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "Nu am răspuns.";

    return { ok: true, answer: text };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { ok: false, answer: "Eroare internă server." };
  }
}
