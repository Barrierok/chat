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
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { sendMessage } from './messagesSlice';
import AuthContext from '../auth/authContext';
import { ReactComponent as SendIcon } from './icon.svg';

filter.add(filter.getDictionary('ru'));

const MessageForm = React.memo(({ currentChannelId }) => {
  const { t } = useTranslation();
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
        body: filter.clean(value.trim()),
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
            placeholder={t('messageForm.placeholder')}
            aria-label={t('messageForm.ariaLabel')}
          />
          <Button
            disabled={!value.trim()}
            type="submit"
            className="btn-group-vertical"
            color="primary">
            <SendIcon />
            <span className="visually-hidden">
              {t('common.send')}
            </span>
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
