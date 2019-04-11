import React from 'react';
import moment from 'moment';

const Turns = (props) => {
  const timeStyle = {
    margin: 0,
  };

  const labelStyle = {
    margin: '1em 0 0 0',
  };

  return (
    <div className='ui divided items'>
      {
        props.turns.map((turn, index) => (
          <div
            key={index}
            className='ui item'
            // onClick={() => props.onClick(tab.id)}
          >
            <div className='content'>
              <div className='right floated'>
                <div style={timeStyle} className='meta'>
                  {moment(turn.requestedTime).startOf('minute').fromNow()}
                </div>
              <div
                style={labelStyle}
                className={'ui orange horizontal small right floated label'}>
                {turn.company}
              </div>
              </div>
              <div className='header'>{turn.name}</div>
              <div className='description'>{turn.product}</div>
            </div>
          </div>
      ))
    }
    </div>
  );
}

export default Turns;
