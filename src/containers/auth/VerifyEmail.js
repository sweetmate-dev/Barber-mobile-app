import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {BarInput, BarActionButton, BarHeader} from '../../components/common';
import {RootView, BarView} from '../../components/styled/View';
import {Context as AuthContext} from '../../context/authContext';
import {H1, H5} from '../../components/styled/Text';
import {Colors} from '../../themes';
import {dySize} from '../../utils/responsive';

const VerifyEmailScreen = ({route}) => {
  const email = route.params.email;
  const {sendCode, verifyEmail} = useContext(AuthContext);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  resendCode = () => {
    sendCode(email);
    setValue('');
  };

  verify = () => {
    verifyEmail({email, code: value});
  };

  return (
    <RootView justify="flex-start" align="center">
      <BarHeader title={<H5 weight="bold">Verification</H5>} />
      <H5 width={300} mt={30} color={Colors.placeholder}>
        We sent a verification code to your email address. Please check{' '}
        <H5 color={Colors.text}>{email}</H5> to get the code.
      </H5>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={6}
        rootStyle={{
          marginTop: 20,
          width: dySize(300),
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <BarView
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            width={45}
            height={45}
            br={4}
            padding={1}
            align="center"
            justify="center"
            style={{borderWidth: 1, borderColor: Colors.placeholder}}>
            <H1 color={Colors.outline} pv={1}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </H1>
          </BarView>
        )}
      />
      <BarActionButton text="Verify" mt={30} width={300} onPress={verify} />
      <BarActionButton
        text="Send again"
        mt={10}
        width={300}
        background="transparent"
        bordered
        borderColor={Colors.outline}
        textColor={Colors.outline}
        onPress={resendCode}
      />
    </RootView>
  );
};

export default VerifyEmailScreen;
