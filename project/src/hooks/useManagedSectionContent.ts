import { useEffect, useState } from 'react';
import { apiClient } from '../lib/api';

function parseContent(value: unknown): Record<string, unknown> | null {
  let parsed: unknown = value;
  while (typeof parsed === 'string') {
    try {
      parsed = JSON.parse(parsed);
    } catch {
      break;
    }
  }
  return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : null;
}

/**
 * Loads content by section_key from backend and merges onto fallback values.
 * Keeps UI stable by returning fallback when API data is unavailable.
 */
export function useManagedSectionContent<T extends Record<string, unknown>>(
  sectionKey: string,
  fallback: T
): T {
  const [content, setContent] = useState<T>(fallback);

  useEffect(() => {
    let cancelled = false;

    apiClient
      .getContentSection(sectionKey)
      .then((section) => {
        if (cancelled) return;
        const parsed = parseContent(section?.content);
        if (!parsed) {
          setContent(fallback);
          return;
        }
        setContent({ ...fallback, ...(parsed as Partial<T>) });
      })
      .catch(() => {
        if (!cancelled) setContent(fallback);
      });

    return () => {
      cancelled = true;
    };
  }, [sectionKey, fallback]);

  return content;
}
