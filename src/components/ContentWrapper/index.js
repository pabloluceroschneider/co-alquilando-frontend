import React from 'react';
import Nav from '../../containers/Nav';
import OptionsNav from '../../containers/OptionsNav';


const ContentWrapper = props => {

    return (
        <>

        { props.topNav && <Nav />  }
        { props.optionsNav && <OptionsNav /> }
        { props.title && <span className="content-wrapper">{props.title}</span> }
        { props.children }

        </>
    )
}

export default ContentWrapper;
