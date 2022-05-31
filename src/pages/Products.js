import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';
import CommentSection from '../components/CommentSection';
import '../components/styles/Product.css';

class Products extends React.Component {
  constructor(props) {
    super(props);
    const locStorage = JSON.parse(localStorage.getItem('productEval')) || [];
    this.state = {
      productDetails: {
        attributes: [],
      },
      productId: '',
      comments: locStorage,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getProductDetails(id);
    this.setState({
      productDetails: response,
      productId: id,
    });
  }

  saveComments = (comment) => {
    const locStorage = JSON.parse(localStorage.getItem('productEval')) || [];
    locStorage.push(comment);
    localStorage.setItem('productEval', JSON.stringify(locStorage));
    this.setState((estadoAnterior) => ({
      comments: [...estadoAnterior.comments, comment],
    }));
  };

  render() {
    const { match: { params: { id } } } = this.props;
    const { productDetails, productId, comments } = this.state;
    const { attributes } = productDetails;
    const { addProductToCart, cart } = this.props;
    console.log(this.state, 'state');
    return (
      <div className="product-display">
        <navbar className="product-navbar">
          <Link
            to="/"
          >
            Back
          </Link>
          <Link
            to="/cart-list"
            data-testid="shopping-cart-button"
          >
            <i
              className="material-icons"
              style={ { fontSize: '45px', color: 'black' } }
            >
              shopping_cart

            </i>
            <span
              data-testid="shopping-cart-size"
            >
              {cart.reduce((acc, current) => acc + current.quantity, 0)}

            </span>
          </Link>
        </navbar>
        <h1 data-testid="product-detail-name">{productDetails.title}</h1>
        <img src={ productDetails.thumbnail } alt={ productDetails.title } />
        <h3>
          Preço: R$
          { productDetails.price}
        </h3>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ () => addProductToCart(productDetails) }
          id={ id }
        >
          Adicionar ao Carrinho
        </button>
        <div className="product-attributes-list">
          {
            attributes.map((attribute, index) => (
              <div
                key={ index }
                className="product-attributes"
              >
                <div className="product-name">{ attribute.name }</div>
                <div className="product-descriptions">{attribute.value_name}</div>
              </div>
            ))
          }
        </div>
        <div className="comment-section">
          <CommentSection
            productId={ productId }
            saveComments={ this.saveComments }
          />
          <div>
            {
              comments.filter((element) => (element.productId === id))
                .map((comment, index) => (
                  <div key={ index }>
                    <p>
                      {comment.commentEmail}

                    </p>
                    <p>{`Nota: ${comment.rating}`}</p>
                    {console.log('funcionando?')}
                    <p>
                      {comment.evalDetails}

                    </p>
                  </div>
                ))
            }

          </div>

        </div>
      </div>

    );
  }
}
Products.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  addProductToCart: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Products;
