import React from 'react';
import PropTypes from 'prop-types';

class CategoriesFilter extends React.Component {
  render() {
    const { categories, onChange } = this.props;
    return (
      <nav className="categories-bar">
        <div>
          { categories.map(({ id, name }) => (
            <label
              htmlFor={ id }
              data-testid="category"
              key={ id }
            >
              <input
                id={ id }
                type="radio"
                name="categoryId"
                value={ id }
                onChange={ onChange }
              />
              { name }
            </label>
          )) }
        </div>
      </nav>
    );
  }
}

CategoriesFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategoriesFilter;
