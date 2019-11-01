import React from 'react';
import { Nav } from 'react-bootstrap';
import connect from '../utils/connect';

const mapStateToProps = (state) => {
  const { channels: { byId, allIds, activeChannel } } = state;
  const channels = allIds.map(id => byId[id]);
  return { channels, activeChannel };
};

@connect(mapStateToProps)
class Channels extends React.PureComponent {
  render() {
    const { channels, activeChannel } = this.props;
    return (
      <Nav defaultActiveKey="/general" className="flex-column" navbar>
        {channels.map(({ id, name }) => (
          <Nav.Item key={id}>
            <Nav.Link disabled={activeChannel === id}>{name}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    );
  }
}

export default Channels;
