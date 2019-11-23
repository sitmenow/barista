import React from 'react';


class BranchCard extends React.Component {
  cardStyle = {
    cursor: 'pointer',
  };

  render() {
    return (
      <div className="card" style={ this.cardStyle } onClick={ () => this.props.selectBranch(this.props) }>
        <div className="image">
          <img src={ this.props.picture } />
        </div>
        <div className="content">
          <a className="header">
            { this.props.brand.name }
          </a>
          <div className="meta">
            <a>
              { this.props.name }
            </a>
            <span className="right floated">
              <span style={{ marginLeft: '4px' }}>6</span>
              <i className="ticket alternate right icon"></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default BranchCard;
