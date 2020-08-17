import React, { useEffect, useState } from "react";
import ApiRequest from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import PropertyCard from "../../components/PropertyCard";
import { notification, Pagination } from "antd";
import "../../styles/PropertyList.css";

const Property = () => {
  const [datos, setDatos] = useState(null);
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    let asyncGet = async () => {
      try {
        let { data } = await ApiRequest.get(
          `/property/properties?page=${page - 1}&size=${size}`
        );
        setDatos(data.content);
        setTotalItems(data.totalElements);
      } catch (e) {
        notification.error({
          message: `Error: ${e.message}`,
          placement: "bottomLeft",
        });
      }
    };
    asyncGet();
  }, [page, size]);

  const onChange = (page) => {
    setPage(page);
  };

  return (
    <ContentWrapper topNav optionsNav title="Listado de Propiedades">
      <div className="contentPL">
        {datos
          ? datos.map((p) => {
              return <PropertyCard key={p.id} {...p} />;
            })
          : null}
      </div>
      <div className="pagination">
        <Pagination
          current={page}
          onChange={onChange}
          total={totalItems}
          pageSize={size}
        />
      </div>
    </ContentWrapper>
  );
};

export default Property;
