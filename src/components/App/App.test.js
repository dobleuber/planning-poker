import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<App />, div);
});
