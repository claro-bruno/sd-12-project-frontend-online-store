import React, { Component } from 'react';
import * as API from '../services/api';

import SearchBar from './SearchBar';
import Categories from './Categories';
import ProductDetails from './ProductDetails';
import ShoppingCart from './ShoppingCart';
import ProductList from './ProductList';
import Checkout from './Checkout';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      shoppingCartProductList: [],
      query: '',
      renderDetailsFor: {},
      renderDetails: false,
      renderShoppingCart: false,
      renderCheckout: false,
    };
    this.getProductList = this.getProductList.bind(this);
    this.getProductListByCategory = this.getProductListByCategory.bind(this);
    this.getProductListByQuery = this.getProductListByQuery.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.updateCartProduct = this.updateCartProduct.bind(this);
    this.addNewProductToCart = this.addNewProductToCart.bind(this);
    this.goBackCallBack = this.goBackCallBack.bind(this);
  }

  // componentDidMount() {
  //   this.getProductList(undefined, 'motos');
  // }

  async getProductList(categoryid, query) {
    const productList = await API.getProductsFromCategoryAndQuery(categoryid, query);
    this.setState({
      productList: productList.results,
    });
  }

  getProductListByCategory(categoryid) {
    const { query } = this.state;
    this.getProductList(categoryid, query);
  }

  getProductListByQuery(query) {
    this.setState({
      query,
    });
    this.getProductList(undefined, query);
  }

  getIndexById(id, array) { return array.map((elem) => elem.id).indexOf(id); }

  addNewProductToCart(newCartProduct) {
    return ({
      id: newCartProduct.id,
      quantity: 1,
      price: newCartProduct.price,
      product: newCartProduct,
    });
  }

  updateCartProduct(productToBeUpdated, operation) {
    const { shoppingCartProductList } = this.state;
    const tempState = [...shoppingCartProductList];
    const productId = (productToBeUpdated.site_id === 'MLB'
      ? productToBeUpdated.id
      : productToBeUpdated.getAttribute('productid'));
    const index = this.getIndexById(productId, tempState);
    const tempElement = { ...tempState[index] };
    if (operation === '+') tempElement.quantity += 1;
    if (operation === '-') tempElement.quantity -= 1;
    if (tempElement.quantity < 0) tempElement.quantity = 0;
    tempState[index] = tempElement;
    this.setState({
      shoppingCartProductList: tempState,
    });
  }

  addToCart(product) {
    const { shoppingCartProductList } = this.state;
    if (shoppingCartProductList.some((prod) => prod.id === product.id)) {
      this.updateCartProduct(product, '+');
    } else {
      this.setState((prev) => ({
        shoppingCartProductList: [
          ...prev.shoppingCartProductList, this.addNewProductToCart(product)],
      }));
    }
  }

  findProduct(productList, renderDetailsProductId) {
    return productList.find((product) => product.id === renderDetailsProductId);
  }

  goBackCallBack() {
    this.setState({
      renderShoppingCart: false,
      renderDetails: false,
      renderCheckout: false,
    });
  }

  renderDetails(renderDetailsProductId) {
    const { productList } = this.state;
    const detailedProduct = this.findProduct(productList, renderDetailsProductId);
    this.setState({
      renderDetailsFor: detailedProduct,
      renderDetails: true,
    });
  }

  render() {
    const {
      productList,
      renderDetails,
      renderDetailsFor,
      shoppingCartProductList,
      renderShoppingCart,
      renderCheckout,
    } = this.state;

    if (renderShoppingCart) {
      return (
        <ShoppingCart
          shoppingCartProductList={ shoppingCartProductList }
          goBackCallBack={ this.goBackCallBack }
          updateQuantityCallBack={
            (productToBeUpdated, operation) => this
              .updateCartProduct(productToBeUpdated, operation)
          }
          renderCheckoutCallBack={ () => this.setState({
            renderShoppingCart: false,
            renderDetails: false,
            renderCheckout: true,
          }) }
        />
      );
    }
    if (renderCheckout) {
      return (
        <Checkout
          shoppingCartProductList={ shoppingCartProductList }
          goBackCallBack={ this.goBackCallBack }
        />
      );
    }
    if (renderDetails) {
      return (<ProductDetails
        product={ renderDetailsFor }
        renderShoppingCartCallBack={ () => this.setState({
          renderShoppingCart: true,
          renderDetails: false,
          renderCheckout: false,
        }) }
        goBackCallBack={ this.goBackCallBack }
      />);
    }
    return (
      <>
        <SearchBar
          getProductListByQueryCallBack={ this.getProductListByQuery }
        />
        <button
          type="button"
          onClick={ () => {
            this.setState({
              renderShoppingCart: true,
            });
          } }
          data-testid="shopping-cart-button"
        >
          carrinho
        </button>
        <Categories
          getProductListByCategoryCallBack={ this.getProductListByCategory }
        />
        <ProductList
          productList={ productList }
          renderDetailsCallBack={ this.renderDetails }
          addToCartCallback={ this.addToCart }
        />
      </>
    );
  }
}

export default Home;
