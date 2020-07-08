import React from 'react'
import { useParams } from 'react-router-dom';

const Profile = props => {
    let {nickname} = useParams();
    console.log(nickname);
    return (
        <div>
            Profile: {nickname}
        </div>
    )
}

export default Profile;
