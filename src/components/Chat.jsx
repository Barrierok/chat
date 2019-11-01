import React from 'react';
import connect from '../utils/connect';

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
      <section className="fields">
        {messages.map(ms => (
          <div className="message" key={ms.id}>
            <h6>{ms.author}</h6>
            <p>{ms.text}</p>
          </div>
        ))}
      </section>
    );
  }
}

export default Chat;
