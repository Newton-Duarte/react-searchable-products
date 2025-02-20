export function formatCurrency(value: number): string {
  const parseValue = isNaN(value) || value == null ? 0 : value;

  return parseValue.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}
