import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';
import Table from '../components/Table';
// import preload from '../../data.json';

test('Table renders correctly', () => {
  const component = renderer.create(<Table />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// test('Table should render correct amount of tableRows', () => {
//   const component = shallow(<Table shows={preload} />);
//   expect(component.find('.table-row').length).toEqual(preload.elements.length);
// });
