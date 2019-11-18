import React from 'react';

import RemoveChannel from './RemoveChannel';
import RenameChannel from './RenameChannel';
import connect from '../../utils/connect';
import { renameChannelType, removeChannelType } from '../../utils/constants';

const mapStateToProps = (state) => {
  const { modal: { modalType, modalProps, show } } = state;
  return { modalType, modalProps, show };
};

const types = {
  [renameChannelType]: RenameChannel,
  [removeChannelType]: RemoveChannel,
};

@connect(mapStateToProps, null)
class ModalRoot extends React.Component {
  render() {
    const { modalProps, modalType } = this.props;
    if (!modalType) {
      return null;
    }
    const Modal = types[modalType];
    return (
      <Modal {...modalProps} />
    );
  }
}

export default ModalRoot;
