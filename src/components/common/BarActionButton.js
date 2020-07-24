import React from 'react';
import {BarButton} from '../styled/Button';
import {Colors} from '../../themes';
import {H5} from '../styled/Text';

const BarActionButton = ({text, width = 350, ...props}) => {
  return (
    <BarButton
      width={width}
      br={4}
      mt={20}
      background={Colors.outline}
      {...props}>
      <H5 weight="bold" color={Colors.background}>
        {text}
      </H5>
    </BarButton>
  );
};

export default BarActionButton;
