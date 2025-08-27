import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// dacă există deja prisma în global, o folosește;
// dacă nu, creează una nouă
export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // opțional, afișează query-urile în consolă
  });

// în dev, salvează instanța în global ca să nu fie recreată
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
