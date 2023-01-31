import { render } from '@testing-library/react';

import HomeDash from './home-dash';

describe('HomeDash', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomeDash />);
    expect(baseElement).toBeTruthy();
  });
});
