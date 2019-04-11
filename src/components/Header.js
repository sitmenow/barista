import React from 'react';
import moment from 'moment';

import { millisecondsToHuman } from '../helpers'

const Header = (props) => {
  const containerStyle = {
    borderRadius: 0,
    boxShadow: 0,
  };

  const imageStyle = {
    margin: '30px 0',
  };

  const cardStyle = {
    border: 0,
    margin: 0,
    height: '80px',
    width: 'auto',
    borderRadius: '0',
    boxShadow: '0 0',
  };

  const contentStyle = {
    margin: 0,
    padding: '0 0 0 2em',
  };

  return (
    <div style={ containerStyle } className='ui segment'>
       <div style={ imageStyle } className='left floated tiny ui image'>
         <img src="/mutuo-logo.svg" height='80'/>
       </div>
     <div style={ cardStyle } className='ui card'>
       <div style={ contentStyle } className='content'>
         <a className='header'>{ props.barista.name }</a>
         <div className='meta'>
           <span className='date'>{ props.barista.role }</span>
         </div>
         <br/>
          Last open time: { moment(props.branch.lastOpeningTime).format('MMMM Do, h:mm a') }
       </div>
      </div>
    </div>
  );
}


export default Header;
