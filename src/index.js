import '@babel/polyfill';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
import faker from 'faker';
import cookies from 'js-cookie';
// import io from 'socket.io-client';
import application from './application';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const randomName = faker.name.findName();
cookies.set('username', randomName);

application(gon);
