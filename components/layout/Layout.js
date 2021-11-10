import React from 'react';
import MainNav from './MainNav';

const Layout = (props) => {
  return (
    <React.Fragment>
      <MainNav />
      <main>{props.children}</main>
    </React.Fragment>
  );
};

export default Layout;
