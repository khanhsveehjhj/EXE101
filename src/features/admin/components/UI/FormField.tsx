import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

const FormField = ({ label, required = false, error, children, className = '' }: FormFieldProps) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  disabled = false,
  className = ''
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      disabled={disabled}
      className={`
        w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
        ${className}
      `}
    />
  );
};

interface TextareaProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Textarea = ({ 
  placeholder, 
  value, 
  onChange, 
  rows = 3, 
  required = false, 
  disabled = false,
  className = ''
}: TextareaProps) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      required={required}
      disabled={disabled}
      className={`
        w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
        resize-vertical
        ${className}
      `}
    />
  );
};

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Select = ({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  required = false, 
  disabled = false,
  className = ''
}: SelectProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      disabled={disabled}
      className={`
        w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FormField;
