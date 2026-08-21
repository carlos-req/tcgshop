import { ChevronDown } from "lucide-react";

export interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export function FilterSelect({ value, onChange, options }: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-outline-variant/60 bg-surface-container-low py-2 pl-4 pr-10 text-sm text-on-surface-variant focus:border-primary-dim focus:outline-none focus:ring-1 focus:ring-primary-dim/30"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-outline"
        aria-hidden
      />
    </div>
  );
}
