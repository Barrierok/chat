import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { Field, SubmissionError } from 'redux-form';
import reduxForm from '../utils/reduxForm';
import connect from '../utils/connect';
import * as actions from '../actions';


const mapStateToProps = (state) => {
  const { channels: { byId, allIds, activeChannel } } = state;
  const channels = allIds.map(id => byId[id]);
  return { channels, activeChannel };
};

const actionCreators = {
  setActiveChannel: actions.setActiveChannel,
  addChannel: actions.addChannel,
};

@connect(mapStateToProps, actionCreators)
@reduxForm('newChannel')
class Channels extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  setActiveChannel = activeChannel => (e) => {
    e.preventDefault();
    const { setActiveChannel } = this.props;
    setActiveChannel({ activeChannel });
  }

  openForm = () => {
    this.setState({ isOpen: true });
  }

  closeForm = () => {
    this.setState({ isOpen: false });
  }

  handleSubmit = async (values) => {
    const { addChannel, reset } = this.props;
    try {
      await addChannel({ name: values.text });
      this.setState({ isOpen: false });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  }

  renderForm = () => {
    const {
      handleSubmit,
      submitting,
      error,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Field name="text" required disabled={submitting} component="input" type="text" />
        {error && <div className="ml-3">{error}</div>}
      </form>
    );
  }

  render() {
    const { channels, activeChannel } = this.props;
    const { isOpen } = this.state;
    return (
      <>
        <div className="title">
          <span>Channels</span>
          {!isOpen && <Button onClick={this.openForm} variant="wigth"><span>+</span></Button>}
          {isOpen && <Button onClick={this.closeForm} variant="wigth"><span>&times;</span></Button>}
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
              {removable && <Button variant="wigth"><span>&times;</span></Button>}
            </Nav.Item>
          ))}
          {isOpen && this.renderForm()}
        </Nav>
      </>
    );
  }
}

export default Channels;
