import React from 'react';
import { Button } from 'antd'

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
        </div>
    )
}

export default PackagePropertyInfo;
