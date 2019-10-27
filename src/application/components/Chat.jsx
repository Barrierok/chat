import React from 'react';
import { connect } from 'react-redux';


const mapStateToProps = (state) => {
  const { messages: { byId, allIds } } = state;
  const messages = allIds.map(id => byId[id]);
  return { messages };
};

const actionCreators = {};

class Chat extends React.PureComponent {
  render() {
    // const { messages } = this.props;
    return (
      <p>Messages</p>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Chat);
