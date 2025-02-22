import { formatCurrency } from '../format-currency';

describe('format currency', () => {
  it('should format a number as currency', () => {
    const price = 100;
    const formattedPrice = formatCurrency(price);
    const currencySymbol = '$';

    expect(formattedPrice).toContain(currencySymbol);
  });

  it('should return zero if not a number', () => {
    const price = NaN;
    const formattedPrice = formatCurrency(price);
    const expectedFormattedPrice = '$0.00';

    expect(formattedPrice).toBe(expectedFormattedPrice);
  });
});
