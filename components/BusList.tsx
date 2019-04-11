import React, { Component, Fragment} from 'react';
import styled from 'styled-components';

import BusCard from './BusCard';


class BusList extends Component {    

  componentWillMount () {
    this.setState({ ...this.props });
  }

  componentWillReceiveProps(nextProps) {
    this.updateBusList(nextProps);
  } 

  updateBusList (nextProps) {
    this.setState({ ...nextProps });
  }

  render () {
    const { 
      busList,
    } = this.state;

    return (
      <Wrapper>
        <div className="bus-list">
          <div className="bus-card-container">
            {busList.length?(
              busList.map(bus => {
                let icon = '../static/img/bus/normal.png';
                if (bus.twin) icon = '../static/img/bus/twin.png';
                if (bus.via === 'sasakubo') icon = '../static/img/bus/sasakubo.png';
                if (bus.type==='night') icon = '../static/img/bus/night.png';
                const time = {hour: bus.h, minute: bus.m};
                let info = '';
                bus.to === 'sfc'
                  ? info += '着'
                  : info += '発';
                bus.rotary
                  ? info = 'ロータリー' + info
                  : info = '';
                const subInfo = bus.type==='night'
                  ? '深夜料金'
                  : null;
                return(
                  <BusCard
                    icon={icon}
                    time={time}
                    info={info}
                    subInfo={subInfo}
                    key={''+bus.h+bus.m}
                  />
                );
              })
            ):(
              <Fragment>
                本日のバスは終了しました。
              </Fragment>
            )}
          </div>
        </div>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  .bus-list {
    margin: 30px;
    padding: 15px;
    border-radius: 3px;
    border-top: 1px solid #000; 
    border-left: 1px solid #000; 
    border-right :1px solid #000; 
  }
`;

export default BusList;
