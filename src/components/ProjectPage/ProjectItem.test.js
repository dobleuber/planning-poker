import React from 'react';
import { shallow } from 'enzyme';
import ProjectPage from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<ProjectPage />, div);
});
