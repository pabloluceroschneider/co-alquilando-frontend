import React from 'react';
import Nav from '../../containers/Nav';
import OptionsNav from '../../containers/OptionsNav';


const ContentWrapper = props => {

    return (
        <>

        { props.topNav && <Nav />  }
        { props.optionsNav && <OptionsNav /> }
        { props.children }

        </>
    )
}

export default ContentWrapper;