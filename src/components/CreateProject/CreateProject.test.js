import React from 'react';
import { shallow } from 'enzyme';
import CreateProject from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<CreateProject />, div);
});
