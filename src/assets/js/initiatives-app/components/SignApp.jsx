import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';
import InitiativeContainer from './InitiativeContainer';

function SignApp({ serverData }) {
  return (
    <InitiativeContainer
      ngoId={Number(serverData.ngoId)}
      initiativeId={Number(serverData.initiativeId)}
    />
  );
}

SignApp.propTypes = {
  serverData: PropTypes.shape({
    ngoId: PropTypes.string.isRequired,
    initiativeId: PropTypes.string.isRequired,
  }).isRequired,
};

export default hot(module)(SignApp);
