import React from 'react';
import PropTypes from 'prop-types';

class CommentSection extends React.Component {
  state = {
    commentEmail: '',
    evalDetails: '',
    rating: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { saveComments, productId } = this.props;
    const { commentEmail, evalDetails, rating } = this.state;
    this.setState({
      commentEmail: '',
      evalDetails: '',
      rating: '',
    });

    saveComments({ productId, commentEmail, rating, evalDetails });
  }

  render() {
    const { commentEmail, evalDetails } = this.state;
    return (
      <div>
        <h2>Avaliações:</h2>
        <form
          className="form-comment-section"
          onSubmit={ this.handleSubmit }
        >
          <label htmlFor="commentEmail">
            <input
              required
              data-testid="product-detail-email"
              type="email"
              className="form-email"
              placeholder="E-mail"
              name="commentEmail"
              value={ commentEmail }
              onChange={ this.handleChange }
            />
          </label>
          <div className="rating-radio">
            <label
              htmlFor="rating"
            >
              <input
                type="radio"
                name="rating"
                value="1"
                data-testid="1-rating"
                onChange={ this.handleChange }
              />

              1
            </label>
            <label
              htmlFor="rating"
            >
              <input
                type="radio"
                name="rating"
                value="2"
                data-testid="2-rating"
                onChange={ this.handleChange }
              />

              2
            </label>
            <label
              htmlFor="rating"
            >
              <input
                type="radio"
                name="rating"
                value="3"
                data-testid="3-rating"
                onChange={ this.handleChange }
              />

              3
            </label>
            <label
              htmlFor="rating"
            >
              <input
                type="radio"
                name="rating"
                value="4"
                data-testid="4-rating"
                onChange={ this.handleChange }
              />

              4
            </label>
            <label
              htmlFor="rating"
            >
              <input
                type="radio"
                name="rating"
                value="5"
                data-testid="5-rating"
                onChange={ this.handleChange }
              />

              5
            </label>
          </div>

          <label htmlFor="evalDetails">
            <textarea
              data-testid="product-detail-evaluation"
              className="form-textarea"
              placeholder="Deixe aqui o seu comentário."
              maxLength={ 400 }
              name="evalDetails"
              value={ evalDetails }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="submit-review-btn"
            type="submit"
          >
            Salvar
          </button>
        </form>
      </div>
    );
  }
}

CommentSection.propTypes = {
  saveComments: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
};

export default CommentSection;
