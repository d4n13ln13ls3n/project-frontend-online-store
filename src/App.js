import React from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import ProductList from './pages/ProductList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" component={ ProductList } />
      </BrowserRouter>
    </div>
  );
}

export default App;
