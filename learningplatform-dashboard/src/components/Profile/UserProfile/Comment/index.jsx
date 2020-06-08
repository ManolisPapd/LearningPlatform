import React from 'react';

import Photo from '../Photo';

import CommentPropTypes from './PropTypes';
import Wrapper from './Wrapper';
import DateView from './Date';
import commentLogo from '../../../../images/commentLogo.png';

export const getFormattedTimestamp = (time) => {
  const diff = (Date.now() - time) / 1000 / 60; // Minutes

  if (diff < 60) {
    return `${Math.round(diff)}m`;
  }

  if (diff >= 60 && diff < 24 * 60) {
    return `${Math.round(diff / 60)}h`;
  }

  return `${Math.round(diff / (24 * 60))}d`;
};

const Comment = ({
  photo, userName, content, createdAt,
}) => (
  <Wrapper>
    <div>
      <Photo src={commentLogo} alt={userName} size="small" />
    </div>
    <div>
      {content}
    </div>
    <DateView>{getFormattedTimestamp(createdAt)}</DateView>
  </Wrapper>
);

Comment.propTypes = CommentPropTypes;

export default Comment;
