import React from 'react';


class LoadingPlaceHolder extends React.Component {
  render() {
    return (
      <div className='content' style={{ padding: '15% '}}>
        <img className='ui image small centered' src='/planet-progress.gif' />
      </div>
    );
  }
}


export default LoadingPlaceHolder;
