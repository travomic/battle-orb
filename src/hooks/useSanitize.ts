import * as React from 'react';
import DOMPurify from 'dompurify';

export const useSanitize = (config?: Record<string, string[]>) => {
  return React.useCallback((input: string) => (
    DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['b', 'q', 'i'],
      ALLOWED_ATTR: [''],
      ...config
    })
  ), [config]);
};
