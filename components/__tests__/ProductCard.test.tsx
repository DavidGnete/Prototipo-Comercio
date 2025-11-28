import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../productCard';

// Mock next-cloudinary CldImage to a simple img so our tests don't depend on the Cloudinary runtime
vi.mock('next-cloudinary', () => ({
  CldImage: (props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { crop, gravity, ...rest } = props;
    // Return an image element with the passed props so alt/title checks work
    return React.createElement('img', rest);
  },
}));

// Mock @heroui components used in the ProductCard UI as simple wrappers
vi.mock('@heroui/card', () => ({
  Card: ({ children }: any) => React.createElement('div', { 'data-testid': 'card' }, children),
  CardHeader: ({ children }: any) => React.createElement('div', null, children),
  CardBody: ({ children }: any) => React.createElement('div', null, children),
}));

describe('ProductCard', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders name and price and allows adding to cart', async () => {
    render(
      <ProductCard name="Test product" category="books" price="12.99" public_id="prod-123" />
    );

    // Name and price appear
    expect(screen.getByText('Test product')).toBeInTheDocument();
    expect(screen.getByText('$ 12.99')).toBeInTheDocument();

    // Initially no quantity badge
    expect(screen.queryByText('1')).not.toBeInTheDocument();

    // Click the main add button — increases quantity and opens modal
    const addBtn = screen.getByRole('button', { name: /Añadir al carrito/i });
    await userEvent.click(addBtn);

    // Modal opens with the quantity shown
    await waitFor(() => expect(screen.getByText('Elige cantidad')).toBeInTheDocument());

    // Click + inside modal to increase to 2
    const plusButtons = screen.getAllByText('+');
    expect(plusButtons.length).toBeGreaterThanOrEqual(1);
    await userEvent.click(plusButtons[1]); // second + is inside modal

    // Check localStorage contains the product with quantity 2
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    expect(cart['prod-123'].quantity).toBe(2);

    // Click - to decrease back to 1
    const minus = screen.getByText('−');
    await userEvent.click(minus);

    const cart2 = JSON.parse(localStorage.getItem('cart') || '{}');
    expect(cart2['prod-123'].quantity).toBe(1);
  });
});
