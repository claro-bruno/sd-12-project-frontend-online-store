import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import ShoppingCart from './components/ShoppingCart';
import ProductList from './components/ProductList';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/ShoppingCart" component={ ShoppingCart } />
        <Route exact path="/" component={ ProductList } />
      </BrowserRouter>
    );
  }
}

export default App;
