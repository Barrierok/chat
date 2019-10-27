import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../actions';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds, activeChannel } } = state;
  const channels = allIds.map(id => byId[id]);
  return { channels, activeChannel };
};

const actionCreators = {};

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

export default connect(mapStateToProps, actionCreators)(Channels);
