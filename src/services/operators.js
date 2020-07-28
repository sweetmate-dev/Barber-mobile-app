import {Linking} from 'react-native';
import Toast from 'react-native-tiny-toast';
import {Loading2} from '../assets/images';

let myToast;

export const showAlert = (text) => {
  Toast.show(text, {
    duration: 2000,
    position: Toast.position.center,
    containerStyle: {
      backgroundColor: '#E2E2E2',
    },
    textStyle: {
      color: 'black',
    },
  });
};

export const showLoading = (text) => {
  myToast = Toast.showLoading(text, {
    containerStyle: {
      backgroundColor: '#E2E2E2',
    },
    imgSource: Loading2,
    loading: false,
    textStyle: {
      color: 'black',
    },
  });
};

export const hideLoading = () => {
  Toast.hide(myToast);
};

// Validates email input
export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Validates phone input
export const validatePhone = (phone) => {
  const re = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;
  return re.test(String(phone).toLowerCase());
};

export const validURL = (str) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
};

export const openUrl = (url) => {
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      showAlert('coming soon');
      // Linking.openURL(url);
    } else {
      showAlert("Don't know how to open URI: " + url);
    }
  });
};

export const getTimeFormat = (num) => {
  const h = Math.floor(num);
  const m = (num - Math.floor(num)) * 60;
  const a = num > 11 ? 'PM' : 'AM';
  return `${num < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m} ${a}`;
};
