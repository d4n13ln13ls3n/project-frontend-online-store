import React from 'react';
import PropTypes from 'prop-types';

class CommentSection extends React.Component {
  render() {
    const { saveComments, saveCommentEmail, handleTextAreaCommentChanges } = this.props;
    return (
      <div>
        <h2>Avaliações:</h2>
        <form className="form-comment-section">
          <label htmlFor="emailInput">
            <input
              required
              data-testid="product-detail-email"
              type="email"
              className="form-email"
              placeholder="E-mail"
              name="emailInput"
              onChange={ saveCommentEmail }
            />
          </label>
          <div
            className="star-rating"
          >
            <i
              data-testid="1-rating"
              className="material-icons"
              style={ {
                'font-size': '1.5rem', color: 'grey',
              } }
            >
              star

            </i>
            <i
              data-testid="2-rating"
              className="material-icons"
              style={ {
                'font-size': '1.5rem', color: 'grey',
              } }
            >
              star

            </i>
            <i
              data-testid="3-rating"
              className="material-icons"
              style={ {
                'font-size': '1.5rem', color: 'grey',
              } }
            >
              star

            </i>
            <i
              data-testid="4-rating"
              className="material-icons"
              style={ {
                'font-size': '1.5rem', color: 'grey',
              } }
            >
              star

            </i>
            <i
              data-testid="5-rating"
              className="material-icons"
              style={ {
                'font-size': '1.5rem', color: 'grey',
              } }
            >
              star

            </i>
          </div>
          <label htmlFor="textAreaInput">
            <textarea
              data-testid="product-detail-evaluation"
              className="form-textarea"
              placeholder="Deixe aqui o seu comentário."
              maxLength={ 400 }
              name="textareaInput"
              onChange={ handleTextAreaCommentChanges }
            />
          </label>
          <button
            onClick={ saveComments }
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
  saveCommentEmail: PropTypes.func.isRequired,
  handleTextAreaCommentChanges: PropTypes.func.isRequired,
  saveComments: PropTypes.func.isRequired,
};

export default CommentSection;
