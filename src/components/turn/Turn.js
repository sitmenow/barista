import React from 'react';
import moment from 'moment';

class Turn extends React.Component {
  static Buttons = ({ turnId, open, actions, isBaristaPreparing }) => {
    if (!open) return null;

    if (isBaristaPreparing) {
      return (
        <div style={{marginTop: '1em', textAlign: 'center'}} className='ui content'>
          <button
            style={{width: '40%'}}
            className="ui mini secondary left floated button"
            onClick={actions.unprepare}>
            Regresar
          </button>
          <button
            style={{width: '40%'}}
            className="ui mini primary right floated button"
            onClick={actions.serve} >
            Servir
          </button>
        </div>

      );
    } else {
      return (
        <div style={{marginTop: '1em'}} className='ui content'>
          <button className="fluid ui primary mini button" onClick={actions.prepare}>
            Prepare
          </button>
        </div>
      );
    }
  }

  timeStyle = {
    margin: 0,
  };

  labelStyle = {
    margin: '1em 0 0 0',
  };

  turnStyle = (open) => {
    const style = {
      cursor: 'pointer',
      display: 'block',
      padding: '1em 1em',
    };

    if (open) {
      style.padding = '1.2em 1em';
      style.background = '#F2F5F6';
    }

    return style;
  };

  render() {
    return (
      <div
        style={this.turnStyle(this.props.open)}
        className='ui item'
        onClick={() => this.props.actions.select(this.props.id)} >
        <div className='ui content'>
          <div className='right floated'>
            <div style={this.timeStyle} className='meta'>
              {moment(this.props.requestedTime).startOf('minute').fromNow()}
            </div>
            <div
              style={this.labelStyle}
              className={'ui orange horizontal small right floated label'}>
              {this.props.company}
            </div>
          </div>
          <div className='header'>{this.props.name}</div>
          <div className='description'>{this.props.product}</div>
        </div>

        <Turn.Buttons
          open={this.props.open}
          isBaristaPreparing={this.props.isBaristaPreparing}
          actions={this.props.actions} />

      </div>
    );
  }
}

export default Turn;
