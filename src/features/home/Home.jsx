import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Template from '../../common/components/template/Template';
import Channels from '../channels/Channels';
import Messages from '../messages/Messages';
import { startConnecting } from '../socket/socketSlice';
import { setMessages } from '../messages/messagesSlice';
import { selectCurrentChannelId, setChannels, setCurrentChannelId } from '../channels/channelsSlice';
import client from '../../common/client';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startConnecting());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.get('data');

        dispatch(setMessages(data.messages));
        dispatch(setChannels(data.channels));
        dispatch(setCurrentChannelId(data.currentChannelId));
      } catch (e) {
        toast.error(t('toasts.loadError'));
      }
    };

    fetchData();
  }, [t]);

  const currentChannelId = useSelector(selectCurrentChannelId);

  if (!currentChannelId) {
    return null;
  }

  return (
    <Template containerClassName="my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white">
        <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
          <Channels />
        </Col>
        <Col className="d-flex flex-column p-0 h-100">
          <Messages currentChannelId={currentChannelId} />
        </Col>
      </Row>
    </Template>
  );
};

export default Home;
