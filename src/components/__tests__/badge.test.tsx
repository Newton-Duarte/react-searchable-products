import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Badge } from '../badge';

describe('Badge component', () => {
  it('should render a badge with text', () => {
    const badgeText = 'React.js';

    render(
      <MemoryRouter>
        <Badge>{badgeText}</Badge>
      </MemoryRouter>
    );

    const badge = screen.getByText(badgeText);

    expect(badge.textContent).toBe(badgeText);
  });
});
