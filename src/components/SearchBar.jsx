import React, { Component } from 'react';
import CartIcon from '../Icons/CartIcon';

class SearchBar extends Component {
  render() {
    return (
      <div>
        <label htmlFor="label-imput-search">
          <input data-testid="imput-search" />
        </label>
        <CartIcon />
        <div>
          <h4
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h4>
        </div>
      </div>
    );
  }
}

export default SearchBar;
