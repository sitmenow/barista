import React from 'react';

import { dateToString } from '../../helpers/datetime'

class BranchHeader extends React.Component {
  labelStyle = {
    background: 'rgb(64, 60, 60)',
    color: 'white',
  };

  render() {
    const { name, picture, brand } = this.props;

    return (
      <>
        <div className='ui fluid card'>
          <div className="content">
            <div className='left floated tiny ui image' style={{ marginBottom: 0 }}>
              <img src={ brand.picture } />
            </div>

            <span className="ui right floated label" style={ this.labelStyle }>
              Open
            </span>
            <span className="header">{ brand.name }</span>
            <span className="meta">{ name }</span>
            <br/>
            <br/>
            <span className="description">
              Coffee Shop
            </span>
          </div>
        </div>

        <span className="ui horizontal divider" style={{ color: 'rgba(0, 0, 0, 0.4)', fontWeight: 'lighter' }}>
          X min
        </span>
      </>
    );
  }
}


export default BranchHeader;
