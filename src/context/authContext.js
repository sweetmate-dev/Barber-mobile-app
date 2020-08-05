import {Auth} from 'aws-amplify';
import createDataContext from './createDataContext';
import {showAlert, showLoading, hideLoading} from '../services/operators';
import NavigationService from '../navigation/NavigationService';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'saveJWTToken':
      return {
        ...state,
        JWTToken: action.payload,
      };
    case 'saveRefreshToken':
      return {
        ...state,
        refreshToken: action.payload,
      };
    case 'saveUser':
      console.log('Payload: ', action.payload);
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const dispatch = (dispatch) => {
  return async (action) => {
    dispatch(action);
  };
};

export const signIn = (dispatch) => {
  return async ({username, password}) => {
    showLoading('Logging in...');
    Auth.signIn(username, password)
      .then((user) => {
        // get Cognito tokens from current session
        const session = user.signInUserSession;
        const {idToken, refreshToken} = session;
        console.log('attributes: ', user.attributes);
        dispatch({type: 'saveJWTToken', payload: idToken.jwtToken});
        dispatch({type: 'saveRefreshToken', payload: refreshToken.token});
        dispatch({type: 'saveUser', payload: user.attributes});
        hideLoading();
        NavigationService.navigate('TabStack');
      })
      .catch((err) => {
        console.log({err});
        hideLoading();
        if (err.code === 'UserNotConfirmedException') {
          NavigationService.navigate('VerifyEmail', {
            email: username,
            password,
          });
        } else {
          showAlert(err.message);
        }
      });
  };
};

const signUp = (dispatch) => {
  return async ({username, password, barber, fullName}) => {
    showLoading('Registering...');
    Auth.signUp({
      username,
      password,
      attributes: {
        email: username,
        'custom:role': barber ? 'barber' : 'customer',
        'custom:fullname': fullName,
      },
    })
      .then((data) => {
        console.log('sign up successful!');
        hideLoading();
        console.log(JSON.stringify(data));
        NavigationService.navigate('VerifyEmail', {
          email: username,
          password,
        });
      })
      .catch((err) => {
        hideLoading();
        showAlert(err.message);
        console.log(err.message);
      });
  };
};

const verifyEmail = (dispatch) => {
  return async ({email, password, code}) => {
    showLoading('Verifying...');
    Auth.confirmSignUp(email, code)
      .then((res) => {
        // res: SUCCESS
        hideLoading();
        signIn(dispatch)({username: email, password});
      })
      .catch((err) => {
        hideLoading();
        showAlert(err.message);
      });
  };
};

const sendCode = (dispatch) => {
  return async (email) => {
    showLoading('Sending code...');
    Auth.resendSignUp(email)
      .then((res) => {
        // res: SUCCESS
        hideLoading();
        showAlert('Verification code has been sent successfully');
      })
      .catch((err) => {
        hideLoading();
        showAlert(err.message);
      });
  };
};

const initialState = {
  JWTToken: null,
  refreshToken: null,
  user: {},
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {
    signIn,
    signUp,
    verifyEmail,
    sendCode,
    dispatch,
  },
  initialState,
);
