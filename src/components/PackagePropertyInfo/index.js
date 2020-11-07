import React from 'react';

const PackagePropertyInfo = ({count}) => {
    return (
        <section className="package-property-info">

            <div className="current">

                <div className="info">
                    Tienes {count} publicaciones disponibles
                </div>

            </div>

            <div className="more" >
                <a href="/payOptions">
                    ¡Contratá más!
                </a>
            </div>



        </section>
    )
}

export default PackagePropertyInfo;
