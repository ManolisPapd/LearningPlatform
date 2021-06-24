import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import commentLogo from '../../../../images/commentLogo.png';

import Input from '../Input';

import Wrapper from './Wrapper';

class NewComment extends PureComponent {
  static propTypes = { onNewComment: PropTypes.func.isRequired };

  constructor() {
    super();

    this.input = createRef();
  }

  onSubmit = (e) => {
    const { onNewComment } = this.props;
    const { value } = this.input.current;

    if (value) {
      onNewComment(e, value);
      var commentsFromLocalStorage = JSON.parse( localStorage.getItem('comments'));
      var newComment = {
        photo: {commentLogo},
        content: value,
        createdAt: Date.now()
      }
      if(commentsFromLocalStorage){
        commentsFromLocalStorage.unshift(newComment);
        localStorage.setItem('comments', JSON.stringify(commentsFromLocalStorage));
      }
      
      
      

      this.input.current.value = '';
    }
  };

  render() {
    return (
      <Wrapper as="form" onSubmit={this.onSubmit}>
        <Input type="text" ref={this.input} placeholder="Add note" required />
      </Wrapper>
    );
  }
}
export default NewComment;
