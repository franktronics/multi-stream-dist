import { render } from '@testing-library/react';

import ReceiverConnector from './receiver-connector';

describe('ReceiverConnector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReceiverConnector />);
    expect(baseElement).toBeTruthy();
  });
});
