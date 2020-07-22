import React from 'react';
import { Card } from 'antd';


const GaleriaTresImagenes = props => {
    const { imgUrl1, title1, imgUrl2, title2, imgUrl3, title3, } = props
    const { Meta } = Card;
    return (

        <div className="col-sm-12 body2 col-sm-12 row">
            <div className="content2 col-sm-4">
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img src={imgUrl1} alt="Error de carga" />}
                >
                    <Meta title={title1}/>
                </Card>
            </div>
            <div className="content2 col-sm-4">
            <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img src={imgUrl2} alt="Error de carga" />}
                >
                    <Meta title={title2}/>
                </Card>
            </div>
            <div className="content2 col-sm-4">
            <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img src={imgUrl3} alt="Error de carga" />}
                >
                    <Meta title={title3}/>
                </Card>
            </div>



        </div>
    );

}

export default GaleriaTresImagenes;