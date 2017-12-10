import React from 'react';
import { shallow } from 'enzyme';
import Login from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<Login />, div);
});
