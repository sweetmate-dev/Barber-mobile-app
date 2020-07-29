import React, {useContext} from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {BarInput, BarActionButton} from '../../components/common';
import {RootView} from '../../components/styled/View';
import NavigationService from '../../navigation/NavigationService';
import {Context as AuthContext} from '../../context/authContext';

const LoginScreen = () => {
  const {signIn} = useContext(AuthContext);
  login = (values) => {
    signIn({
      username: values.email,
      password: values.password,
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8),
  });

  return (
    <RootView justify="flex-start" align="center" background="transparent">
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: 'yasuom817@gmail.com',
          password: 'Test1234',
        }}
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
              errorText={submitCount > 0 ? errors.email : ''}
            />
            <BarInput
              label="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              errorText={submitCount > 0 ? errors.password : ''}
              secureTextEntry
            />
            <BarActionButton text="LOG IN" mt={10} onPress={handleSubmit} />
          </View>
        )}
      />
    </RootView>
  );
};

export default LoginScreen;
