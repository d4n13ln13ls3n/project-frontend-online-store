import React from 'react';
import { Link } from 'react-router-dom';

class ProductList extends React.Component {
  render() {
    return (
      <main>
        <Link
          to="/cart-list"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>

        <span
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </span>

      </main>
    );
  }
}

export default ProductList;
