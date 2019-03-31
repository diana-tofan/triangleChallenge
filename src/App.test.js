import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

const w = shallow(<App />);

it('renders without crashing', () => {
  expect(w.find('.board').length).toEqual(1);
});

it('classifies a triangle with all 3 sides equal as equilateral', () => {
  w.find('input').at(0).simulate('keydown', { target: { value: '5' } });
  w.find('input').at(1).simulate('keydown', { target: { value: '5' } });
  w.find('input').at(2).simulate('keydown', { target: { value: '5' } });
  w.find('button').simulate('click');
  expect(w.state().triangleType).toEqual('equilateral');
});

it('classifies a triangle with only 2 sides equal as isosceles', () => {
  w.find('input').at(0).simulate('keydown', { target: { value: '5' } });
  w.find('input').at(1).simulate('keydown', { target: { value: '5' } });
  w.find('input').at(2).simulate('keydown', { target: { value: '4' } });
  w.find('button').simulate('click');
  expect(w.state().triangleType).toEqual('isosceles');
});

it('classifies a triangle with no sides equal as scalene', () => {
  w.find('input').at(0).simulate('keydown', { target: { value: '5' } });
  w.find('input').at(1).simulate('keydown', { target: { value: '4' } });
  w.find('input').at(2).simulate('keydown', { target: { value: '3' } });
  w.find('button').simulate('click');
  expect(w.state().triangleType).toEqual('scalene');
});

it('shows error messages if input fields are empty', () => {
  w.find('input').at(0).simulate('keydown', { target: { value: '' } });
  w.find('input').at(1).simulate('keydown', { target: { value: '' } });
  w.find('input').at(2).simulate('keydown', { target: { value: '' } });
  w.find('button').simulate('click');
  expect(w.state().side1Err).toEqual('Input field is empty');
  expect(w.state().side2Err).toEqual('Input field is empty');
  expect(w.state().side3Err).toEqual('Input field is empty');
  expect(w.find('.ts-errors').length).toEqual(3);
});

it('shows show error message if input field is negative', () => {
  w.find('input').at(0).simulate('keydown', { target: { value: '-4' } });
  w.find('input').at(1).simulate('keydown', { target: { value: '4' } });
  w.find('input').at(2).simulate('keydown', { target: { value: '4' } });
  w.find('button').simulate('click');
  expect(w.state().side1Err).toEqual('Input field should be positive');
  expect(w.find('.ts-errors').length).toEqual(1);
});

it('shows show error message if input field is 0', () => {
  w.find('input').at(0).simulate('keydown', { target: { value: '0000' } });
  w.find('input').at(1).simulate('keydown', { target: { value: '0' } });
  w.find('input').at(2).simulate('keydown', { target: { value: '4' } });
  w.find('button').simulate('click');
  expect(w.state().side1Err).toEqual('Input field is null');
  expect(w.state().side2Err).toEqual('Input field is null');
  expect(w.find('.ts-errors').length).toEqual(2);
});

it('shows check if the given side lengths can form a triangle', () => {
  // Valid triangle
  w.find('input').at(0).simulate('keydown', { target: { value: '7' } });
  w.find('input').at(1).simulate('keydown', { target: { value: '9' } });
  w.find('input').at(2).simulate('keydown', { target: { value: '13' } });
  w.find('button').simulate('click');
  expect(w.state().triangleErr).toEqual('');

  // Invalid triangle
  w.find('input').at(0).simulate('keydown', { target: { value: '4' } });
  w.find('input').at(1).simulate('keydown', { target: { value: '8' } });
  w.find('input').at(2).simulate('keydown', { target: { value: '15' } });
  w.find('button').simulate('click');
  expect(w.state().triangleErr).toEqual('Sum of two side lengths should always be greater than third side');
  expect(w.find('.ts-errors').length).toEqual(1);
});
