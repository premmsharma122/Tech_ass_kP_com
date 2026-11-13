import { LAYOUTS } from '../data/constants';

export default function LayoutSwitch({ value, onChange }) {
  return (
    <div className="segmented" role="group" aria-label="Seating configuration">
      {Object.values(LAYOUTS).map((layout) => (
        <button
          key={layout.id}
          type="button"
          className={layout.id === value ? 'is-on' : ''}
          aria-pressed={layout.id === value}
          onClick={() => onChange(layout.id)}
        >
          {layout.label}
        </button>
      ))}
    </div>
  );
}
