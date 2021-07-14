import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ProductCard extends React.Component {
  render() {
    const { product } = this.props;
    const { title, thumbnail, price } = product;
    return (
      <Link to="/product-details" data-testid="product-detail-link">
        <div data-testid="product">
          <div>
            { title }
          </div>
          <div>
            <img src={ thumbnail } alt={ `${title}` } />
          </div>
          <div>
            { price }
          </div>
        </div>
      </Link>
    );
  }
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};
export default ProductCard;
