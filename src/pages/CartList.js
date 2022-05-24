import React from 'react';

class CartList extends React.Component {
  render() {
    return (
      <div>
        <h1>shopping cart</h1>
        <p
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio

        </p>
      </div>
    );
  }
}

export default CartList;
