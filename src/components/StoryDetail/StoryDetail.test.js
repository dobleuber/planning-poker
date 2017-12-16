import React from 'react';
import { shallow } from 'enzyme';
import StoryDetail from './index';

xit('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<StoryDetail />, div);
});
