export default function SeatMapSkeleton() {
  return (
    <div className="cabin-scroll" aria-busy="true" aria-label="Loading seat map">
      <div className="cabin skeleton">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="skeleton-row" />
        ))}
      </div>
    </div>
  );
}
