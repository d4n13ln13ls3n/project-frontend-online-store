import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';
import CommentSection from '../components/CommentSection';
import PreviousComments from '../components/PreviousComments';
import '../components/styles/Product.css';

class Products extends React.Component {
  state = {
    productDetails: {
      attributes: [],
    },
    // commentObj: {
    //   comments: [],
    //   email: '',
    //   rating: 0,
    //   evaluationDetails: '',
    // },
  }

  async componentDidMount() {
    try {
      const { match: { params: { id } } } = this.props;
      const response = await getProductDetails(id);
      this.setState({
        productDetails: response,
      });
      console.log(response.id);
    } catch (error) {
      console.log(error.message);
    }
  }

  saveComments = ({ target }) => {
    console.log(target.name);
  };

  saveCommentEmail = ({ target }) => {
    console.log(target.value);
  }

  handleTextAreaCommentChanges = ({ target }) => {
    console.log(target.value);
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { productDetails } = this.state;
    const { attributes } = productDetails;
    const { addProductToCart, saveComments, PreviousCommentSections } = this.props;

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
            Carrinho
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
            saveCommentEmail={ this.saveCommentEmail }
            handleTextAreaCommentChanges={ this.handleTextAreaCommentChanges }
            saveComments={ this.saveComments }
          />
          {
            <PreviousCommentSections /> ? <PreviousComments /> : <h3>Deixe a primeira avaliação do produto!</h3>
          }
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
};

export default Products;
