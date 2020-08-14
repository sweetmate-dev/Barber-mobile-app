import React from 'react';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {H5, H6} from '../../../components/styled/Text';
import {RootView, BarContent} from '../../../components/styled/View';
import {BarHeader, BarItemButton} from '../../../components/common';
import {dySize} from '../../../utils/responsive';
import NavigationService from '../../../navigation/NavigationService';

const SettingScreen = () => {
  return (
    <RootView justify="flex-start" align="flex-start">
      <BarHeader title={<H5 weight="bold">SETTINGS</H5>} hasBack={false} />
      <BarContent contentContainerStyle={{padding: dySize(10)}}>
        <H6 weight="bold">ACCOUNTS</H6>
        <BarItemButton
          text="Edit Account"
          icon="edit"
          onPress={() => NavigationService.navigate('EditAccount')}
        />
        <BarItemButton text="Change Password" icon="key" />
        <BarItemButton
          text="Log Out"
          icon="logout"
          onPress={async () => {
            await AsyncStorage.clear();
            NavigationService.reset('AuthStack');
          }}
        />
        <H6 weight="bold" mt={10}>
          PAYMENT
        </H6>
        <BarItemButton text="Payment Method" icon="creditcard" />
        <H6 weight="bold" mt={10}>
          SHARE
        </H6>
        <BarItemButton text="Recommend BarbApp" icon="like2" />
        <BarItemButton
          text="Invite Your Barber"
          iconType="FontAwesome"
          icon="send-o"
        />
        <H6 weight="bold" mt={10}>
          CONTACT US
        </H6>
        <BarItemButton text="Send Feedback" icon="mail" />
        <BarItemButton text="Support" icon="message1" />
        <H6 weight="bold" mt={10}>
          FOLLOW US
        </H6>
        <BarItemButton text="Facebook" iconType="FontAwesome" icon="facebook" />
        <BarItemButton
          text="Instagram"
          iconType="Ionicons"
          icon="logo-instagram"
        />
        <BarItemButton text="Twitter" iconType="Feather" icon="twitter" />
        <H6 weight="bold" mt={10}>
          ABOUT
        </H6>
        <BarItemButton
          text="Website"
          iconType="FontAwesome"
          icon="window-maximize"
        />
        <BarItemButton text="Terms of Services" icon="filetext1" />
        <BarItemButton text="Privacy Policy" iconType="Feather" icon="lock" />
        <BarItemButton text="FAQs" icon="questioncircleo" />
        <H6 weight="bold" mt={10}>
          MORE
        </H6>
        <BarItemButton
          text="Visit the Store"
          icon={Platform.OS === 'ios' ? 'apple-o' : 'android'}
        />
        <BarItemButton text="Check for Updates" icon="download" />
        <BarItemButton text="Rate BarbApp" icon="staro" />
        <BarItemButton
          text="Special Offers"
          iconType="FontAwesome"
          icon="dollar"
        />
        <BarItemButton text="Take a Survey" icon="solution1" />
      </BarContent>
    </RootView>
  );
};

export default SettingScreen;
