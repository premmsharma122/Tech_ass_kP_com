import { CATEGORIES } from '../data/constants';
import { formatPrice } from '../utils/format';

export default function SeatInfo({ seat, owner }) {
  if (!seat) {
    return <p className="seat-info muted">Hover over or tap a seat to see what it costs.</p>;
  }

  let status = 'Available';
  if (seat.occupied) status = 'Taken';
  else if (owner) status = `Selected by ${owner.name}`;

  return (
    <p className="seat-info">
      <strong>Seat {seat.id}</strong>
      <span>{CATEGORIES[seat.category].label}</span>
      <span>{formatPrice(seat.price)}</span>
      <span className="muted">{status}</span>
    </p>
  );
}
