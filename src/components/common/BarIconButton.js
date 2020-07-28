import React from 'react';
import {BarButton} from '../styled/Button';
import {Colors} from '../../themes';
import {BarIcon} from '../styled/Text';

const BarIconButton = ({
  icon,
  iconType = 'AntDesign',
  iconSize = 15,
  iconColor = Colors.background,
  ...props
}) => {
  return (
    <BarButton
      background={Colors.outline}
      width={30}
      height={30}
      br={30}
      padding={1}
      {...props}>
      <BarIcon type={iconType} name={icon} size={iconSize} color={iconColor} />
    </BarButton>
  );
};

export default BarIconButton;
