import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';

class Products extends React.Component {
  state = {
    productDetails: {
      attributes: [],
    },

  }

  async componentDidMount() {
    try {
      const { match: { params: { id } } } = this.props;
      const response = await getProductDetails(id);
      console.log(typeof response.results, response.results);
      this.setState({
        productDetails: response,
      });
      console.log(typeof response, response);
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { productDetails } = this.state;
    const { attributes } = productDetails;
    console.log(productDetails.attributes);
    return (
      <div className="product-display">
        <Link
          to="/cart-list"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
        <Link
          to="/"
        >
          Back
        </Link>
        <h1 data-testid="product-detail-name">{productDetails.title}</h1>
        <img src={ productDetails.thumbnail } alt={ productDetails.title } />
        <h3>
          Preço:
          {' '}
          { productDetails.price}
        </h3>
        <div>
          {
            attributes.map((attribute, index) => (
              <div key={ index }>
                <span>{ attribute.name }</span>
                <span>{attribute.value_name}</span>
              </div>
            ))
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

};

export default Products;
