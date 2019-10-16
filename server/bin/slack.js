import getApp from '..';

const port = process.env.PORT || 4000;
/* eslint-disable */
getApp().listen(port, () => console.log(`port: ${port}`));
