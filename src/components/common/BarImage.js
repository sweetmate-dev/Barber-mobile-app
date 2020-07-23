import React, {useState} from 'react';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components';
import {DefaultAvatar, DefaultPicture} from '../../assets/images';
import {BarView} from '../styled/View';
import {dySize} from '../../utils/responsive';

const ProgressWrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

const BarImage = ({
  round = false,
  width = 100,
  height = 100,
  image,
  type = 'picture',
  style = {},
  resizeMode = 'cover',
  br = 0,
}) => {
  const [loading, setLoading] = useState(image !== null);
  const [loadError, setLoadError] = useState(false);

  const defaultImage = type === 'avatar' ? DefaultAvatar : DefaultPicture;
  const imageStyle = {
    width: dySize(width),
    height: dySize(height),
    borderRadius: round ? dySize(width) / 2 : 0,
    overflow: 'hidden',
    ...style,
  };

  return (
    <BarView
      width={width}
      height={height}
      justify="center"
      align="center"
      style={{position: 'relative', overflow: 'hidden', ...style}}
      br={round ? width / 2 : br}>
      <ProgressWrapper style={imageStyle}>
        {loading && <Progress.Circle size={30} indeterminate />}
        {loadError && <FastImage source={defaultImage} style={imageStyle} />}
      </ProgressWrapper>
      <FastImage
        style={imageStyle}
        onLoadEnd={() => setLoading(false)}
        onError={() => setLoadError(true)}
        source={image}
        resizeMode={FastImage.resizeMode[resizeMode]}
      />
    </BarView>
  );
};

BarImage.propTypes = {
  round: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  image: PropTypes.any,
  type: PropTypes.oneOf(['avatar', 'picture']),
  style: PropTypes.object,
  resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch']),
  br: PropTypes.number,
};

export default BarImage;
