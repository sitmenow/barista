import React from 'react';

import './TurnForm.css';


const extractDomainFromEmailAddress = (emailAddress = '') => {
  const [id, domain] = emailAddress.split('@');
  if (!domain) return '';
  const [company] = domain.split('.');
  if (!company) return '';
  return company;
}

class TurnForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turn: {
        name: props.user.name,
        company: extractDomainFromEmailAddress(props.user.email),
        product: '',
      },
    };
  }

  handleFormDestruction = () => {
    this.props.hideTurnForm();
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


  render() {
    return (
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
                value={ this.state.turn.product }
                onChange={ (e) => { this.handleFormChange({ product: e.target.value }) } }
              />
            </div>

            <div className="fields">
              <div className="nine wide field">
                <label>Name</label>
                <input
                  type="text"
                  maxLength="16"
                  placeholder="Name"
                  value={ this.state.turn.name }
                  onChange={ (e) => { this.handleFormChange({ name: e.target.value }) } }
                />
              </div>
              <div className="seven wide field">
                <label>Company</label>
                <input
                  type="text"
                  maxLength="16"
                  placeholder="Company"
                  value={ this.state.turn.company }
                  onChange={ (e) => { this.handleFormChange({ company: e.target.value }) } }
                />
              </div>
            </div>

            <button className="ui primary right floated button" tabIndex="0" onClick={ (e) => this.handleFormSubmit(e) } >Confirm</button>
            <button className="ui left floated button" tabIndex="1" onClick={ () => this.handleFormDestruction() } >Cancel</button>
          </form>

        </div>
      </div>
    );
  }
}

export default TurnForm;
