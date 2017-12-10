import React from 'react';
import { shallow } from 'enzyme';
import ProjectList from './index';


xit('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<ProjectList />, div);
});
