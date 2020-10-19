import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Card, Divider, Button, Tag } from 'antd';
import { EditOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import '../../styles/PayCard.css'

const PayCard = props => {
    const { title, price, color, buyLink, propertiesAmount, desc } = props;

    const history = useHistory();


    const redirectPurchace = () => {
        // history.push(`/property/${id}`)
        history.push({ buyLink })
    }
    console.log("color", color)
    return (

        <div className="contentPayCard">

            <Card
                className="cardPay"
                hoverable
                style={{ width: 400 }}
                cover={
                    <div className="headerPayCard" style={{ backgroundColor: `${color}` }}>
                        <label className="titlePayCard">{title}</label>
                    </div>
                }
            >
                <div >
                <div className="subtitlePayCard">
                    <label >SOLO</label>
                </div>
                    <div className="pricePayCard">
                        <label>${price}</label>
                    </div>

                    <div className="subtitlePayCard">
                    <label >{desc}</label>
                    </div>
                    
                    <Divider className="dividerPayCard"></Divider>
                    <div className="amountPayCard">
                    <label >HASTA {propertiesAmount} PUBLICACIONES</label>
                    </div>

                   
                   
                    <div className="button-place">

                        <Button onClick={() => redirectPurchace()}>
                         <ShoppingCartOutlined /> COMPRA AHORA
                        </Button>
                    </div>

                </div>
            </Card>
        </div>
    );


}

export default PayCard;
