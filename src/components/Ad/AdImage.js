import React, { useState, useEffect } from "react";
import getWindowSize from "../../util/getWindowSize";
import { CloseCircleTwoTone } from "@ant-design/icons";
import ApiRequest from "../../util/ApiRequest";

const AdImage = (props) => {
  const { position } = props;
  const [image, setImage] = useState();
  const [visible, setVisible] = useState(true);

  const modifier = `ad-image--${position}`;
  const className = ["ad-image", modifier];
  let windowSize = getWindowSize();

  useEffect(() => {
    if (!image) {
      const getImage = async () => {
        const data  = await ApiRequest.get(
          '/ad/toDisplay'
        );
        setImage(data);
      };
      getImage();
      console.log(`image`, image)
    }
  }, [image]);

  const closeAd = () => {
    setVisible(false);
  }

  const renderAdImage = () => (
    <div className="ad-image__container">
      <img
        src="https://www.dzoom.org.es/wp-content/uploads/2008/12/panoramica-13-734x243.jpg"
        alt="ad"
      />
      <CloseCircleTwoTone twoToneColor="fafafa" className="ad-image__button" onClick={closeAd} />
    </div>
  );

  return (
    <div className={className.join(" ")}>
      {visible && windowSize[0] > 600 && renderAdImage()}
    </div>
  );
};

export default AdImage;
