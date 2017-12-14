import React from 'react';
import { shallow } from 'enzyme';
import StoryPage from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<StoryPage />, div);
});
