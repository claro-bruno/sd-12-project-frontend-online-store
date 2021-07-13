import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchInput extends Component {
  render() {
    const { onChange, name } = this.props;
    return (
      <div>
        <input
          name={ name }
          type="text"
          data-testid="query-input"
          onChange={ onChange }
        />
        <button
          type="button"
          data-testid="query-button"
        >
          BUSCAR
        </button>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default SearchInput;
