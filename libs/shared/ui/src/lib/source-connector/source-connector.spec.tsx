import { render } from '@testing-library/react';

import SourceConnector from './source-connector';

describe('SourceConnector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SourceConnector />);
    expect(baseElement).toBeTruthy();
  });
});
