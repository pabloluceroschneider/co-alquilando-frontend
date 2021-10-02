import React, { useState, useEffect } from "react";
import getWindowSize from "../../util/getWindowSize";
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
        <a target="_blank" href={ad?.url}>
        <img
          // src={`https://ec2-34-219-1-255.us-west-2.compute.amazonaws.com:8080/ad/${ad.id}/image/${ad.image}`}
          src="https://www.valoraanalitik.com/wp-content/uploads/2020/08/MercadoLibre.jpg"
          alt="ad"
        />
        </a>
        <div
          style={{color:"#fff"}}
          className="ad-image__button"
          onClick={closeAd}
        >X</div>
      </div>
    );

  return (
    <div className={className.join(' ')}>
      {visible && windowSize[0] > 600 && renderAdImage()}
    </div>
  );
};

export default AdImage;
