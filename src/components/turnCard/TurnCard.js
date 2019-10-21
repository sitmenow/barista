import React from 'react';
import moment from 'moment';

import './TurnCard.css';

class TurnCard extends React.Component {
  static PrepareButton = ({ action }) => (
    <button className="fluid ui primary mini button" onClick={ action }>
      Preparar
    </button>
  );

  static RejectButton = ({ action }) => (
    <button className="fluid ui primary mini button" onClick={ action } >
      Rechazar
    </button>
  );

  static CancelButton = ({ action }) => (
    <button className="fluid ui negative mini button" style={{ background: "#e43a3a" }} onClick={ action } >
      Cancelar
    </button>
  );

  static UnprepareButton = ({ action }) => (
    <button
      style={{width: '40%'}}
      className="ui mini secondary left floated button"
      onClick={ action }>
      Regresar
    </button>
  );

  static ServeButton = ({ action }) => (
    <button
      style={{width: '40%'}}
      className="ui mini primary right floated button"
      onClick={ action } >
      Servir
    </button>
  );

  timeStyle = {
    margin: 0,
  };

  labelStyle = {
    margin: '1em 0 0 0',
  };

  turnStyle = (open, index) => {
    const style = {
      cursor: 'pointer',
      display: 'block',
      padding: '1em 1em',
      height: '123px',
    };

    if (index === 0) {
      style.border = 0;
    }

    if (open) {
      // style.padding = '1.2em 1em';
      style.background = 'rgba(0, 0, 0, 0.05)';
    }

    return style;
  };

  render() {
    return (
      <div
        style={ this.turnStyle(this.props.open, this.props.index) }
        className='ui item'
        onClick={ () => this.props.select(this.props.id) } >
        <div className='ui content'>
          <div className='right floated'>
            <div style={this.timeStyle} className='meta'>
              {moment(this.props.requestedTime).startOf('minute').fromNow()}
            </div>
            <div
              style={this.labelStyle}
              className={'ui orange horizontal small right floated label'}>
              {this.props.company || 'VISITOR'}
            </div>
          </div>
          <div className='header'>{this.props.name}</div>
          <div className='description'>{this.props.product}</div>
        </div>

        {
          this.props.allowManagement && this.props.open && !this.props.lock &&
          <div style={{marginTop: '1em'}} className='ui content'>
            <TurnCard.PrepareButton action={ () => this.props.prepare(this.props.id) } />
            <TurnCard.RejectButton action={ () => this.props.reject(this.props.id) } />
          </div>
        }

        {
          this.props.allowManagement && this.props.open && this.props.lock &&
          <div style={{marginTop: '1em', textAlign: 'center'}} className='ui content'>
            <TurnCard.ServeButton action={ () => this.props.serve(this.props.id) } />
            <TurnCard.UnprepareButton action={ () => this.props.unprepare(this.props.id) } />
          </div>
        }

        {
          !this.props.allowManagement && this.props.open &&
          <div style={{marginTop: '1em'}} className='ui content'>
            <TurnCard.CancelButton action={ () => this.props.cancel(this.props.id) } />
          </div>
        }

      </div>
    );
  }
}

export default TurnCard;
