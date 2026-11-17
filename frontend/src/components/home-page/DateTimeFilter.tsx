import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronDown, Check } from "lucide-react";
import useTaskStore from "../../stores/useTaskStore";
import { cn } from "../../data/cn";
import { options } from "../../data/data";

const DateTimeFilter = () => {
  const { timeRange, setDateTimeFilter } = useTaskStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLabel =
    options.find((opt) => opt.value === timeRange)?.label || "Tất cả thời gian";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2.5 bg-white text-gray-700 text-xs font-medium px-3.5 py-2 border rounded-xl outline-none transition-all cursor-pointer shadow-2xs",
          isOpen
            ? "border-indigo-600 ring-2 ring-indigo-100"
            : "border-gray-200 hover:border-indigo-500",
        )}
      >
        <CalendarIcon className="w-4 h-4 text-gray-400 shrink-0" />
        <span>{currentLabel}</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-gray-400 transition-transform duration-200 shrink-0 ml-1",
            isOpen && "rotate-180 text-indigo-600",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-44 bg-white border border-gray-100 rounded-2xl shadow-xl py-1.5 z-50 flex flex-col gap-0.5 animate-in fade-in zoom-in-95 duration-150">
          {options.map((option) => {
            const isSelected = timeRange === option.value;
            return (
              <button
                key={option.value}
                onClick={() => {
                  setDateTimeFilter(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center justify-between px-3.5 py-2 text-xs font-medium text-left transition-colors cursor-pointer",
                  isSelected
                    ? "bg-indigo-50 text-indigo-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DateTimeFilter;
