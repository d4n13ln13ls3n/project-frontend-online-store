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

  addToCartButton = ({ target }) => {
    const { id } = target;
    this.setState((estadoAnterior) => {
      const verifyExistent = estadoAnterior.cart.some((product) => product.id === id);
      if (!verifyExistent) {
        return {
          cart: [...estadoAnterior.cart, {
            quantity: 1,
            id,
          }],
        };
      }
      return { cart: estadoAnterior.cart.map((product) => {
        if (product.id === id) {
          return {
            quantity: product.quantity + 1,
            id: product.id,
          };
        } return product;
      }),
      };
    });
  };

  render() {
    const { cart } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Route
            exact
            path="/"
            render={ () => <ProductList addToCartButton={ this.addToCartButton } /> }
          />
          <Route path="/product/:id" render={ (id) => <Products { ...id } /> } />
          <Route path="/cart-list" render={ () => <CartList cart={ cart } /> } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
