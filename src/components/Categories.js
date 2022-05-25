import React from 'react';
import Proptypes from 'prop-types';
import { getCategories } from '../services/api';
import './Categories.css';

class Categories extends React.Component {
  state = {
    categories: [],
  }

  async componentDidMount() {
    const categoryList = await getCategories();
    this.setState({
      categories: categoryList,
    });
  }

  render() {
    const { categories } = this.state;
    const { listProductsByCategory } = this.props;
    return (
      <div className="categories-container">
        { categories.map((category) => (
          <button
            type="button"
            data-testid="category"
            key={ category.id }
            id={ category.id }
            onClick={ listProductsByCategory }
          >
            { category.name }
          </button>
        ))}
      </div>
    );
  }
}
Categories.propTypes = {
  listProductsByCategory: Proptypes.func.isRequired,
};
export default Categories;
