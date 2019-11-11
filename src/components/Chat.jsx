import React from 'react';
import connect from '../utils/connect';

const mapStateToProps = (state) => {
  const { messages: { byId, allIds }, channels: { activeChannel } } = state;
  const allMessages = allIds.map(id => byId[id]);
  const messages = allMessages.filter(m => m.channelId === activeChannel);
  return { messages };
};

@connect(mapStateToProps)
class Chat extends React.PureComponent {
  constructor(props) {
    super(props);
    this.messagesEndRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const { messages } = this.props;
    return (
      <section className="fields">
        {messages.map(ms => (
          <div className="message d-block m-1 p-1 mw-30" key={ms.id}>
            <h6>{ms.author}</h6>
            <p className="m-0 p-0">{ms.text}</p>
          </div>
        ))}
        <div ref={this.messagesEndRef} />
      </section>
    );
  }
}

export default Chat;
