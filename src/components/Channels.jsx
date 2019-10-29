import React from 'react';
import connect from '../utils/connect';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds, activeChannel } } = state;
  const channels = allIds.map(id => byId[id]);
  return { channels, activeChannel };
};

@connect(mapStateToProps)
class Channels extends React.PureComponent {
  render() {
    const { channels } = this.props;
    return (
      <ul className="list-group">
        {channels.map(channel => <li key={channel.id} className="list-group-item">{channel.name}</li>)}
      </ul>
    );
  }
}

export default Channels;
