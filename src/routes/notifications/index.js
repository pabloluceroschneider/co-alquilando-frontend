import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../store";
import ApiRequest from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import NotificationCard from "../../components/NotificationCard";
import WaitingSelection from '../../components/WaitingSelection';
import { BellOutlined } from '@ant-design/icons';

const Notifications = (props) => {
  const { state } = useContext(SessionContext);
  const [notifications, setNotifications] = useState();
  const breadscrumb = [{Notificaciones: '/notifications'}]

  useEffect(() => {
    if (notifications) return;
    let asyncGet = async () => {
      let { data } = await ApiRequest.get(
        `/notifications/user/${state.user.id}`
      );
      setNotifications(data);
    };
    asyncGet();
  }, [state.user.id, notifications]);

  if (!notifications?.length) return (
    <ContentWrapper topNav breadscrumb={breadscrumb} >
        <div className="no-groups">
            <WaitingSelection  message="No tienes notificaciones!" render={!notifications} icon={<BellOutlined />} />
        </div>
    </ContentWrapper>
)

  return (
    <ContentWrapper topNav title="Notificaciones" breadscrumb={breadscrumb}>
      <div className="notifications">
        {notifications?.map((n) => {
          return <NotificationCard key={n.id} {...n} setNotifications={setNotifications} notifications={notifications}/>;
        })}
      </div>
    </ContentWrapper>
  );
};

export default Notifications;
