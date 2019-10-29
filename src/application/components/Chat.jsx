import React from 'react';
import connect from '../connect';

const mapStateToProps = (state) => {
  const { messages: { byId, allIds } } = state;
  const messages = allIds.map(id => byId[id]);
  return { messages };
};

@connect(mapStateToProps)
class Chat extends React.PureComponent {
  render() {
    const { messages } = this.props;
    return (
      <ul>
        {messages.map(ms => (
          <li key={ms.id}>
            {ms.author}
            <br />
            {ms.text}
          </li>
        ))}
      </ul>
    );
  }
}

export default Chat;
