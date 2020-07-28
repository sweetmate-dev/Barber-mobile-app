import {Auth} from 'aws-amplify';
import createDataContext from './createDataContext';
import {showAlert, showLoading, hideLoading} from '../services/operators';
import {ERRORS} from '../utils/constants';
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
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

const signIn = (dispatch) => {
  return async ({username, password}) => {
    showLoading('Logging in...');
    Auth.signIn(username, password)
      .then((user) => {
        // get Cognito tokens from current session
        const session = user.signInUserSession;
        const {idToken, refreshToken} = session;
        dispatch({type: 'saveJWTToken', payload: idToken});
        dispatch({type: 'saveRefreshToken', payload: refreshToken});
        dispatch({type: 'saveUser', payload: user.attributes});
        hideLoading();
        NavigationService.navigate('TabStack');
      })
      .catch((err) => {
        console.log({err});
        hideLoading();
        if (err.code === 'UserNotConfirmedException') {
          NavigationService.navigate('VerifyEmail', {email: username});
        } else {
          showAlert(err.message);
        }
      });
  };
};

const signUp = (dispatch) => {
  return async ({username, password}) => {
    showLoading('Registering...');
    Auth.signUp({
      username,
      password,
      attributes: {email: username},
    })
      .then((data) => {
        console.log('sign up successful!');
        console.log(JSON.stringify(data));
      })
      .catch((err) => {
        showAlert(err.message);
      });
  };
};

const verifyEmail = (dispatch) => {
  return async ({email, code}) => {
    showLoading('Verifying...');
    Auth.confirmSignUp(email, code)
      .then((res) => {
        // res: SUCCESS
        hideLoading();
        console.log('Verified successful!', res);
        NavigationService.navigate('TabStack');
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
  },
  initialState,
);
