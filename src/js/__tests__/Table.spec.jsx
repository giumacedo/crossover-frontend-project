import React from 'react';
import renderer from 'react-test-renderer';
import Table from '../components/Table';

test('Table renders correctly', () => {
  const component = renderer.create(<Table />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
