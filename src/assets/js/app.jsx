import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import SignApp from './initiatives-app/components/SignApp';

const reactCounterAppContainer = document.getElementById('react-app');

if (reactCounterAppContainer) {
  ReactDOM.render(<App />, reactCounterAppContainer);
}

const reactSignAppContainer = document.getElementById('sign-initiative-app');

if (reactSignAppContainer) {
  ReactDOM.render(<SignApp serverData={reactSignAppContainer.dataset} />, reactSignAppContainer);
}
