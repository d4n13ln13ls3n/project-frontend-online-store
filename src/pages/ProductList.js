import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery, getProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import '../components/ProductList.css';

class ProductList extends React.Component {
  state = {
    productName: '',
    productList: [],
    firstEnter: true,
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleClick = async () => {
    const { productName } = this.state;
    const response = await getProductsFromCategoryAndQuery('$CATEGORY_ID', productName);
    this.setState({
      productList: response.results,
      firstEnter: false,
    });
  }

  listProductsByCategory = async ({ target: { id } }) => {
    const response = await getProductsByCategory(id);
    this.setState({
      productList: response.results,
      firstEnter: false,
    });
  }

  render() {
    const { productName, productList, firstEnter } = this.state;
    const { addToCartButton, cart } = this.props;
    const firstEnterSpan = (
      <span
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </span>
    );
    const productsCards = (
      productList.map((product) => (
        <div
          className="product-div"
          data-testid="product"
          key={ product.id }
        >
          <Link
            data-testid="product-detail-link"
            to={ `/product/${product.id}` }
            details={ product }
          >
            <ProductCard
              className="container"
              key={ product.id }
              image={ product.thumbnail }
              alt={ product.title }
              title={ product.title }
              price={ product.price }
              shipping={ product.shipping.free_shipping }
              addToCartButton={ () => addToCartButton(product) }
            />
          </Link>
          <button
            data-testid="product-add-to-cart"
            type="button"
            onClick={ () => addToCartButton(product) }
            id={ product.id }
          >
            Adicionar ao Carrinho
          </button>
        </div>
      ))
    );
    const searchMessage = firstEnter ? firstEnterSpan : (
      <span>
        Nenhum produto foi encontrado
      </span>
    );
    return (
      <main>
        <header className="header">
          <h1 className="header-title">DLMR: FrontEnd Online Store</h1>
          <Link
            className="cart-link"
            to="/cart-list"
            data-testid="shopping-cart-button"
          >
            <i
              className="material-icons cartIcon"
            >
              shopping_cart

            </i>
            <span
              className="cart-items-qnt"
              data-testid="shopping-cart-size"
            >
              {cart.reduce((acc, current) => acc + current.quantity, 0)}

            </span>
          </Link>
        </header>

        <aside>
          <Categories
            listProductsByCategory={ this.listProductsByCategory }
          />
        </aside>
        <div className="aaa-search">
          <div className="search-input">
            <input
              value={ productName }
              name="productName"
              type="text"
              data-testid="query-input"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.handleClick }
            >
              Pesquisar
            </button>
          </div>
          <div className="product-list">

            {
              productList.length === 0 ? searchMessage : productsCards
            }
          </div>
        </div>
      </main>
    );
  }
}

ProductList.propTypes = {
  addToCartButton: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default ProductList;
