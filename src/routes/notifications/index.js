import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../../store';
import ApiRequest from '../../util/ApiRequest';
import ContentWrapper from '../../components/ContentWrapper';
import NotificationCard from '../../components/NotificationCard';

const Notifications = props => {
    const { state } = useContext(SessionContext);
    const [ notifications, setNotifications ] = useState();

    useEffect( () => {
        let asyncGet = async () => {
            let {data} = await ApiRequest.get(`/notifications/user/${state.user.id}`)
            setNotifications(data);
            console.log(data)
        }
        asyncGet();
    },[])
    return (
        <ContentWrapper topNav title="Notificaciones">
			<div className="notifications">
                {notifications?.map(n => {
                    return (
                        <NotificationCard key={n.id} {...n} />
                    )
                }
                )}
            </div>
        </ContentWrapper>
    )
}

export default Notifications;