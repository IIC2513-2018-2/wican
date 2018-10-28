import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchInitiative, signInitiative } from '../services/initiatives';
import Initiative from './Initiative';

export default class InitiativeContainer extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { initiative: null, loading: true, submitting: false };
  }

  componentDidMount() {
    this.loadInitiative();
  }

  async handleSubmit(name, email) {
    this.setState({ submitting: true });
    const { ngoId, initiativeId } = this.props;
    const initiative = await signInitiative(ngoId, initiativeId, { name, email });
    this.setState({ initiative, submitting: false });
  }

  async loadInitiative() {
    const { ngoId, initiativeId } = this.props;
    const initiative = await fetchInitiative(ngoId, initiativeId);
    this.setState({ initiative, loading: false });
  }

  render() {
    const { initiative, loading, submitting } = this.state;
    return loading
      ? <div>Loading...</div>
      : <Initiative onSubmit={this.handleSubmit} initiative={initiative} submitting={submitting} />;
  }
}

InitiativeContainer.propTypes = {
  ngoId: PropTypes.number.isRequired,
  initiativeId: PropTypes.number.isRequired,
};
