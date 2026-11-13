import { MAX_PASSENGERS, MEALS, PASSENGER_COLORS } from '../data/constants';
import { formatPrice } from '../utils/format';

function PassengerCard({ passenger, isActive, dispatch }) {
  const select = () => dispatch({ type: 'select', id: passenger.id });

  return (
    <li
      className={`passenger ${isActive ? 'is-active' : ''}`}
      style={{ '--owner': PASSENGER_COLORS[passenger.id - 1] }}
      onClick={select}
    >
      <div className="passenger-top">
        <span className="badge">{passenger.id}</span>
        <input
          className="name-input"
          value={passenger.name}
          aria-label={`Name for passenger ${passenger.id}`}
          maxLength={24}
          onFocus={select}
          onChange={(e) => dispatch({ type: 'rename', id: passenger.id, name: e.target.value })}
          onBlur={(e) => {
            if (!e.target.value.trim()) {
              dispatch({ type: 'rename', id: passenger.id, name: `Passenger ${passenger.id}` });
            }
          }}
        />
      </div>

      <div className="passenger-seat">
        {passenger.seat ? (
          <>
            <span>Seat <strong>{passenger.seat}</strong></span>
            <button
              type="button"
              className="link-btn"
              onClick={(e) => {
                e.stopPropagation();
                dispatch({ type: 'clear_seat', id: passenger.id });
              }}
            >
              Remove
            </button>
          </>
        ) : (
          <span className="muted">{isActive ? 'Pick a seat on the map' : 'No seat yet'}</span>
        )}
      </div>

      <label className="meal-field">
        <span className="muted">Meal</span>
        <select
          value={passenger.meal}
          onChange={(e) => dispatch({ type: 'set_meal', id: passenger.id, meal: e.target.value })}
        >
          {MEALS.map((meal) => (
            <option key={meal.id} value={meal.id}>
              {meal.name}{meal.id !== 'none' ? ` – ${formatPrice(meal.price)}` : ''}
            </option>
          ))}
        </select>
      </label>
    </li>
  );
}

export default function PassengerPanel({ passengers, activeId, dispatch }) {
  const count = passengers.length;

  return (
    <section className="card">
      <div className="card-head">
        <h2>Passengers</h2>
        <div className="stepper">
          <button
            type="button"
            aria-label="Remove a passenger"
            disabled={count <= 1}
            onClick={() => dispatch({ type: 'set_count', count: count - 1 })}
          >
            −
          </button>
          <span aria-live="polite">{count}</span>
          <button
            type="button"
            aria-label="Add a passenger"
            disabled={count >= MAX_PASSENGERS}
            onClick={() => dispatch({ type: 'set_count', count: count + 1 })}
          >
            +
          </button>
        </div>
      </div>

      <ul className="passenger-list">
        {passengers.map((p) => (
          <PassengerCard key={p.id} passenger={p} isActive={p.id === activeId} dispatch={dispatch} />
        ))}
      </ul>
    </section>
  );
}
