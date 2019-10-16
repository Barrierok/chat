import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const { channels } = this.props;
    this.state = { channels };
  }

  render() {
    const { channels } = this.state;

    return (
      <ul className="list-group">
        {channels.map(channel => <li key={channel.id} className="list-group-item">{channel.name}</li>)}
      </ul>
    );
  }
}
