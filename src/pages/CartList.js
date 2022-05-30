import React from 'react';
import PropTypes from 'prop-types';

class CartList extends React.Component {
  state = {
    cartItems: [],
  }

  async componentDidMount() {
    const { cart } = this.props;
    this.setState({
      cartItems: cart,
    });
  }

  increaseQuantity = ({ target }) => {
    const { id } = target;
    this.setState((estadoAnterior) => ({
      cartItems: estadoAnterior.cartItems.map((product) => {
        if (product.product.id === id) {
          return {
            quantity: product.quantity + 1,
            product: product.product,
          };
        }
        return product;
      }),
    }));
  }

  decreaseQuantity = ({ target }) => {
    const { id } = target;
    const { cartItems } = this.state;
    const productObject = cartItems.find((item) => item.product.id === id);
    if (productObject.quantity !== 1) {
      this.setState((estadoAnterior) => ({
        cartItems: estadoAnterior.cartItems.map((product) => {
          if (product.product.id === id) {
            return {
              quantity: product.quantity - 1,
              product: product.product,
            };
          }
          return product;
        }),
      }));
    }
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
          cartItems.map((cartItem) => (
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
                onClick={ this.decreaseQuantity }
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
                onClick={ this.increaseQuantity }
              >
                +
              </button>
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
