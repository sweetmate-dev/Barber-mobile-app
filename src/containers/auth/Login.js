import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Colors} from '../../themes';
import {BarInput} from '../../components/common';
import {H5} from '../../components/styled/Text';
import {BarButton} from '../../components/styled/Button';
import {RootView} from '../../components/styled/View';

const LoginScreen = () => {
  login = (values) => {
    console.log({values});
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(8).label('Password'),
  });

  return (
    <RootView justify="flex-start" align="center">
      <Formik
        validationSchema={validationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={(values) => login(values)}
        render={({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          submitCount,
        }) => (
          <View>
            <BarInput
              label="Email"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              errorText={submitCount > 0 && errors.email}
            />
            <BarInput
              label="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              errorText={submitCount > 0 && errors.password}
            />
            <BarButton
              onPress={handleSubmit}
              width={350}
              br={4}
              mt={20}
              background={Colors.outline}>
              <H5 weight="bold" color={Colors.background}>
                LOG IN
              </H5>
            </BarButton>
          </View>
        )}
      />
    </RootView>
  );
};

export default LoginScreen;
