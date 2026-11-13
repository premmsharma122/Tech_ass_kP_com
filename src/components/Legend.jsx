import { CATEGORIES } from '../data/constants';
import { formatPrice } from '../utils/format';

export default function Legend() {
  return (
    <ul className="legend">
      <li><span className="swatch swatch--standard" />Free</li>
      <li><span className="swatch swatch--legroom" />Extra legroom ({formatPrice(CATEGORIES.legroom.price)})</li>
      <li><span className="swatch swatch--premium" />Premium ({formatPrice(CATEGORIES.premium.price)})</li>
      <li><span className="swatch swatch--occupied" />Taken</li>
      <li><span className="swatch swatch--selected" />Selected</li>
    </ul>
  );
}
