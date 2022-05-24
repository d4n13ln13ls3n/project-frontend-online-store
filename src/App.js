import React from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import ProductList from './pages/ProductList';
import CartList from './pages/CartList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={ ProductList } />
        <Route path="/cart-list" component={ CartList } />
      </BrowserRouter>
    </div>
  );
}

export default App;
