import { CATEGORIES, PASSENGER_COLORS } from '../data/constants';
import { formatPrice } from '../utils/format';

export default function Seat({ seat, owner, isActiveOwner, onSelect, onInspect }) {
  const classes = ['seat', `seat--${seat.category}`];
  if (seat.occupied) classes.push('seat--occupied');
  if (owner) classes.push('seat--owned');
  if (isActiveOwner) classes.push('seat--mine');

  const style = owner ? { '--owner': PASSENGER_COLORS[owner.id - 1] } : undefined;

  let status = 'available';
  if (seat.occupied) status = 'taken';
  else if (owner) status = `selected by ${owner.name}`;

  const label = `Seat ${seat.id}, ${CATEGORIES[seat.category].label}, ${formatPrice(seat.price)}, ${status}`;

  return (
    <button
      type="button"
      className={classes.join(' ')}
      style={style}
      aria-label={label}
      aria-disabled={seat.occupied}
      onClick={() => {
        onInspect(seat);
        onSelect(seat);
      }}
      onMouseEnter={() => onInspect(seat)}
      onFocus={() => onInspect(seat)}
    >
      {owner ? owner.id : seat.occupied ? '' : seat.col}
    </button>
  );
}
