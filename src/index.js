import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';
import application from './application';
// import faker from 'faker';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

application(gon);
