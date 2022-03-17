import React from 'react';
import { render, screen } from '@testing-library/react';
import Morse from './Morse';

test('renders push button', () => {
  render(<Morse />);
  const buttonElement = screen.getByText(/push/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders correctly', () => {
  const view = render(<Morse />).container;
  expect(view).toMatchInlineSnapshot(`
<div>
  <div
    class="morse"
  >
    <h1>
      Press [Space] or click red button to code or [Esc] to clear.
    </h1>
    <div
      style="display: flex; gap: 1rem;"
    >
      <button>
        Push
      </button>
      <h2 />
    </div>
    <div>
      <h2 />
    </div>
  </div>
</div>
`);
});

