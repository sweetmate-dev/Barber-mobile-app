import React, {useState} from 'react';
import ImagePicker from 'react-native-image-picker';
import {BarView, RootView, BarContent} from '../../components/styled/View';
import {BarHeader, BarImage, BarInput} from '../../components/common';
import {H5} from '../../components/styled/Text';
import {dySize} from '../../utils/responsive';
import {Colors} from '../../themes';
import {BarButton} from '../../components/styled/Button';

const EditAccountScreen = () => {
  const [name, setName] = useState('Matthew Sadler');
  const [email, setEmail] = useState('matthew.sadler.9@gmail.com');
  const [image, setImageUrl] = useState('');
  onToggleImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImageUrl(response.uri);
      }
    });
  };
  return (
    <RootView justify="flex-start" align="flex-start">
      <BarHeader
        title={<H5 weight="bold">EDIT ACCOUNT</H5>}
        hasRight
        rightIconType="AntDesign"
        rightIcon="upload"
      />
      <BarContent contentContainerStyle={{padding: dySize(10)}}>
        <BarView background={Colors.card} align="center" mt={4} pv={10}>
          <BarButton width={100} height={100} br={30} onPress={onToggleImage}>
            <BarImage image={{uri: image}} width={100} height={100} round />
          </BarButton>
        </BarView>
        <BarView background={Colors.card} align="center" mt={2} ph={10}>
          <BarInput
            label={'Name'}
            value={name}
            onChangeText={setName}
            lineWidth={0}
            activeLineWidth={0}
            containerStyle={{width: '100%'}}
          />
        </BarView>
        <BarView background={Colors.card} align="center" mt={2} ph={10}>
          <BarInput
            label={'Email'}
            value={email}
            onChangeText={setEmail}
            lineWidth={0}
            activeLineWidth={0}
            containerStyle={{width: '100%'}}
          />
        </BarView>
      </BarContent>
    </RootView>
  );
};

export default EditAccountScreen;
