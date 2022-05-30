import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import Checkout from './Checkout';

class CartList extends React.Component {
  render() {
    const { increaseQuantity, decreaseQuantity, cart } = this.props;
    // console.log('cart:', cartItems);
    const emptyCart = (
      <p
        data-testid="shopping-cart-empty-message"
      >
        Seu carrinho está vazio

      </p>
    );
    const cartComponent = (
      <div>
        {
          cart.map((cartItem) => (
            <div key={ cartItem.product.id }>
              <button type="button">
                X
              </button>
              <h2
                data-testid="shopping-cart-product-name"
              >
                {cartItem.product.title}
              </h2>
              <h3>{cartItem.product.price}</h3>
              <button
                type="button"
                data-testid="product-decrease-quantity"
                id={ cartItem.product.id }
                onClick={ decreaseQuantity }
              >
                -
              </button>
              <h3
                data-testid="shopping-cart-product-quantity"
              >
                {cartItem.quantity}
              </h3>
              <button
                type="button"
                id={ cartItem.product.id }
                data-testid="product-increase-quantity"
                onClick={ increaseQuantity }
              >
                +
              </button>
            </div>
          ))
        }
        <h3>
          {
            `Você tem
            ${cart.reduce((acc, current) => acc + current.quantity, 0)}
            itens no seu carrinho`
          }
        </h3>
        <Link
          to="/checkout"
          data-testid="checkout-products"
        >
          Ir para a página de pagamento
        </Link>
      </div>
    );
    return (
      <div>
        <h1>shopping cart</h1>
        { cart.length === 0 ? emptyCart : cartComponent }
      </div>
    );
  }
}

CartList.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
};

export default CartList;
