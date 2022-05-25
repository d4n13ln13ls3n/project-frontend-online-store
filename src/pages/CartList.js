import React from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';

class CartList extends React.Component {
  state = {
    cartItems: [],
  }

  componentDidMount() {
    const { cart } = this.props;
    cart.forEach((product) => {
      getProductDetails(product.id).then((response) => {
        this.setState((estadoAnterior) => ({
          cartItems: [...estadoAnterior.cartItems, {
            product: response,
            quantity: product.quantity,
          }],
        }));
      });
    });
  }

  render() {
    const { cartItems } = this.state;
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
          cartItems.map((productObject) => (
            <div key={ productObject.product.id }>
              <h2
                data-testid="shopping-cart-product-name"
              >
                {productObject.product.title}
              </h2>
              <h3>{productObject.product.price}</h3>
              <h3
                data-testid="shopping-cart-product-quantity"
              >
                {productObject.quantity}
              </h3>
            </div>
          ))
        }
        <h3>
          {
            `Você tem
            ${cartItems.reduce((acc, current) => acc + current.quantity, 0)}
            itens no seu carrinho`
          }
        </h3>
      </div>
    );
    return (
      <div>
        <h1>shopping cart</h1>
        { cartItems.length === 0 ? emptyCart : cartComponent }
      </div>
    );
  }
}

CartList.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CartList;
