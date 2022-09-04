import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import socketMiddleware from '../features/socket/socketMiddleware';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([socketMiddleware]),
});

export default store;
