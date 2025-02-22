import { normalizeStringForComparison } from '../compare-string';

describe('compare string', () => {
  it('should normalize a string by trimming, converting to lowercase, and removing accents', () => {
    const text = '   Café Éxample String   ';
    const expectedNormalizedText = 'cafe example string';

    const normalizedString = normalizeStringForComparison(text);

    expect(normalizedString).toBe(expectedNormalizedText);
  });

  it('should handle empty strings', () => {
    expect(normalizeStringForComparison('')).toBe('');
  });

  it('should handle already normalized input', () => {
    expect(normalizeStringForComparison('normalized text')).toBe(
      'normalized text'
    );
  });
});
