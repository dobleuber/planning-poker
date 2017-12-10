import React from 'react';
import { shallow } from 'enzyme';
import ProjectItem from './index';

xit('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<ProjectItem />, div);
});
