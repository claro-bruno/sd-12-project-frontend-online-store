import React from 'react';
import PropTypes from 'prop-types';

class ProductItem extends React.Component {
  constructor() {
    super();

    this.handleAddCart = this.handleAddCart.bind(this);
  }

  handleAddCart() {
    const { product, handleCart, cart, shouldUpdateCart } = this.props;
    const { title, thumbnail, price } = product;
    let isItemFound;
    if (cart.length > 0) {
      isItemFound = cart.find((item) => item.title === title);
    }
    // console.log(isItemFound);
    const item = {
      quantity: 1,
      title,
      thumbnail,
      price,
    };
    if (isItemFound) {
      isItemFound.quantity += 1;
      shouldUpdateCart();
      return;
    }
    // console.log(item.quantity);
    handleCart(item);
  }

  render() {
    const { product } = this.props;
    return (
      <div
        className={ `productItem ${product.id}` }
        data-testid="product"
      >
        <h3>{ `${product.title}` }</h3>
        <img
          className="thumbnail"
          src={ product.thumbnail }
          alt={ product.title }
        />
        <p>{ product.price }</p>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => this.handleAddCart() }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductItem.propTypes = {
  product: PropTypes.objectOf(Object).isRequired,
  handleCart: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(PropTypes.string),
  shouldUpdateCart: PropTypes.func.isRequired,
};

ProductItem.defaultProps = {
  cart: [{ title: 'undefined' }],
};

export default ProductItem;
