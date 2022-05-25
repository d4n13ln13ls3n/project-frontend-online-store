import React from 'react';
import { Link } from 'react-router-dom';
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
    const firstEnterSpan = (
      <span
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </span>
    );
    const productsCards = (
      productList.map((product) => (
        <Link
          data-testid="product-detail-link"
          key={ product.id }
          to={ `/product/${product.id}` }
          details={ product }
        >
          <ProductCard
            key={ product.id }
            data-testid="product"
            image={ product.thumbnail }
            alt={ product.title }
            title={ product.title }
            price={ product.price }
          />
        </Link>
      ))
    );
    const searchMessage = firstEnter ? firstEnterSpan : (
      <span>
        Nenhum produto foi encontrado
      </span>
    );
    return (
      <main>
        <aside>
          <Categories
            listProductsByCategory={ this.listProductsByCategory }
          />
        </aside>
        <div>
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
          <Link
            to="/cart-list"
            data-testid="shopping-cart-button"
          >
            Carrinho
          </Link>
        </div>
        {
          productList.length === 0 ? searchMessage : productsCards
        }

      </main>
    );
  }
}

export default ProductList;
