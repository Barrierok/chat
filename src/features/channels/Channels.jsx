import React from 'react';
import { Nav, Button } from 'react-bootstrap';

import connect from '../../utils/connect';
import ChannelForm from './ChannelForm';
import * as actions from './channelsSlice';
import { showModal as action } from '../modal/modalSlice';
import ModalRoot from '../modal/ModalRoot';
import { removeChannelType, renameChannelType } from '../../utils/constants';

const mapStateToProps = (state) => {
  const { channels: { channels, activeChannel } } = state;
  return { channels, activeChannel };
};

const mapDispatchToProps = {
  setActiveChannel: actions.setActiveChannel,
  removeChannel: actions.removeChannel,
  showModal: action,
};

@connect(mapStateToProps, mapDispatchToProps)
class Channels extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isOpenForm: false };
  }

  toggleForm = () => {
    const { isOpenForm } = this.state;
    this.setState({ isOpenForm: !isOpenForm });
  }

  setActiveChannel = activeChannel => (e) => {
    e.preventDefault();
    const { setActiveChannel } = this.props;
    setActiveChannel({ activeChannel });
  }

  handleRemove = id => () => {
    const { showModal } = this.props;
    showModal({ modalType: removeChannelType, modalProps: { id } });
  }

  handleRename = (id, text) => () => {
    const { showModal } = this.props;
    showModal({ modalType: renameChannelType, modalProps: { id, initialValues: { text } } });
  }

  render() {
    const { channels, activeChannel } = this.props;
    const { isOpenForm } = this.state;
    return (
      <>
        <div className="d-flex justify-content-around border-bottom align-items-center">
          <span>Channels</span>
          {!isOpenForm && <Button onClick={this.toggleForm} variant="wigth"><span>+</span></Button>}
          {isOpenForm && <Button onClick={this.toggleFrom} variant="wigth"><span>&times;</span></Button>}
        </div>
        <Nav defaultActiveKey="/general" className="flex-column" navbar>
          {channels.map(({ id, name, removable }) => (
            <Nav.Item key={id} className="channel d-flex">
              <Nav.Link onClick={this.setActiveChannel(id)} disabled={activeChannel === id}>
                {name}
              </Nav.Link>
              <Button variant="wigth" onClick={this.handleRename(id, name)}><span>&#9998;</span></Button>
              {removable && <Button variant="wigth" onClick={this.handleRemove(id)}><span>&times;</span></Button>}
            </Nav.Item>
          ))}
          {isOpenForm && <ChannelForm closeForm={this.toggleForm} />}
          <ModalRoot />
        </Nav>
      </>
    );
  }
}

export default Channels;
