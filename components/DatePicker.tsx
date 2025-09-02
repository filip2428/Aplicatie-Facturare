"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ClassNames } from "react-day-picker";

export default function DatePicker() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return (
    <div className="flex flex-col gap-3">
      {/* <Label htmlFor="date" className="px-1">
        Date of birth
      </Label> */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-56 justify-between font-normal
                       bg-neutral-900 text-neutral-100
                       border-neutral-700 hover:bg-neutral-800 hover:text-neutral-100"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 overflow-hidden
                     bg-neutral-900 text-neutral-100
                     border border-neutral-800 shadow-lg shadow-black/40"
          align="start"
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={(d) => {
              if (!d) return;
              setDate(d);
              setOpen(false);
            }}
            captionLayout="dropdown"
            startMonth={new Date(today.getFullYear(), today.getMonth(), 1)}
            endMonth={new Date(2035, 0)}
            disabled={{ before: todayStart }}
            className="rounded-md border border-neutral-800 bg-neutral-900"
            classNames={{
              caption_label: "hidden",
              caption: "flex justify-center items-center pt-1 text-neutral-200",
              caption_dropdowns: "flex gap-2",
              dropdown:
                "bg-neutral-900 text-neutral-100 border border-neutral-700 rounded-md px-2 py-1 " +
                "outline-none focus:ring-2 focus:ring-neutral-600",
              dropdown_month: "bg-neutral-900 text-neutral-100",
              dropdown_year: "bg-neutral-900 text-neutral-100",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
