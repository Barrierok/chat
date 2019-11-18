import React from 'react';
import { Nav, Button } from 'react-bootstrap';

import connect from '../../utils/connect';
import ChannelForm from './ChannelForm';
import ConfirmDelete from './ConfirmDelete';
import RenameChannel from './RenameChannel';
import * as actions from './channelsSlice';

const mapStateToProps = (state) => {
  const { channels: { channels, activeChannel } } = state;
  return { channels, activeChannel };
};

const mapDispatchToProps = {
  setActiveChannel: actions.setActiveChannel,
  removeChannel: actions.removeChannel,
};

@connect(mapStateToProps, mapDispatchToProps)
class Channels extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpenForm: false,
      isOpenConfirm: false,
      isOpenRename: false,
      activeId: null,
      valueChannel: '',
    };
  }

  setActiveChannel = activeChannel => (e) => {
    e.preventDefault();
    const { setActiveChannel } = this.props;
    setActiveChannel({ activeChannel });
  }

  toggleShow = target => () => {
    const { state } = this;
    const currentState = state[target];
    this.setState({ [target]: !currentState });
  }

  handleModal = (target, activeId, valueChannel = '') => () => {
    this.setState({ activeId, valueChannel });
    this.toggleShow(target)();
  }

  renderConfirm = () => {
    const { removeChannel } = this.props;
    const { isOpenConfirm, activeId } = this.state;
    return (
      <ConfirmDelete
        show={isOpenConfirm}
        toggleConfirm={this.toggleShow('isOpenConfirm')}
        removeChannel={removeChannel}
        removingId={activeId}
      />
    );
  }

  renderRename = () => {
    const { activeId, valueChannel, isOpenRename } = this.state;
    return (
      <RenameChannel
        show={isOpenRename}
        toggleRename={this.toggleShow('isOpenRename')}
        id={activeId}
        initialValues={{ text: valueChannel }}
      />
    );
  }

  render() {
    const { channels, activeChannel } = this.props;
    const { isOpenForm } = this.state;
    return (
      <>
        <div className="d-flex justify-content-around border-bottom align-items-center">
          <span>Channels</span>
          {!isOpenForm && <Button onClick={this.toggleShow('isOpenForm')} variant="wigth"><span>+</span></Button>}
          {isOpenForm && <Button onClick={this.toggleShow('isOpenForm')} variant="wigth"><span>&times;</span></Button>}
        </div>
        <Nav defaultActiveKey="/general" className="flex-column" navbar>
          {channels.map(({ id, name, removable }) => (
            <Nav.Item key={id} className="channel d-flex">
              <Nav.Link onClick={this.setActiveChannel(id)} disabled={activeChannel === id}>
                {name}
              </Nav.Link>
              <Button variant="wigth" onClick={this.handleModal('isOpenRename', id, name)}><span>&#9998;</span></Button>
              {removable && <Button variant="wigth" onClick={this.handleModal('isOpenConfirm', id)}><span>&times;</span></Button>}
            </Nav.Item>
          ))}
          {isOpenForm && <ChannelForm closeForm={this.toggleShow('isOpenForm')} />}
          {this.renderConfirm()}
          {this.renderRename()}
        </Nav>
      </>
    );
  }
}

export default Channels;
