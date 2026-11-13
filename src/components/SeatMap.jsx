import { Fragment } from 'react';
import Seat from './Seat';
import { LAYOUTS } from '../data/constants';

export default function SeatMap({ layout, rows, owners, activeId, onSelect, onInspect }) {
  const { groups } = LAYOUTS[layout];

  return (
    <div className="cabin-scroll">
      <div className="cabin" role="group" aria-label="Seat map">
        <div className="cabin-row cabin-head" aria-hidden="true">
          {groups.map((group, i) => (
            <Fragment key={i}>
              {i > 0 && <span className="aisle" />}
              <div className="seat-group">
                {group.map((col) => (
                  <span key={col} className="col-label">{col}</span>
                ))}
              </div>
            </Fragment>
          ))}
        </div>

        {rows.map((row) => (
          <div className="cabin-row" key={row.number}>
            {row.groups.map((group, i) => (
              <Fragment key={i}>
                {i > 0 && <span className="aisle row-number">{row.number}</span>}
                <div className="seat-group">
                  {group.map((seat) => {
                    const owner = owners[seat.id];
                    return (
                      <Seat
                        key={seat.id}
                        seat={seat}
                        owner={owner}
                        isActiveOwner={owner?.id === activeId}
                        onSelect={onSelect}
                        onInspect={onInspect}
                      />
                    );
                  })}
                </div>
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
