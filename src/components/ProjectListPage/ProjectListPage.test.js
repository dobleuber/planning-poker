import React from 'react';
import { shallow } from 'enzyme';
import ProjectListPage from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  shallow(<ProjectListPage />, div);
});
