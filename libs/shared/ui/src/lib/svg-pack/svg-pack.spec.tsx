import { render } from '@testing-library/react';

import SvgPack from './svg-pack';

describe('SvgPack', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SvgPack />);
    expect(baseElement).toBeTruthy();
  });
});
