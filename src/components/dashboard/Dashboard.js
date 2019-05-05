import React from 'react';

import { dateToString } from '../../helpers/datetime'

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.loadBranch();
    this.props.loadBarista();
  }

  containerStyle = {
    borderRadius: 0,
    boxShadow: 0,
  };

  imageStyle = {
    margin: '30px 0',
  };

  cardStyle = {
    border: 0,
    margin: 0,
    height: '80px',
    width: 'auto',
    borderRadius: '0',
    boxShadow: '0 0',
  };

  contentStyle = {
    margin: 0,
    padding: '0 0 0 2em',
  };

  render() {
    const { barista, branch } = this.props;

    return (
      <div style={ this.containerStyle } className='ui segment'>
         <div style={ this.imageStyle } className='left floated tiny ui image'>
           <img src="/mutuo-logo.svg" height='80'/>
         </div>
       <div style={ this.cardStyle } className='ui card'>
         <div style={ this.contentStyle } className='content'>
           <a className='header'>{ barista.name }</a>
           <div className='meta'>
             <span className='date'>{ barista.role }</span>
           </div>
           <br/>
            Last open time: { dateToString(branch.lastOpeningTime) }
         </div>
        </div>
      </div>
    );
  }
}


export default Dashboard;
