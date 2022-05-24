import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';

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
        <div
          key={ product.id }
          data-testid="product"
        >
          <img width="300px" src={ product.thumbnail } alt={ product.title } />
          <h2>{ product.title }</h2>
          <p>{ product.price }</p>
        </div>))
    );
    const searchMessage = firstEnter ? firstEnterSpan : (
      <span>
        Nenhum produto foi encontrado
      </span>
    );
    return (
      <main>
        <aside>
          <Categories />
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
