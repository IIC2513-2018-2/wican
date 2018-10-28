import React from 'react';
import PropTypes from 'prop-types';

export default function Stats(props) {
  const { signsCount } = props;
  return (
    <p>
      {
        signsCount
          ? `Han apoyado esta iniciativa ${signsCount} personas. ¡Apóyala tú también!`
          : 'Nadie ha apoyado esta iniciativa aún. ¡Puedes ser el primero!'
      }
    </p>
  );
}

Stats.propTypes = {
  signsCount: PropTypes.number.isRequired,
};
