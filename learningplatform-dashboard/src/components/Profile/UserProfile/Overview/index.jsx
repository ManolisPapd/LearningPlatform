import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Photo from '../Photo';
import Button from '../Button';
import LikeButton from '../LikeButton';
import ShareButton from '../ShareButton';

import Wrapper from './Wrapper';
import Share, { ShareWindow } from './Share';
import * as Information from './Information';
import * as Statistics from './Statistics';

class Overview extends PureComponent {
  static propTypes = {
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    statistics: PropTypes.shape({
      likesCount: PropTypes.number,
      followingCount: PropTypes.number,
      followersCount: PropTypes.number,
    }).isRequired,
    onLike: PropTypes.func.isRequired,
    onFollow: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = { shareVisible: false };
  }

  onShareToggle = () => {
    this.setState(prevState => ({
      shareVisible: !prevState.shareVisible,
    }));
  };

  render() {
    const {
      photo, name, location,email, statistics, onLike, onFollow,
    } = this.props;
    const { shareVisible } = this.state;

    return (
      <Wrapper>
        

        <Information.Wrapper>
          <Photo src={photo} alt={name} size="big" />

          <div>
            <Information.Title>
              {name}
              {' '}
              
            </Information.Title>
            <Information.Subtitle>{location}</Information.Subtitle>
            <Information.Subtitle>{email}</Information.Subtitle>
          </div>
        </Information.Wrapper>

        
      </Wrapper>
    );
  }
}

export default Overview;
