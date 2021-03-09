import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, notification } from "antd";
import adFields from "../../forms/UPDATE_AD";
import ContentWrapper from "../../components/ContentWrapper";
import CustomizedForm from "../../components/CustomizedForm";
import ApiRequest from "../../util/ApiRequest";
import moment from "moment";

const UpdateAd = () => {
  const { idAd } = useParams();
  const history = useHistory();
  const [form] = Form.useForm();
  const breadscrumb = [
    { Publicidades: "/ads" },
    { "Actualizar Publicidad": idAd ? `/ad/${idAd}/update` : null },
  ];

  useEffect(() => {
    const asyncGetAd = async () => {
      await ApiRequest.get(`/ad/${idAd}`).then((res) => {
        let { data } = res;

        let formatedData = {
          ...data,
          paymentDate: data.paymentDate ? moment(data.paymentDate) : null,
          startDate: data.startDate ? moment(data.startDate) : null,
          endDate: data.endDate ? moment(data.endDate) : null,
        };
        form.setFieldsValue(formatedData);
      });
    };
    asyncGetAd();
  }, [idAd, form]);

  const putAd = (values) => {
    let formatedBodyReq = {
      ...values,
      startDate: values.startDate.toString(),
      endDate: values.endDate.toString(),
    };
    const updateAd = async () => {
      await ApiRequest.put(`ad/${idAd}`, formatedBodyReq)
        .then((res) => {
          notification.success({
            message: "Publicidad actualizada con éxito",
            placement: "bottomLeft",
          });
        })
        .catch((err) => {
          notification.error({
            message: "Error: no se pudo publicar la publicidad",
            placement: "bottomLeft",
          });
        });
    };

    updateAd();
  };

  const onDelete = async () => {
    await ApiRequest.delete(`/ad/${idAd}`).then((res) => {
      notification.success({
        message: `Publicidad eliminada con éxito`,
        placement: "bottomLeft",
      });
      history.push(`/ads`);
    });
  };

  return (
    <ContentWrapper topNav footer breadscrumb={breadscrumb}>
      <CustomizedForm
        form={form}
        data={adFields}
        onfinish={putAd}
        onDelete={onDelete}
      />
    </ContentWrapper>
  );
};

export default UpdateAd;
