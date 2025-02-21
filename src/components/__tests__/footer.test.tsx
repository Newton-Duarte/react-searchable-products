import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Footer } from '../footer';

describe('Footer component', () => {
  it('should render the footer', () => {
    const authorName = 'Newton Duarte';
    const authorGithubURL = 'https://github.com/newton-duarte';

    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const footerLink = screen.getByRole('link');

    expect(footerLink.textContent).toBe(authorName);
    expect(footerLink).toHaveAttribute('href', authorGithubURL);
  });
});
