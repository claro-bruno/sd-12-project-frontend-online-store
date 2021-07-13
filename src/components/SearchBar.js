import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      searchText: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { callBack } = this.props;
    const { id, searchText } = this.state;
    callBack(id, searchText);
  }

  render() {
    const { searchText } = this.state;
    return (
      <>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="search-text" data-testid="home-initial-message">
            <input
              type="text"
              name="searchText"
              value={ searchText }
              onChange={ this.handleChange }
              data-testid="query-input"
            />
            Digite algum termo de pesquisa ou escolha uma categoria.
          </label>
          <input type="submit" value="Submit" data-testid="query-button" />
        </form>
        <button type="button">
          <Link data-testid="shopping-cart-button" to="/ShoppingCart">carrinho</Link>
        </button>
      </>
    );
  }
}

SearchBar.propTypes = {
  callBack: PropTypes.func.isRequired,
};

export default SearchBar;