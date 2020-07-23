import React from 'react';
import {TextField} from 'react-native-material-textfield';
import {Colors} from '../../themes';

const BarInput = ({errorText, ...props}) => {
  return (
    <TextField
      baseColor={Colors.gray}
      error={errorText}
      textColor={Colors.text}
      tintColor={Colors.outline}
      {...props}
    />
  );
};

export default BarInput;
