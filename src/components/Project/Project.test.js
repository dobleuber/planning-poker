import React from 'react';
import { shallow } from 'enzyme';
import Project from './index';

xit('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<Project />, div);
});
