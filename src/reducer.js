import { MAX_PASSENGERS } from './data/constants';

const newPassenger = (id) => ({ id, name: `Passenger ${id}`, seat: null, meal: 'none' });

export const initialState = {
  passengers: [newPassenger(1)],
  activeId: 1,
  layout: '3-2',
};

function nextWithoutSeat(passengers, currentId) {
  const start = passengers.findIndex((p) => p.id === currentId);
  for (let step = 1; step <= passengers.length; step++) {
    const candidate = passengers[(start + step) % passengers.length];
    if (!candidate.seat) return candidate.id;
  }
  return currentId;
}

const updatePassenger = (passengers, id, changes) =>
  passengers.map((p) => (p.id === id ? { ...p, ...changes } : p));

export function reducer(state, action) {
  switch (action.type) {
    case 'set_count': {
      const count = Math.min(MAX_PASSENGERS, Math.max(1, action.count));
      const passengers = Array.from({ length: count }, (_, i) => state.passengers[i] ?? newPassenger(i + 1));
      const stillThere = passengers.some((p) => p.id === state.activeId);
      return { ...state, passengers, activeId: stillThere ? state.activeId : passengers[0].id };
    }
    case 'rename':
      return { ...state, passengers: updatePassenger(state.passengers, action.id, { name: action.name }) };
    case 'select':
      return { ...state, activeId: action.id };
    case 'assign_seat': {
      const passengers = updatePassenger(state.passengers, state.activeId, { seat: action.seatId });
      return { ...state, passengers, activeId: nextWithoutSeat(passengers, state.activeId) };
    }
    case 'clear_seat':
      return { ...state, passengers: updatePassenger(state.passengers, action.id, { seat: null }) };
    case 'set_meal':
      return { ...state, passengers: updatePassenger(state.passengers, action.id, { meal: action.meal }) };
    case 'set_layout':
      return {
        ...state,
        layout: action.layout,
        passengers: state.passengers.map((p) => ({ ...p, seat: null })),
      };
    default:
      return state;
  }
}
