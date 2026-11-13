import { useEffect, useState } from 'react';
import { fetchSeatMap } from '../data/seatMap';

export default function useSeatMap(layoutId) {
  const [state, setState] = useState({ status: 'loading', rows: [], error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', rows: [], error: null });

    fetchSeatMap(layoutId)
      .then((rows) => {
        if (!cancelled) setState({ status: 'ready', rows, error: null });
      })
      .catch((err) => {
        if (!cancelled) setState({ status: 'error', rows: [], error: err.message });
      });

    return () => {
      cancelled = true;
    };
  }, [layoutId, attempt]);

  return { ...state, retry: () => setAttempt((n) => n + 1) };
}
