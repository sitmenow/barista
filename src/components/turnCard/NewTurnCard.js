import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createTurnAsCustomer } from './actions';
import './NewTurnCard.css';


const mapStateToNewTurnCardProps = (state, props) => props;

const mapDispatchToNewTurnCardProps = (dispatch, props) => {
  return bindActionCreators({ createTurnAsCustomer }, dispatch);
};

const mergeNewTurnCardProps = (stateProps, dispatchProps, ownProps) => (
  {
    ...stateProps,
    ...dispatchProps,
  }
);

const extractDomainFromEmailAddress = (emailAddress = '') => {
  const [id, domain] = emailAddress.split('@');
  if (!domain) return '';
  const [company] = domain.split('.');
  if (!company) return '';
  return company;
}

class NewTurnCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      turn: {
        name: props.user.name,
        company: extractDomainFromEmailAddress(props.user.email),
        product: '',
      },
    };
  }

  handleFormCreation = () => {
    this.setState({ showForm: true });
  };

  handleFormDestruction = () => {
    this.setState({ showForm: false });
  };

  handleFormChange = ({ name, company, product }) => {
    if (name !== undefined) {
      const turn = Object.assign(this.state.turn, { name });
      this.setState({ turn });
    }

    if (company !== undefined) {
      const turn = Object.assign(this.state.turn, { company });
      this.setState({ turn });
    }

    if (product !== undefined) {
      const turn = Object.assign(this.state.turn, { product });
      this.setState({ turn });
    }
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    this.props.createTurnAsCustomer(this.state.turn);
  };

  static PlaceHolder = ({ onClick }) => (
    <div className="ui fluid new card" onClick={ onClick } >
      <div className="content center aligned">
        <div className="meta">
          <i className="plus circle icon"></i>
          <span>
            Create Turn
          </span>
        </div>
      </div>
    </div>
  );

  static Form = ({ turn, onChange, onSubmit, onCancel }) => (
    <div className="ui fluid card">
      <div className="content">
        <h4 className="ui dividing header">New Turn</h4>

        <form className="ui form">
          <div className="field">
            <label>Product</label>
            {/*
            <div className="ui selection dropdown">
              <input type="hidden" name="card[type]" />
              <div className="default text">Select a product</div>
              <i className="dropdown icon"></i>
              <div className="menu">
                <div className="item" data-value="visa">
                  <i className="visa icon"></i>
                  Visa
                </div>
              </div>
            </div>
            */}
            <input
              type="text"
              maxLength="80"
              placeholder="Type a product"
              value={ turn.product }
              onChange={ (e) => { onChange({ product: e.target.value }) } }
            />
          </div>

          <div className="fields">
            <div className="nine wide field">
              <label>Name</label>
              <input
                type="text"
                maxLength="16"
                placeholder="Name"
                value={ turn.name }
                onChange={ (e) => { onChange({ name: e.target.value }) } }
              />
            </div>
            <div className="seven wide field">
              <label>Company</label>
              <input
                type="text"
                maxLength="16"
                placeholder="Company"
                value={ turn.company }
                onChange={ (e) => { onChange({ company: e.target.value }) } }
              />
            </div>
          </div>

          <button className="ui primary right floated button" tabIndex="0" onClick={ onSubmit } >Confirm</button>
          <button className="ui left floated button" tabIndex="1" onClick={ onCancel } >Cancel</button>
        </form>

      </div>
    </div>
  );

  render() {
    if (this.state.showForm) {
      return (
        <NewTurnCard.Form
          turn={ this.state.turn }
          onChange={ (turn) => this.handleFormChange(turn) }
          onCancel={ () => this.handleFormDestruction() }
          onSubmit={ (e) => this.handleFormSubmit(e) }
        />
      );
    }

    return (
      <NewTurnCard.PlaceHolder
        onClick={ () => this.handleFormCreation() }
      />
    );
  }
}


export default connect(
  mapStateToNewTurnCardProps,
  mapDispatchToNewTurnCardProps,
  mergeNewTurnCardProps,
)(NewTurnCard);
