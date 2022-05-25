import React from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import ProductList from './pages/ProductList';
import CartList from './pages/CartList';
import Products from './pages/Products';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={ ProductList } />
        <Route path="/product/:id" render={ (id) => <Products { ...id } /> } />
        <Route path="/cart-list" component={ CartList } />
      </BrowserRouter>
    </div>
  );
}

export default App;
