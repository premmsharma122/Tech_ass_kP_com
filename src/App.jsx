import { useMemo, useReducer, useState } from 'react';
import { reducer, initialState } from './reducer';
import useSeatMap from './hooks/useSeatMap';
import useToast from './hooks/useToast';
import { getBreakdown } from './utils/pricing';
import PassengerPanel from './components/PassengerPanel';
import LayoutSwitch from './components/LayoutSwitch';
import SeatMap from './components/SeatMap';
import SeatMapSkeleton from './components/SeatMapSkeleton';
import SeatInfo from './components/SeatInfo';
import Legend from './components/Legend';
import Summary from './components/Summary';
 

  export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { passengers, activeId, layout } = state;
//
  const seatMap = useSeatMap(layout);
  const { toast, notify } = useToast();
  const [inspected, setInspected] = useState(null);

  const seatsById = useMemo(() => {
    const lookup = {};
    seatMap.rows.forEach((row) => row.groups.flat().forEach((seat) => (lookup[seat.id] = seat)));
    return lookup;
  }, [seatMap.rows]);


const owners = useMemo(() => {
    const map = {};
    passengers.forEach((p) => {
      if (p.seat) map[p.seat] = p;
    });
    return map;

  }, [passengers]); //

  const breakdown = useMemo(() => getBreakdown(passengers, seatsById), [passengers, seatsById]);

  const handleSeatClick = (seat) => {
    const owner = owners[seat.id];

    if (seat.occupied) {
      notify(`Seat ${seat.id} is already taken.`, 'error');
    } else if (owner && owner.id !== activeId) {
      notify(`Seat ${seat.id} is already chosen by ${owner.name}.`, 'error');
    } else if (owner) {
      dispatch({ type: 'clear_seat', id: owner.id });
    } else {
      dispatch({ type: 'assign_seat', seatId: seat.id });
    }
  };

  const handleLayoutChange = (next) => {
    if (next === layout) return;
    const hasSeats = passengers.some((p) => p.seat);
    if (hasSeats && !window.confirm('Switching the layout clears the seats you picked. Continue?')) return;
    setInspected(null);
    dispatch({ type: 'set_layout', layout: next });
  };

  return (
    <div className="page">
      <header className="top">
        <div>
          <h1>Choose your seats</h1>
          <p className="muted">Bengaluru to Delhi · 6E 2041</p>
        </div>
        <LayoutSwitch value={layout} onChange={handleLayoutChange} />
      </header>

      <main className="grid">
        <div className="side">
          <PassengerPanel passengers={passengers} activeId={activeId} dispatch={dispatch} />
          <Summary breakdown={breakdown} />
        </div>

        <section className="card map-card">
          <SeatInfo seat={inspected} owner={inspected ? owners[inspected.id] : null} />
          <Legend />

          {seatMap.status === 'loading' && <SeatMapSkeleton />}

          {seatMap.status === 'error' && (
            <div className="error-box" role="alert">
              <p>{seatMap.error}</p>
              <button type="button" className="primary" onClick={seatMap.retry}>Try again</button>
            </div>
          )}

          {seatMap.status === 'ready' && (
            <SeatMap
              layout={layout}
              rows={seatMap.rows}
              owners={owners}
              activeId={activeId}
              onSelect={handleSeatClick}
              onInspect={setInspected}
            />
          )}
        </section>
      </main>

      {toast && (
        <div className={`toast toast--${toast.tone}`} role="status">{toast.text}</div>
      )}
    </div>
  );
}
