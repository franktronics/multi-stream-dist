import { render } from '@testing-library/react';

import ButtonTheme from './button-theme';

describe('ButtonTheme', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ButtonTheme />);
    expect(baseElement).toBeTruthy();
  });
});
