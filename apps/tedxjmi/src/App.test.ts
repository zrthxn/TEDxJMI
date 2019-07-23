import React from 'react';
import ReactDOM from 'react-dom';
import Ted from './Ted';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ted />, div);
  ReactDOM.unmountComponentAtNode(div);
});
