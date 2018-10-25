import React from 'react';
import { hot } from 'react-hot-loader';
import Counter from './Counter';

function App() {
  return (
    <div>
      <h1>Hola React World!</h1>
      <p>
        <Counter />
      </p>
    </div>
  );
}

export default hot(module)(App);
