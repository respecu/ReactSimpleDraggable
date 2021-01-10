import { render } from '@testing-library/react';
import Enzyme, { shallow } from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import React from 'react';
import App from './App';
import Box from './components/Box';
import Draggable from './components/Draggable';

Enzyme.configure({ adapter: new ReactSixteenAdapter() });

function mouseMove(x: number, y: number) {
  const evt = document.createEvent('MouseEvents');
  evt.initMouseEvent("mousemove", true, true, window, 0, 0, 0, x, y, false, false, false, false, 0, null);
  document.dispatchEvent(evt);
  return evt;
}

test('renders learn react link', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

test('drag test', () => {
  const draggable = shallow(
    <Draggable>
      <Box />
    </Draggable>
  );

  draggable.simulate("onMouseDown");

  mouseMove(115, 319);
  mouseMove(214, 325);
  mouseMove(225, 356);
  mouseMove(255, 375);
  mouseMove(999999, 999999);

  draggable.simulate("onMouseUp");
})