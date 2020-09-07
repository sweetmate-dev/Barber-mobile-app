import React from 'react';
import {TextInput, KeyboardAvoidingView} from 'react-native';
import {H5, H6} from '../../../components/styled/Text';
import {RootView, BarContent, BarView} from '../../../components/styled/View';
import {dySize} from '../../../utils/responsive';
import {BarHeader, BarInput} from '../../../components/common';
import {Colors} from '../../../themes';
import {BarButton} from '../../../components/styled/Button';
import NavigationService from '../../../navigation/NavigationService';
import {showAlert} from '../../../services/operators';

const ClientBlastScreen = () => {
  return (
    <RootView justify="flex-start" align="flex-start">
      <BarHeader
        title={<H5 weight="bold">CLIENT BLAST</H5>}
        hasRight
        rightIconType="Ionicons"
        rightIcon="ios-send"
        onPressRight={() => {
          showAlert('Coming soon');
          NavigationService.goBack();
        }}
      />
      <KeyboardAvoidingView
        style={{flex: 1, alignItems: 'center', paddingTop: 20}}
        behavior="padding">
        <TextInput
          placeholder="This message will be sent to all of your clients"
          placeholderTextColor={Colors.placeholder}
          multiline
          style={{
            color: Colors.text,
            borderWidth: 1,
            borderRadius: 4,
            borderColor: Colors.outline,
            height: 300,
            maxHeight: '90%',
            width: dySize(345),
            marginLeft: dySize(15),
            padding: 10,
          }}
        />
      </KeyboardAvoidingView>
    </RootView>
  );
};

export default ClientBlastScreen;
