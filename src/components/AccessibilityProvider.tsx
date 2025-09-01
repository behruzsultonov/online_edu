import React, { createContext, useContext, useCallback, useRef, useEffect } from 'react';

interface AccessibilityContextType {
  announceToScreenReader: (message: string, priority?: 'polite' | 'assertive') => void;
  setFocus: (element: HTMLElement | null) => void;
  skipToContent: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const skipLinkRef = useRef<HTMLAnchorElement>(null);
  const mainContentRef = useRef<HTMLElement>(null);

  // Function to announce messages to screen readers
  const announceToScreenReader = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (liveRegionRef.current) {
      // Clear previous message
      liveRegionRef.current.textContent = '';
      
      // Small delay to ensure screen reader picks up the change
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = message;
          liveRegionRef.current.setAttribute('aria-live', priority);
        }
      }, 100);
    }
  }, []);

  // Function to set focus on an element
  const setFocus = useCallback((element: HTMLElement | null) => {
    if (element) {
      element.focus();
      // Announce focus change if element has aria-label or title
      const label = element.getAttribute('aria-label') || element.getAttribute('title') || element.textContent;
      if (label) {
        announceToScreenReader(`Focused on ${label}`);
      }
    }
  }, [announceToScreenReader]);

  // Function to skip to main content
  const skipToContent = useCallback(() => {
    const mainContent = document.getElementById('main-content') || document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
      announceToScreenReader('Skipped to main content');
    }
  }, [announceToScreenReader]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip to content shortcut (Alt + S)
      if (event.altKey && event.key.toLowerCase() === 's') {
        event.preventDefault();
        skipToContent();
      }

      // Focus management for modals and dialogs
      if (event.key === 'Escape') {
        const activeModal = document.querySelector('[role="dialog"][aria-hidden="false"]');
        if (activeModal) {
          const closeButton = activeModal.querySelector('[aria-label*="close"], [aria-label*="закрыть"]');
          if (closeButton instanceof HTMLElement) {
            closeButton.click();
          }
        }
      }

      // Tab trap for modals
      if (event.key === 'Tab') {
        const activeModal = document.querySelector('[role="dialog"][aria-hidden="false"]');
        if (activeModal) {
          const focusableElements = activeModal.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
          );
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (event.shiftKey) {
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [skipToContent]);

  // Add high contrast mode detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    const handleContrastChange = (e: MediaQueryListEvent) => {
      document.body.classList.toggle('high-contrast', e.matches);
    };

    mediaQuery.addListener(handleContrastChange);
    handleContrastChange(mediaQuery as any);

    return () => mediaQuery.removeListener(handleContrastChange);
  }, []);

  // Add reduced motion detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent) => {
      document.body.classList.toggle('reduced-motion', e.matches);
    };

    mediaQuery.addListener(handleMotionChange);
    handleMotionChange(mediaQuery as any);

    return () => mediaQuery.removeListener(handleMotionChange);
  }, []);

  const value: AccessibilityContextType = {
    announceToScreenReader,
    setFocus,
    skipToContent
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {/* Skip to content link */}
      <a
        ref={skipLinkRef}
        href="#main-content"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          skipToContent();
        }}
        style={{
          position: 'absolute',
          top: '-40px',
          left: '6px',
          background: '#000',
          color: '#fff',
          padding: '8px',
          textDecoration: 'none',
          borderRadius: '0 0 6px 6px',
          zIndex: 10000,
          transform: 'translateY(-100%)',
          transition: 'transform 0.3s',
        }}
        onFocus={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.transform = 'translateY(-100%)';
        }}
      >
        Skip to main content
      </a>

      {/* Live region for screen reader announcements */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      />

      {children}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityProvider;