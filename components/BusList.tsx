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
                let info = '';
                let subInfo = '';
                if (bus.twin) { 
                  icon = '../static/img/bus/twin.png'; 
                  info = 'ツインライナー';
                }
                if (bus.via === 'sasakubo') {
                  icon = '../static/img/bus/sasakubo.png';
                  info = '笹久保経由';
                }
                if (bus.type==='night') {
                  icon = '../static/img/bus/night.png';
                  info = '深夜料金';
                }
                subInfo = bus.rotary?'ロータリー発':'';
                const time = {hour: bus.h, minute: bus.m};
                 
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
    border-right: 1px solid #000; 
    border-bottom: 1px solid #000;
  }
`;

export default BusList;
