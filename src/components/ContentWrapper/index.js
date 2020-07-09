import React from 'react';
import Header from '../../containers/Header';
import TopNav from '../../containers/TopNav';
import Footer from '../../containers/Footer';

const ContentWrapper = props => {
    return (
        <>
        { props.header ? <Header /> : null }
        { props.topnav ? <TopNav /> : null }
        { props.children }
        { props.footer ? <Footer /> : null }
        </>
    )
}

export default ContentWrapper;