import { formatPrice } from '../utils/format';

export default function Summary({ breakdown }) {
  const { lines, seatTotal, mealTotal, total } = breakdown;
  const hasSelection = lines.some((l) => l.seatId || l.mealName);

  return (
    <section className="card">
      <h2>Your selection</h2>

      {!hasSelection ? (
        <p className="empty">Nothing selected yet. Choose a passenger, then tap a seat.</p>
      ) : (
        <ul className="summary-list">
          {lines.map((line) => (
            <li key={line.id}>
              <div className="summary-name">{line.name}</div>
              <div className="summary-row">
                <span>
                  {line.seatId ? `Seat ${line.seatId} · ${line.seatCategory}` : 'No seat'}
                </span>
                <span>{line.seatId ? formatPrice(line.seatPrice) : '–'}</span>
              </div>
              {line.mealName && (
                <div className="summary-row">
                  <span>{line.mealName}</span>
                  <span>{formatPrice(line.mealPrice)}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <dl className="totals">
        <div><dt>Seats</dt><dd>{formatPrice(seatTotal)}</dd></div>
        <div><dt>Meals</dt><dd>{formatPrice(mealTotal)}</dd></div>
        <div className="grand"><dt>Total</dt><dd>₹{total.toLocaleString('en-IN')}</dd></div>
      </dl>
    </section>
  );
}
