import React from 'react'

const PropertyDetail = props => {

    return (
        <div>
            {
                JSON.stringify(props, null, 10)
            }
        </div>
    )
}

export default PropertyDetail;