import React, {
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import {
  Form,
  InputGroup,
  Input,
  Button,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { sendMessage } from './messagesSlice';
import AuthContext from '../auth/authContext';

const MessageForm = React.memo(({ currentChannelId }) => {
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);

  const [value, setValue] = useState('');
  const handleChange = useCallback(({ target }) => {
    setValue(target.value);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (value.trim().length) {
      dispatch(sendMessage({
        body: value.trim(),
        channelId: currentChannelId,
        username: user.username,
      }));

      setValue('');
    }

    inputRef.current.focus();
  }, [value, currentChannelId, user.username]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            innerRef={inputRef}
            onChange={handleChange}
            value={value}
            placeholder="Введите сообщение..."
            aria-label="Новое сообщение"
          />
          <Button
            disabled={!value.trim()}
            type="submit"
            className="btn-group-vertical"
            color="primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-arrow-right-square" viewBox="0 0 16 16">
              <path fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
            </svg>
            <span className="visually-hidden">Отправить</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
});

MessageForm.displayName = 'MessageForm';

MessageForm.propTypes = {
  currentChannelId: PropTypes.number.isRequired,
};

export default MessageForm;
