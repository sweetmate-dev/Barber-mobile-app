import React from 'react';
import {BarView} from '../styled/View';
import {BarIcon, H5} from '../styled/Text';
import {Colors} from '../../themes';
import BarInput from './BarInput';
import {TextInput} from 'react-native-gesture-handler';
import {BarButton} from '../styled/Button';

const BarSearchInput = ({
  icon = 'search1',
  text,
  textColor = Colors.text,
  onChangeText = () => {},
  hasCloseButton = true,
  onRef = () => {},
  ...props
}) => {
  return (
    <BarView row align="center" background={Colors.card} height={35} br={4}>
      <BarIcon type="AntDesign" name={icon} color={Colors.outline} size={15} />
      <TextInput
        ref={(ref) => onRef(ref)}
        value={text}
        style={{flex: 1, color: textColor}}
        maxLength={50}
        onChangeText={onChangeText}
        {...props}
      />
      {hasCloseButton && (
        <BarButton
          onPress={() => onChangeText('')}
          background={Colors.placeholder}
          width={20}
          height={20}
          padding={1}
          mr={5}
          br={10}>
          <BarIcon
            type="AntDesign"
            name="close"
            color={Colors.background}
            size={10}
            margin={0}
          />
        </BarButton>
      )}
    </BarView>
  );
};

export default BarSearchInput;
