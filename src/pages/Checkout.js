import React from 'react';
import PropTypes from 'prop-types';

class Checkout extends React.Component {
  render() {
    const { cart } = this.props;
    return (
      <form>
        <div>
          <h1>Revise seus Produtos</h1>
          <div>
            {cart.map((cartItem) => (
              <div key={ cartItem.product.id }>
                <h2>{cartItem.product.title}</h2>
                <h3>{ `Preço: ${cartItem.product.price} `}</h3>
                <h3>{ `Quantidade: ${cartItem.quantity}` }</h3>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1>Informações do Comprador</h1>
          <div>
            <input
              type="text"
              data-testid="checkout-fullname"
              placeholder="Nome Completo"
            />
            <input
              type="string"
              data-testid="checkout-cpf"
              placeholder="CPF"
            />
            <input
              type="email"
              data-testid="checkout-email"
              placeholder="Email"
            />
            <input
              type="string"
              data-testid="checkout-phone"
              placeholder="Telefone"
            />
            <input
              type="string"
              data-testid="checkout-cep"
              placeholder="CEP"
            />
            <input
              type="text"
              data-testid="checkout-address"
              placeholder="Endereço"
            />
            <input
              type="text"
              placeholder="Complemento"
            />
            <input
              type="number"
              placeholder="Número"
            />
            <input
              type="text"
              placeholder="Cidade"
            />
            <input
              type="text"
              placeholder="Estado"
            />
          </div>
        </div>
        <div>
          <h1>Método de pagamento</h1>
          <input
            type="radio"
            value="boleto"
            name="pagamento"
          />
          Boleto
          <div>
            <span>Cartão de Crédito</span>
            <div>
              <input
                type="radio"
                value="visa"
                name="pagamento"
              />
              Visa
              <input
                type="radio"
                value="mastercard"
                name="pagamento"
              />
              MasterCard
              <input
                type="radio"
                value="elo"
                name="pagamento"
              />
              Elo
            </div>
          </div>
        </div>
        <button type="button" className="buy-btn">Comprar</button>
      </form>
    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default Checkout;
