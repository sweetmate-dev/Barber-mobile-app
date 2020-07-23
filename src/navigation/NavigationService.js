import {CommonActions} from '@react-navigation/native';
const config = {};
function setNavigator(nav) {
  if (nav) {
    config.navigator = nav;
  }
}
function navigate(routeName, params) {
  if (config.navigator && routeName) {
    config.navigator.dispatch(
      CommonActions.navigate({name: routeName, params}),
    );
  }
}

function reset(routeName, params) {
  if (config.navigator && routeName) {
    config.navigator.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: routeName}],
      }),
    );
  }
}

function goBack() {
  if (config.navigator) {
    config.navigator.dispatch(CommonActions.goBack());
  }
}

export default {
  setNavigator,
  navigate,
  reset,
  goBack,
};
