import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import connect from '../utils/connect';
import * as actions from '../actions';
import NewChannelModal from './NewChannelModal';
import ConfirmDelete from './ConfirmDelete';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds, activeChannel } } = state;
  const channels = allIds.map(id => byId[id]);
  return { channels, activeChannel };
};

const actionCreators = {
  setActiveChannel: actions.setActiveChannel,
  removeChannel: actions.removeChannel,
};

@connect(mapStateToProps, actionCreators)
class Channels extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isOpenConfirm: false,
      removingId: null,
    };
  }

  setActiveChannel = activeChannel => (e) => {
    e.preventDefault();
    const { setActiveChannel } = this.props;
    setActiveChannel({ activeChannel });
  }

  toggleForm = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  toggleConfirm = () => {
    const { isOpenConfirm } = this.state;
    this.setState({ isOpenConfirm: !isOpenConfirm });
  }

  handleClickRemove = removingId => () => {
    this.setState({ removingId });
    this.toggleConfirm();
  }

  render() {
    const { channels, activeChannel, removeChannel } = this.props;
    const { isOpen, isOpenConfirm, removingId } = this.state;
    return (
      <>
        <div className="title">
          <span>Channels</span>
          {!isOpen && <Button onClick={this.toggleForm} variant="wigth"><span>+</span></Button>}
          {isOpen && <Button onClick={this.toggleForm} variant="wigth"><span>&times;</span></Button>}
        </div>
        <Nav defaultActiveKey="/general" className="flex-column" navbar>
          {channels.map(({ id, name, removable }) => (
            <Nav.Item key={id} className="channel">
              <Nav.Link
                onClick={this.setActiveChannel(id)}
                disabled={activeChannel === id}
              >
                {name}
              </Nav.Link>
              {removable && <Button variant="wigth" onClick={this.handleClickRemove(id)}><span>&times;</span></Button>}
            </Nav.Item>
          ))}
          {isOpen && <NewChannelModal closeForm={this.toggleForm} />}
          <ConfirmDelete
            show={isOpenConfirm}
            toggleConfirm={this.toggleConfirm}
            removeChannel={removeChannel}
            removingId={removingId}
          />
        </Nav>
      </>
    );
  }
}

export default Channels;
