import { forwardRef } from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, rightElement, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {icon && <span className="inline-block mr-1.5 text-gray-500">{icon}</span>}
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full px-4 py-2.5 border rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
              transition-all duration-200 placeholder:text-gray-400
              ${error
                ? 'border-red-400 bg-red-50/50 focus:border-red-400 focus:ring-red-100'
                : 'border-gray-300 bg-white hover:border-gray-400 focus:border-primary'
              }
              ${rightElement ? 'pr-12' : ''}
              ${props.disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : ''}
              ${className}
            `}
            {...props}
          />

          {rightElement && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-xs mt-1.5 flex items-center">
            <svg className="w-3.5 h-3.5 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export default FormInput;
