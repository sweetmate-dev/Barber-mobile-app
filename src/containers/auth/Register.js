import React, {useState, useContext} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Auth} from 'aws-amplify';
import {Colors} from '../../themes';
import {BarInput, BarSwitch, BarActionButton} from '../../components/common';
import {H5, H6} from '../../components/styled/Text';
import {RootView, BarView, BarContent} from '../../components/styled/View';
import {dySize} from '../../utils/responsive';
import {openUrl, showAlert} from '../../services/operators';
import {Context as AuthContext} from '../../context/authContext';

const RegisterScreen = () => {
  const {signUp} = useContext(AuthContext);
  const [barber, setBarber] = useState(false);
  register = (values) => {
    console.log({values});
    // NavigationService.navigate('TabStack');
    signUp({
      username: values.email,
      password: values.password,
    });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required()
      .matches(/^[a-zA-Z]/),
    lastName: Yup.string()
      .required()
      .matches(/^[a-zA-Z]/),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8),
    confirm: Yup.string()
      .required()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  return (
    <RootView justify="flex-start" align="center" background="transparent">
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          firstName: 'Tian',
          lastName: 'Li',
          email: 'litiyan2015@gmail.com',
          password: 'Test1234',
          confirm: 'Test1234',
        }}
        onSubmit={(values) => register(values)}
        render={({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          submitCount,
        }) => (
          <BarContent align="center" style={{paddingHorizontal: dySize(15)}}>
            <BarView row justify="space-between">
              <BarInput
                label="First Name"
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
                errorText={submitCount > 0 ? errors.firstName : ''}
                containerStyle={{width: dySize(160)}}
              />
              <BarInput
                label="Last Name"
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
                errorText={submitCount > 0 ? errors.lastName : ''}
                containerStyle={{width: dySize(160)}}
              />
            </BarView>
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
            <BarInput
              label="Confirm Password"
              onChangeText={handleChange('confirm')}
              onBlur={handleBlur('confirm')}
              value={values.confirm}
              errorText={submitCount > 0 ? errors.confirm : ''}
              secureTextEntry
            />
            <BarView
              row
              justify="space-between"
              align="center"
              width={345}
              height={60}>
              <H5>Are you a barber?</H5>
              <BarView height={60} justify="center" align="center">
                <BarSwitch
                  value={barber}
                  onValueChange={(val) => setBarber(val)}
                  activeText="Yes"
                  inActiveText="No"
                />
              </BarView>
            </BarView>
            <BarActionButton text="SIGN UP" mt={10} onPress={handleSubmit} />
            <BarView row wrap justify="center" mt={20}>
              <H6>By signing up, I agree to the </H6>
              <H6
                color={Colors.outline}
                underline
                onPress={() => openUrl('termsofservice')}>
                Terms of Services
              </H6>
              <H6> and </H6>
              <H6
                color={Colors.outline}
                underline
                onPress={() => openUrl('privacypolicy')}>
                Privacy Policy.
              </H6>
            </BarView>
          </BarContent>
        )}
      />
    </RootView>
  );
};

export default RegisterScreen;
