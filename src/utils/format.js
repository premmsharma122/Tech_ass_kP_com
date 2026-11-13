export function formatPrice(amount) {
  if (amount === 0) return 'Free';
  return `₹${amount.toLocaleString('en-IN')}`;
}
