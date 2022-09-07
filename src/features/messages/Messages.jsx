import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import Message from './Message';
import { selectMessagesIdsByChannel } from './messagesSlice';

const connector = connect(
  (state, props) => ({
    messagesIds: selectMessagesIdsByChannel(state, props.currentChannelId),
  }),
);

class Messages extends React.Component {
  constructor(props) {
    super(props);

    this.listRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { messagesIds } = this.props;
    if (prevProps.messagesIds.length < messagesIds.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { currentChannelId } = this.props;
    if (prevProps.currentChannelId !== currentChannelId) {
      this.scrollToBottom();
    }

    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  scrollToBottom = () => {
    this.listRef.current.scrollTo({ top: this.listRef.current.scrollHeight });
  };

  render() {
    const { currentChannelId, messagesIds } = this.props;

    return (
      <>
        <MessagesHeader
          messagesCount={messagesIds.length}
          currentChannelId={currentChannelId}
        />
        <div ref={this.listRef} className="chat-messages overflow-auto px-5 flex-grow-1">
          {messagesIds.map((id) => <Message key={id} id={id} />)}
        </div>
        <MessageForm currentChannelId={currentChannelId} />
      </>
    );
  }
}

Messages.propTypes = {
  currentChannelId: PropTypes.number.isRequired,
  messagesIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default connector(Messages);
