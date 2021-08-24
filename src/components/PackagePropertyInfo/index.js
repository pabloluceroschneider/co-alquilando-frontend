import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'antd'
import AdImage from "../../components/Ad/AdImage";

const PackagePropertyInfo = ({count}) => {
    return (
        <div className="side">
            <section className="package-property-info">
                <div className="current">
                    <div className="info">
                        Tienes {count} {count>1?"publicaciones disponibles":"publicación disponible"} 
                    </div>
                </div>
                <div className="more" >
                    <Link to="/payOptions">
                        ¡Contratá más!
                    </Link>
                </div>
            </section>

            { count ? (
                <div className="publish">
                    <Link to="/property">
                        <Button type="primary">
                            Publicar
                        </Button>
                    </Link>
                </div>
            ) :null}

            <AdImage position="vertical" />
        </div>
    )
}

export default PackagePropertyInfo;
