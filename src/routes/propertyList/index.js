import React, { useEffect, useState } from "react";
import ApiRequest from "../../util/ApiRequest";
import PropertyCard from "../../components/PropertyCard/index";
import { notification } from "antd";
import "../../styles/PropertyList.css";

const Property = () => {
  const [datos, setDatos] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useSize(20);
  useEffect(() => {
    let asyncGet = async () => {
      try {
        let { content } = await ApiRequest.get(
          `/property/properties?page=${page}&size${size}`
        );
        setDatos(content);
        console.log(content);
      } catch (e) {
        notification.error({
          message: `Error: ${e.message}`,
          placement: "bottomLeft",
        });
      }
    };
    asyncGet();
  }, []);


  return (
    <div className="contentPL">
      {datos
        ? datos.map((p) => {
            return <PropertyCard {...p} />;
          })
        : null}
    </div>
  );
};

export default Property;
