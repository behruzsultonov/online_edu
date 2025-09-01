import { useCallback, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccessibility } from '../components/AccessibilityProvider';

interface FormAccessibilityOptions {
  formName?: string;
  autoFocusFirst?: boolean;
  announceErrors?: boolean;
}

interface FormField {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
}

export const useFormAccessibility = (options: FormAccessibilityOptions = {}) => {
  const { t } = useTranslation();
  const { announceToScreenReader } = useAccessibility();
  const formRef = useRef<HTMLFormElement>(null);
  const { formName, autoFocusFirst = true, announceErrors = true } = options;

  // Auto-focus first field when form mounts
  useEffect(() => {
    if (autoFocusFirst && formRef.current) {
      const firstInput = formRef.current.querySelector('input, select, textarea') as HTMLElement;
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }, [autoFocusFirst]);

  // Generate accessible props for form fields
  const getFieldProps = useCallback((field: FormField) => {
    const { id, label, required, error } = field;
    
    return {
      id,
      'aria-label': label,
      'aria-required': required || undefined,
      'aria-invalid': error ? 'true' : undefined,
      'aria-describedby': error ? `${id}-error` : undefined,
    };
  }, []);

  // Generate error message props
  const getErrorProps = useCallback((fieldId: string, error?: string) => {
    if (!error) return {};
    
    return {
      id: `${fieldId}-error`,
      role: 'alert',
      'aria-live': 'polite',
    };
  }, []);

  // Announce form errors
  const announceFormErrors = useCallback((errors: Record<string, string>) => {
    if (!announceErrors) return;

    const errorCount = Object.keys(errors).length;
    if (errorCount > 0) {
      const message = errorCount === 1 
        ? t('accessibility.formError', { count: errorCount })
        : t('accessibility.formErrors', { count: errorCount });
      
      announceToScreenReader(message, 'assertive');
      
      // Focus first field with error
      const firstErrorField = Object.keys(errors)[0];
      const firstErrorElement = document.getElementById(firstErrorField);
      if (firstErrorElement) {
        firstErrorElement.focus();
      }
    }
  }, [announceErrors, announceToScreenReader, t]);

  // Announce successful form submission
  const announceFormSuccess = useCallback((message?: string) => {
    const successMessage = message || t('accessibility.formSubmitted');
    announceToScreenReader(successMessage, 'polite');
  }, [announceToScreenReader, t]);

  // Handle form submission with accessibility
  const handleSubmit = useCallback((
    onSubmit: (data: any) => void | Promise<void>,
    onError?: (errors: Record<string, string>) => void
  ) => {
    return async (data: any) => {
      try {
        await onSubmit(data);
        announceFormSuccess();
      } catch (error: any) {
        if (error.errors && onError) {
          onError(error.errors);
          announceFormErrors(error.errors);
        } else {
          announceToScreenReader(t('accessibility.formError'), 'assertive');
        }
      }
    };
  }, [announceFormSuccess, announceFormErrors, announceToScreenReader, t]);

  return {
    formRef,
    getFieldProps,
    getErrorProps,
    announceFormErrors,
    announceFormSuccess,
    handleSubmit,
  };
};

export default useFormAccessibility;