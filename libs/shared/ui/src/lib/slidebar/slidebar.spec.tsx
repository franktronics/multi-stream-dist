import { render } from '@testing-library/react';

import Slidebar from './slidebar';

describe('Slidebar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Slidebar />);
    expect(baseElement).toBeTruthy();
  });
});
