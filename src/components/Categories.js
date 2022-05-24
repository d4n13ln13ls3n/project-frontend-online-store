import React from 'react';
import { getCategories } from '../services/api';

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
    return (
      <div>
        { categories.map((category) => (
          <button type="button" data-testid="category" key={ category.id }>
            { category.name }
          </button>
        ))}
      </div>
    );
  }
}

export default Categories;
