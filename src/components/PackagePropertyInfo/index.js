import React from 'react';
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
                    <a href="/payOptions">
                        ¡Contratá más!
                    </a>
                </div>
            </section>

            { count ? (
                <div className="publish">
                    <a href="/property">
                        <Button type="primary">
                            Publicar
                        </Button>
                    </a>
                </div>
            ) :null}

            <AdImage position="vertical" />
        </div>
    )
}

export default PackagePropertyInfo;
