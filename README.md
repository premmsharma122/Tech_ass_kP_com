# Flight seat selection

A small React app for picking seats on a flight. You choose how many people are travelling, give each one a seat (and optionally a meal), and watch the total update as you go. Built with React 18 and Vite, no backend, all data is mocked.

## 🚀 Live Demo

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://starlit-dieffenbachia-5781df.netlify.app)

## Running it

```
npm install
npm run dev
```

`npm run build` makes a static build in `dist/` (the base path is relative, so it works on GitHub Pages or Vercel without changes).

To see the error state, open the app with `?error` at the end of the URL, e.g. `http://localhost:5173/?error`.

## How the state works

Everything that matters lives in one `useReducer` in `App.jsx` (the reducer itself is in `src/reducer.js`):

- `passengers` – array of `{ id, name, seat, meal }`. `seat` is just a seat id like `"3C"` or `null`.
- `activeId` – which passenger the next seat click applies to.
- `layout` – `"3-2"` or `"2-3-2"`.

I kept the seat map out of the reducer on purpose. It's treated like server data and loaded by `useSeatMap`, which fakes a short network delay. Seat info (price, category, occupied) is looked up by id when needed, and the totals are derived from `passengers` + that lookup, so there's no separate "total" state that can go out of sync.

## Seat assignment

Clicking a seat goes through `handleSeatClick` in `App.jsx`:

1. Occupied seat → toast, nothing changes.
2. Seat already held by a different passenger → toast, nothing changes. So two people can't end up on one seat.
3. Seat already held by the active passenger → it gets removed (click again to deselect).
4. Otherwise it's assigned to the active passenger. If they already had a seat, the old one is simply replaced and becomes free again, since ownership is stored on the passenger rather than on the seat.

After an assignment the active passenger moves on to the next person who still doesn't have a seat, which saves some clicking. Switching passengers never touches anyone's seat.

Reducing the passenger count drops the extra passengers (and frees their seats). Switching between layouts clears all seats after a confirm, because the two layouts are different aircraft and seat ids don't map onto each other.

## Pricing

Seat prices come from three categories (free standard, ₹250 premium, ₹350 extra legroom) defined in `data/constants.js`. The seats from the sample table in the brief are hard-coded, the rest follow simple rules in `data/seatMap.js`. Meals can be free or paid and are added to the same total.

## Structure

```
src/
  components/   UI pieces (Seat, SeatMap, PassengerPanel, Summary, ...)
  data/         constants and the mock seat map
  hooks/        useSeatMap, useToast
  utils/        price formatting and total calculation
  reducer.js
  App.jsx
```
