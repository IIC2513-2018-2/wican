import React, { Component } from 'react';

export default class CounterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.handleIncrease = this.handleIncrease.bind(this);
  }

  handleIncrease() {
    const { count } = this.state;
    this.setState({ count: count + 1 });
  }

  render() {
    return <Counter count={this.state.count} onIncrease={this.handleIncrease} />;
  }
}


function Counter(props) {
  const { count, onIncrease } = props;
  return (
    <div>
      Current count:
      {count}
      <button type="button" onClick={onIncrease}>Press!</button>
    </div>
  );
}
