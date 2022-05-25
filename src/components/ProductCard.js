import React from 'react';
import PropTypes from 'prop-types';

class ProductCard extends React.Component {
  render() {
    const { image, title, price } = this.props;
    return (
      <div>
        <img width="70px" src={ image } alt={ title } />
        <h2>{ title }</h2>
        <p>{ price }</p>
      </div>
    );
  }
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductCard;
