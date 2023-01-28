import { render } from '@testing-library/react';

import LayoutSign from './layout-sign';

describe('LayoutSign', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LayoutSign />);
    expect(baseElement).toBeTruthy();
  });
});
