import React from 'react';
import {BarButton} from '../styled/Button';
import {Colors} from '../../themes';
import {H5, H6, BarIcon} from '../styled/Text';
import {dySize} from '../../utils/responsive';

const BarItemButton = ({
  text,
  width = 355,
  iconType = 'AntDesign',
  icon = '',
  iconSize = 20,
  hasArrow = false,
  ...props
}) => {
  return (
    <BarButton
      row
      justify="flex-start"
      width={width}
      br={2}
      mt={2}
      background={Colors.card}
      {...props}>
      {icon.length > 0 && (
        <BarIcon
          type={iconType}
          name={icon}
          size={iconSize}
          color={Colors.outline}
          style={{
            marginRight: 10,
            width: dySize(iconSize),
            textAlign: 'center',
          }}
        />
      )}
      <H5 color={Colors.text} style={{flex: 1}}>
        {text}
      </H5>
      {hasArrow && (
        <BarIcon type="AntDesign" name="right" color={Colors.placeholder} />
      )}
    </BarButton>
  );
};

export default BarItemButton;
