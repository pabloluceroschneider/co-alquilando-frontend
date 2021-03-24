import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'antd'

const PackagePropertyInfo = ({count}) => {
    return (
        <div className="side">
            <section className="package-property-info">
                <div className="current">
                    <div className="info">
                        Tienes {count} publicidades publicadas 
                    </div>
                </div>
                <div className="publish">
                    <Link to="/ad">
                        <Button type="primary">
                            Publicar
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default PackagePropertyInfo;