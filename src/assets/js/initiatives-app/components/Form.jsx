import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stats from './Stats';
import Field from './Field';

// Taken from https://emailregex.com/
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function validate(name, email) {
  const nameError = name ? undefined : 'debes ingresar un nombre';
  const emailError = email && EMAIL_REGEXP.test(email) ? undefined : 'debes ingresar un email válido';
  return { name: nameError, email: emailError };
}

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      email: '',
      submitted: false,
      errors: {},
    };
  }

  handleNameChange(event) {
    const name = event.target.value;
    this.setState(prevState => ({ name, errors: validate(name, prevState.email) }));
  }

  handleEmailChange(event) {
    const email = event.target.value;
    this.setState(prevState => ({ email, errors: validate(prevState.name, email) }));
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { name, email } = this.state;
    const errors = validate(name, email);
    console.log(errors);

    this.setState({ submitted: true, errors });
    if (errors.name || errors.email) return;
    const { onSubmit } = this.props;
    await onSubmit(name, email);
    this.setState({
      name: '',
      email: '',
      errors: {},
      submitted: false,
    });
  }

  render() {
    const {
      name,
      email,
      submitted,
      errors,
    } = this.state;
    const errorsToShow = submitted ? errors : {};
    const { initiative } = this.props;
    return (
      <form onSubmit={this.handleSubmit} className="single-form">
        <h2>Firmas de apoyo</h2>
        <Stats signsCount={initiative.signsCount} />
        <p>Completa tus datos:</p>
        <Field name="name" labelText="nombre" value={name} error={errorsToShow.name} onChange={this.handleNameChange} />
        <Field name="email" labelText="e-mail" value={email} error={errorsToShow.email} onChange={this.handleEmailChange} />
        <div className="actions">
          <input type="submit" value="¡Firmar!" />
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initiative: PropTypes.shape({ signsCount: PropTypes.number.isRequired }).isRequired,
};
