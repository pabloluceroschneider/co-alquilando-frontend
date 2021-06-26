import React, { useState, useEffect } from "react";
import getWindowSize from "../../util/getWindowSize";
import { CloseCircleTwoTone } from "@ant-design/icons";
import ApiRequest from "../../util/ApiRequest";

const AdImage = (props) => {
  const { position } = props;
  const [ad, setAd] = useState();
  const [visible, setVisible] = useState(true);
  const isVertical = position === 'vertical';

  const modifier = `ad-image--${position}`;
  const className = ['ad-image', modifier];
  let windowSize = getWindowSize();

  useEffect(() => {
    if (!ad) {
      const getImage = async () => {
        const {data} = await ApiRequest.get(
          '/ad/toDisplay', {isVertical}
        );
        setAd(data);
      };
      getImage();
    }
  }, [ad, isVertical]);

  const closeAd = () => {
    setVisible(false);
  }

  const renderAdImage = () =>
    ad && (
      <div className="ad-image__container">
        <img
          src={`http://localhost:8080/ad/${ad.id}/image/${ad.image}`}
          alt="ad"
        />
        <CloseCircleTwoTone
          twoToneColor="fafafa"
          className="ad-image__button"
          onClick={closeAd}
        />
      </div>
    );

  return (
    <div className={className.join(' ')}>
      {visible && windowSize[0] > 600 && renderAdImage()}
    </div>
  );
};

export default AdImage;
