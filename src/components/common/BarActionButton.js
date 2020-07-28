import React from 'react';
import {BarButton} from '../styled/Button';
import {Colors} from '../../themes';
import {H5} from '../styled/Text';

const BarActionButton = ({
  text,
  textColor = Colors.background,
  width = 350,
  ...props
}) => {
  return (
    <BarButton
      width={width}
      br={4}
      mt={20}
      background={Colors.outline}
      {...props}>
      <H5 weight="bold" color={textColor}>
        {text}
      </H5>
    </BarButton>
  );
};

export default BarActionButton;
