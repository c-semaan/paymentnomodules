import React from 'react' ;
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { render, screen } from '@testing-library/react';
import App from './App';


it("Renders without crashing", ()=> {
  const div = document.createElement("div");
  ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
  reportWebVitals();

})
   
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
