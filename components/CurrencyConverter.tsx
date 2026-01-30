"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface CurrencyConverterProps {
  amountInRon: number;
}

export default function CurrencyConverter({
  amountInRon,
}: CurrencyConverterProps) {
  const [eurAmount, setEurAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://api.frankfurter.app/latest?from=RON&to=EUR")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        const rate = data.rates.EUR;
        setEurAmount(amountInRon * rate);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Eroare la conversie:", err);
        setError(true);
        setLoading(false);
      });
  }, [amountInRon]);

  if (loading)
    return (
      <span className="text-xs text-muted-foreground animate-pulse">
        Calcul curs...
      </span>
    );
  if (error) return null;

  return (
    <div className="flex items-center gap-2 mt-1">
      <Badge variant="secondary" className="text-xs font-normal">
        ≈ {eurAmount?.toFixed(2)} EUR
      </Badge>
    </div>
  );
}
