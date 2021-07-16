import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotFound from './NotFound';
import Cardproduct from '../Components/CardProduct';

class Products extends Component {
  render() {
    const { productList, addToCart, homeProducts } = this.props;
    const time = 1000;
    setTimeout(() => {
      if (productList.length || homeProducts.length === 0) {
        return <NotFound />;
      }
    }, time);

    return (
      <div>
        { productList.map((product) => (
          <div className="product-list" key={ product.id }>
            <Cardproduct
              shipping={ product.shipping }
              title={ product.title }
              img={ product.thumbnail }
              price={ product.price }
              id={ product.id }
              categoryId={ product.category_id }
              addToCart={ () => addToCart(product) }
            />
          </div>
        ))}
      </div>
    );
  }
}

Products.propTypes = {
  productList: PropTypes.arrayOf(
    PropTypes.array,
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
  homeProducts: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default Products;
