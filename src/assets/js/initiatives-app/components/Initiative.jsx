import React from 'react';
import PropTypes from 'prop-types';
import Form from './Form';

export default function Initiative(props) {
  const { onSubmit, initiative } = props;
  return (
    <div>
      <Form onSubmit={onSubmit} initiative={initiative} />
    </div>
  );
}

Initiative.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initiative: PropTypes.shape({ signsCount: PropTypes.number.isRequired }).isRequired,
};
