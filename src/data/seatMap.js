import { LAYOUTS, ROW_COUNT, CATEGORIES } from './constants';

// seats from the sample table in the brief
const SAMPLE_CATEGORIES = {
  '1A': 'standard',
  '1B': 'standard',
  '1C': 'legroom',
  '1D': 'standard',
  '1E': 'premium',
  '2A': 'legroom',
  '2B': 'standard',
};

const LEGROOM_ROWS = [12, 13];
const PREMIUM_WINDOW_ROWS = [3, 4, 5, 6];

function pickCategory(id, row, col, columns) {
  if (SAMPLE_CATEGORIES[id]) return SAMPLE_CATEGORIES[id];
  if (LEGROOM_ROWS.includes(row)) return 'legroom';
  const isWindow = col === columns[0] || col === columns[columns.length - 1];
  if (PREMIUM_WINDOW_ROWS.includes(row) && isWindow) return 'premium';
  return 'standard';
}

function isOccupied(row, colIndex, layoutId) {
  if (row <= 2) return false;
  const seed = layoutId === '3-2' ? 3 : 5;
  return (row * 31 + colIndex * 17 + seed) % 6 === 0;
}

export function buildSeatMap(layoutId) {
  const { groups } = LAYOUTS[layoutId];
  const columns = groups.flat();

  return Array.from({ length: ROW_COUNT }, (_, i) => {
    const number = i + 1;
    const seatGroups = groups.map((group) =>
      group.map((col) => {
        const id = `${number}${col}`;
        const category = pickCategory(id, number, col, columns);
        return {
          id,
          row: number,
          col,
          category,
          price: CATEGORIES[category].price,
          occupied: isOccupied(number, columns.indexOf(col), layoutId),
        };
      })
    );
    return { number, groups: seatGroups };
  });
}

// pretends to be an api call so loading and error states have something to show
export function fetchSeatMap(layoutId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (new URLSearchParams(window.location.search).has('error')) {
        reject(new Error('Could not load the seat map.'));
        return;
      }
      resolve(buildSeatMap(layoutId));
    }, 600);
  });
}
