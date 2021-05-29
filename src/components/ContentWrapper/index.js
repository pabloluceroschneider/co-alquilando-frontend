import React from 'react';
import Nav from '../../containers/Nav';
import Breadscrumb from '../Breadscrumb';
import OptionsNav from '../../containers/OptionsNav';
import Footer from '../../containers/Footer';


const ContentWrapper = props => {

    return (
        <>

        { props.topNav && <Nav />  }
        { props.optionsNav && <OptionsNav /> }
        { props.breadscrumb && <Breadscrumb paths={props.breadscrumb}/> }
        { props.title && <span className="content-wrapper">{props.title}</span> }
        <div style={{minHeight: '80vh'}}>
            { props.children }
        </div>
        { props.footer && <Footer />}

        </>
    )
}

export default ContentWrapper;
