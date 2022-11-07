import React from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import ProductList from './pages/ProductList';
import CartList from './pages/CartList';
import Products from './pages/Products';
import Checkout from './pages/Checkout';

class App extends React.Component {
  state = {
    cart: [],
  }

  componentDidMount() {
    const cartStorage = JSON.parse(localStorage.getItem('cartStorage')) || [];
    this.setState({
      cart: cartStorage,
    });
  }

  addToCartButton = (product) => {
    const { id } = product;
    const { cart } = this.state;
    const cartItem = cart.find((p) => p.product.id === id);
    if (!cartItem) {
      const cartStorage = JSON.parse(localStorage.getItem('cartStorage')) || [];
      cartStorage.push({
        quantity: 1,
        product,
      });
      localStorage.setItem('cartStorage', JSON.stringify(cartStorage));
      this.setState((estadoAnterior) => ({
        cart: [...estadoAnterior.cart, {
          quantity: 1,
          product,
        }],
      }));
    } else {
      const cartStorage = JSON.parse(localStorage.getItem('cartStorage')) || [];
      const updatedCart = cartStorage.map((item) => this.updatesCart(item, id));
      localStorage.setItem('cartStorage', JSON.stringify(updatedCart));
      this.setState({
        cart: updatedCart,
      });
    }
  };

  updatesCart = (item, id) => {
    if (item.product.id === id) {
      return {
        quantity: item.quantity + 1,
        product: item.product,
      };
    }
    return item;
  }

  increaseQuantity = ({ target }) => {
    const { id } = target;
    const cartStorage = JSON.parse(localStorage.getItem('cartStorage')) || [];
    const updatedCart = cartStorage.map((item) => this.updatesCart(item, id));
    localStorage.setItem('cartStorage', JSON.stringify(updatedCart));
    this.setState({
      cart: updatedCart,
    });
  }

  decreaseQuantity = ({ target }) => {
    const { id } = target;
    const { cart } = this.state;
    const productObject = cart.find((item) => item.product.id === id);
    if (productObject.quantity !== 1) {
      const cartStorage = JSON.parse(localStorage.getItem('cartStorage')) || [];
      const updatedCart = cartStorage.map((item) => {
        if (item.product.id === id) {
          return {
            quantity: item.quantity - 1,
            product: item.product,
          };
        }
        return item;
      });
      localStorage.setItem('cartStorage', JSON.stringify(updatedCart));
      this.setState({
        cart: updatedCart,
      });
    }
  }

  render() {
    const { cart } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Route
            exact
            path="/"
            render={ () => (<ProductList
              addToCartButton={ this.addToCartButton }
              cart={ cart }
            />) }
          />
          <Route
            path="/product/:id"
            render={ (id) => (<Products
              { ...id }
              addProductToCart={ this.addToCartButton }
              cart={ cart }
            />) }
          />
          <Route
            path="/cart-list"
            render={ () => (<CartList
              cart={ cart }
              increaseQuantity={ this.increaseQuantity }
              decreaseQuantity={ this.decreaseQuantity }
            />) }
          />
          <Route path="/checkout" render={ () => <Checkout cart={ cart } /> } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

