import React, { useState, useEffect } from 'react'
import { MenuOutlined } from '@ant-design/icons';

const List = ({open}) => {
    return (
        <div className={`items ${open}`}>
            <div>Lista</div>
            <div>Lista</div>
            <div>Lista</div>
            <div>Lista</div>
            <div>Lista</div>
            <div>Lista</div>
        </div>
    )
}

const SideList = () => {
    const [ open, setOpen ] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <div className="side-list">
            <MenuOutlined onClick={handleOpen} className={`hamburger ${open}`}/>
            <List open={open} />
        </div>
    )
}
export default SideList;