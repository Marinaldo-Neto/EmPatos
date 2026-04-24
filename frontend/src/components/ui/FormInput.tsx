'use client';

import { useState } from "react";

type FormInputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  required?: boolean;
  className?: string;
};

export default function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  autoComplete,
  required = false,
  className = "",
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-sm text-(--secondary-text) font-medium">
        {label}
      </label>

      <div className="relative w-full">
        <input
          id={id}
          name={id}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          autoComplete={autoComplete}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full rounded-lg border-2 border-(--border-color)
            bg-var(--component-bg)
            text-(--secondary-text)
            p-2
            outline-none
            transition
            focus:border-var(--primary-color)
            ${className}
          `}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-(--alternative-text)"
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
          </button>
        )}
      </div>
    </div>
  );
}