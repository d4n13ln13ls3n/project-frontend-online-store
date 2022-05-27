import React from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import ProductList from './pages/ProductList';
import CartList from './pages/CartList';
import Products from './pages/Products';

class App extends React.Component {
  state = {
    cart: [],
  }

  addToCartButton = (product) => {
    const { id } = product;
    const { cart } = this.state;
    const cartItem = cart.find((p) => p.id === id);
    if (!cartItem) {
      this.setState((estadoAnterior) => ({
        cart: [...estadoAnterior.cart, { // não está mantendo sequencia do estado anterior
          quantity: 1,
          product,
        }],
      }));
    } else {
      this.setState((estadoAnterior) => ({
        cart: estadoAnterior.cart.map((item) => {
          if (item.id === id) {
            return {
              quantity: item.quantity + 1,
              product: item,
            };
          }
          return item;
        }),
      }));
    }
  };

  render() {
    const { cart } = this.state;
    // console.log(cart);
    return (
      <div className="App">
        <BrowserRouter>
          <Route
            exact
            path="/"
            render={ () => <ProductList addToCartButton={ this.addToCartButton } /> }
          />
          <Route
            path="/product/:id"
            render={ (id) => (<Products
              { ...id }
              addProductToCart={ this.addToCartButton }
            />) }
          />
          <Route path="/cart-list" render={ () => <CartList cart={ cart } /> } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

// save the whole product in the cart, not just the id
