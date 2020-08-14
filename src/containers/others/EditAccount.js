import React, {useState, useContext} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {useMutation} from '@apollo/client';
import {BarView, RootView, BarContent} from '../../components/styled/View';
import {BarHeader, BarImage, BarInput} from '../../components/common';
import {H5} from '../../components/styled/Text';
import {dySize} from '../../utils/responsive';
import {Colors} from '../../themes';
import API from '../../services/api';

import {BarButton} from '../../components/styled/Button';
import {Context as AuthContext} from '../../context/authContext';
import {UPDATE_USER_PROFILE} from '../../graphql/mutation';
import {showLoading, hideLoading} from '../../services/operators';
import NavigationService from '../../navigation/NavigationService';

const EditAccountScreen = () => {
  const {state, dispatch} = useContext(AuthContext);

  const [name, setName] = useState(state.user.name);
  const [email, setEmail] = useState(state.user.email);
  const [phone, setPhone] = useState(state.user.phone || '');
  const [image, setImageUrl] = useState(state.user.avatar);

  onToggleImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      setImageUrl(image.path);
    });
  };

  const onPressUpdate = async () => {
    showLoading('Updating profile...');
    let params = {id: state.user.id, name, email, phone, avatar: image};
    if (image.length > 0 && image.indexOf('https://') < 0) {
      const fileName = 'avatar/' + state.user.id;
      const avatarUrl = await API.fileUploadToS3({
        image,
        name: fileName,
      });
      params.avatar = avatarUrl;
    }
    updateProfile({variables: params});
  };

  const updateCache = (cache, {data}) => {
    hideLoading();
    dispatch({
      type: 'saveUser',
      payload: {
        ...state.user,
        ...data.update_users.returning[0],
      },
    });
    NavigationService.goBack();
  };

  const [updateProfile] = useMutation(UPDATE_USER_PROFILE, {
    update: updateCache,
  });

  return (
    <RootView justify="flex-start" align="flex-start">
      <BarHeader
        title={<H5 weight="bold">EDIT ACCOUNT</H5>}
        hasRight
        rightIconType="AntDesign"
        rightIcon="upload"
        onPressRight={onPressUpdate}
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
        <BarView background={Colors.card} align="center" mt={2} ph={10}>
          <BarInput
            label={'Phone'}
            value={phone}
            onChangeText={setPhone}
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
