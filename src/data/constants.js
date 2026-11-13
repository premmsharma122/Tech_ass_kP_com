export const MAX_PASSENGERS = 6;
export const ROW_COUNT = 20;

export const LAYOUTS = {
  '3-2': { id: '3-2', label: '3–2', groups: [['A', 'B', 'C'], ['D', 'E']] },
  '2-3-2': { id: '2-3-2', label: '2–3–2', groups: [['A', 'B'], ['C', 'D', 'E'], ['F', 'G']] },
};

export const CATEGORIES = {
  standard: { label: 'Standard', price: 0 },
  legroom: { label: 'Extra legroom', price: 350 },
  premium: { label: 'Premium', price: 250 },
};

export const MEALS = [
  { id: 'none', name: 'No meal', price: 0 },
  { id: 'veg-sandwich', name: 'Veg sandwich', price: 0 },
  { id: 'fruit-nuts', name: 'Fruit and nuts box', price: 120 },
  { id: 'paneer-wrap', name: 'Paneer tikka wrap', price: 180 },
  { id: 'chicken-biryani', name: 'Chicken biryani', price: 250 },
];

export const PASSENGER_COLORS = ['#2f7fb0', '#d9573b', '#5f9a4a', '#8a5aa8', '#c98a12', '#3b5a7d'];
