import { useCallback, useEffect, useRef, useState } from 'react';

export default function useToast() {
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  const notify = useCallback((text, tone = 'info') => {
    clearTimeout(timer.current);
    setToast({ text, tone });
    timer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return { toast, notify };
}
