import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../store";
import ApiRequest from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import NotificationCard from "../../components/NotificationCard";

const Notifications = (props) => {
  const { state } = useContext(SessionContext);
  const [notifications, setNotifications] = useState();
  const breadscrumb = [{Notificaciones: '/notifications'}]

  useEffect(() => {
    let asyncGet = async () => {
      let { data } = await ApiRequest.get(
        `/notifications/user/${state.user.id}`
      );
      setNotifications(data);
      console.log("data:", data);
    };
    asyncGet();
  }, [state.user.id]);
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
