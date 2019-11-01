import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Channels from './Channels.jsx';
import Chat from './Chat';
import MessageForm from './MessageForm.jsx';

const App = () => (
  <Container fluid as="main">
    <Row as="article">
      <Col sl={3} md={2} lg={2} className="channels">
        <Channels />
      </Col>
      <Col sl={9} md={10} lg={10} className="communication">
        <Chat />
        <MessageForm />
      </Col>
    </Row>
  </Container>
);

export default App;
