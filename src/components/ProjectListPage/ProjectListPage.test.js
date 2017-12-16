import React from 'react';
import { shallow } from 'enzyme';
import ProjectListPage from './index';

xit('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<ProjectListPage />, div);
});
