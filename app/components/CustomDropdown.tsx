import React, { useState } from 'react';

interface CustomDropdownProps {
  options: { value: string; label: string; icon?: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CustomDropdown({ options, value, onChange, placeholder = 'Select an option' }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-sm transition-colors duration-150 bg-[#F2F2F7] text-[#1E1E2F] rounded-lg focus:ring-2 focus:ring-[#5C2ED1] focus:border-transparent appearance-none flex items-center justify-between"
      >
        <div className="flex items-center gap-2 flex-1">
          {value ? (
            options.find((opt) => opt.value === value)?.icon ? (
              <img src={options.find((opt) => opt.value === value)?.icon} alt="" className="w-4 h-4" />
            ) : null
          ) : null}
          {value ? (
            options.find((opt) => opt.value === value)?.label || placeholder
          ) : (
            placeholder
          )}
        </div>
        <img src="/images/drowpdown-black.svg" alt="expand" className="w-4 h-4 text-[#1E1E2F]" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-[#F2F2F7] flex items-center gap-2 ${
                option.value === value ? 'bg-[#F2F2F7]' : ''
              }`}
            >
              {option.icon && (
                <img src={option.icon} alt={option.label} className="w-4 h-4" />
              )}
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
