import getApp from '..';

const port = process.env.PORT || 3001;
/* eslint-disable */
getApp().listen(port, () => console.log(`port: ${port}`));
