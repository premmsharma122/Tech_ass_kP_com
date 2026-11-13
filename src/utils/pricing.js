import { MEALS, CATEGORIES } from '../data/constants';

export function getBreakdown(passengers, seatsById) {
  const lines = passengers.map((p) => {
    const seat = p.seat ? seatsById[p.seat] : null;
    const meal = MEALS.find((m) => m.id === p.meal);
    return {
      id: p.id,
      name: p.name,
      seatId: seat ? seat.id : null,
      seatCategory: seat ? CATEGORIES[seat.category].label : null,
      seatPrice: seat ? seat.price : 0,
      mealName: meal && meal.id !== 'none' ? meal.name : null,
      mealPrice: meal ? meal.price : 0,
    };
  });

  const seatTotal = lines.reduce((sum, l) => sum + l.seatPrice, 0);
  const mealTotal = lines.reduce((sum, l) => sum + l.mealPrice, 0);
  return { lines, seatTotal, mealTotal, total: seatTotal + mealTotal };
}
