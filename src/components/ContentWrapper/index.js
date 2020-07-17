import React from 'react';
import Header from '../../containers/Header';
import Footer from '../../containers/Footer';
import SideNav from '../../containers/SideNav';

const ContentWrapper = props => {
    return (
        <>
        { props.header ? <Header /> : null }
        { props.sideNav ? <SideNav /> : null }
        { props.children }
        { props.footer ? <Footer /> : null }
        </>
    )
}

export default ContentWrapper;