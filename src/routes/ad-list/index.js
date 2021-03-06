import React, {useState} from 'react'
import ContentWrapper from "../../components/ContentWrapper";
import AdCard from '../../components/AdCard';
import AdInfo from '../../components/AdInfo';
import WaitingSelection from '../../components/WaitingSelection';
import { HomeOutlined } from '@ant-design/icons';
import Spin from '../../components/Spin';

const AdList = () => {
    const [ datos] = useState(null);
    const breadscrumb = [{'Publicidades': '/ads'}]


    return (
        <ContentWrapper topNav breadscrumb={breadscrumb}>
          <div className="ads-list--content">
              
            <AdInfo count="0"/>
        
            <div className="ads">
              {/* {!datos ? <Spin /> : null} */}
    
              {/* {datos?.length
              ? datos.map((p) => { */}
                  <AdCard />
    
              {/* {datos && !datos.length ? (
                <div className="no-groups">
                  <WaitingSelection  message="No tienes ninguna publicidad publicada" render={true} icon={<HomeOutlined />} />
                </div>
              ) :null} */}
            </div>
    
          </div>
        </ContentWrapper>
      );
}

export default AdList