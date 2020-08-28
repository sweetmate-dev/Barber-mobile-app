import React, {useContext, useState} from 'react';
import {Modal, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import MapView, {Marker, GOOGLE_PROVIDER} from 'react-native-maps';
import {WaveIndicator} from 'react-native-indicators';
import {useQuery, useMutation} from '@apollo/client';
import {H5, H6, BarIcon} from '../../../components/styled/Text';
import {RootView, BarContent, BarView} from '../../../components/styled/View';
import {dySize} from '../../../utils/responsive';
import {Colors} from '../../../themes';
import {
  BarActionButton,
  BarIconButton,
  BarImage,
} from '../../../components/common';
import {BarButton} from '../../../components/styled/Button';
import {GET_MY_CUTS} from '../../../graphql/query';
import {ADD_CUT, REMOVE_CUT} from '../../../graphql/mutation';
import {Context as AuthContext} from '../../../context/authContext';
import API from '../../../services/api';
import {
  showLoading,
  hideLoading,
  showConfirmAlert,
} from '../../../services/operators';
import {FlatList} from 'react-native-gesture-handler';

const profileButtons = [
  {
    title: 'Info',
    iconType: 'AntDesign',
    iconName: 'infocirlceo',
    redirectTo: 'EditBarberProfile',
  },
  {
    title: 'Photos',
    iconType: 'AntDesign',
    iconName: 'camerao',
  },
  {
    title: 'Mobile Pay',
    iconType: 'AntDesign',
    iconName: 'creditcard',
    redirectTo: 'AddBarberMobilePay',
  },
  {
    title: 'Profile Link',
    iconType: 'AntDesign',
    iconName: 'link',
    redirectTo: 'EditBarberLink',
  },
];

const BarberInfoScreen = ({onShouldHideHeader, onShouldShowHeader}) => {
  const {state} = useContext(AuthContext);

  const myId = state.user.id || '';
  const [visibleIndex, setVisibleIndex] = useState(-1); // photo gallaxy visibility
  const [showHeader, setShowHeader] = useState(true);
  const MyCuts = useQuery(GET_MY_CUTS, {variables: {user_id: myId}});

  const [addCutImage] = useMutation(ADD_CUT, {
    refetchQueries: [
      {
        query: GET_MY_CUTS,
        variables: {user_id: myId},
      },
    ],
    onCompleted: (data) => {
      hideLoading();
    },
  });
  const [removeCutImage] = useMutation(REMOVE_CUT, {
    refetchQueries: [
      {
        query: GET_MY_CUTS,
        variables: {user_id: myId},
      },
    ],
    onCompleted: (data) => {
      hideLoading();
    },
  });

  const onPressAddPhoto = () => {
    // open image picker
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(async (image) => {
      showLoading('Uploading picture...');
      const fileName = `cuts/${myId}-${new Date().getTime()}`;
      const avatarUrl = await API.fileUploadToS3({
        image: image.path,
        name: fileName,
      });
      addCutImage({variables: {user_id: myId, image: avatarUrl}});
    });
  };

  const onPressDeleteCut = (cut) => {
    showConfirmAlert(
      {description: 'You want to remove this cut image?'},
      () => {
        showLoading('Removing picture...');
        removeCutImage({variables: {id: cut.id}});
      },
    );
  };

  onPressProfileButton = (button) => {
    if (button.title === 'Photos') {
      onPressAddPhoto();
    }
  };

  let scrollStartOffset = 0;
  onScroll = (nativeEvent) => {
    const offsetY = nativeEvent.contentOffset.y;
    if (offsetY > 200 && scrollStartOffset < offsetY && showHeader) {
      setShowHeader(false);
      onShouldHideHeader();
    } else if (offsetY < 200 && scrollStartOffset > offsetY && !showHeader) {
      setShowHeader(true);
      onShouldShowHeader();
    }
    scrollStartOffset = offsetY;
  };

  _renderPhotoItems = ({item, index}) => {
    const cut = item;
    return (
      <BarView mr={4} ml={4} key={cut.id} mb={8}>
        <BarButton
          width={170}
          height={170}
          onPress={() => setVisibleIndex(index)}>
          <BarImage image={{uri: cut.image}} width={170} height={170} />
        </BarButton>
        <BarButton
          width={30}
          height={30}
          br={15}
          padding={1}
          background={Colors.background}
          onPress={() => onPressDeleteCut(cut)}
          style={{
            position: 'absolute',
            left: 10,
            top: 10,
          }}>
          <BarIcon
            type="AntDesign"
            name="delete"
            color={Colors.outline}
            margin={1}
            size={15}
          />
        </BarButton>
      </BarView>
    );
  };

  return (
    <RootView justify="flex-start" align="flex-start">
      <BarContent
        contentContainerStyle={{padding: dySize(10)}}
        onScroll={(event) => onScroll(event.nativeEvent)}>
        <BarView background={Colors.card} ph={10} pv={10}>
          <BarView row align="center">
            <BarIcon
              name="warning"
              type="AntDesign"
              color={Colors.red}
              size={40}
            />
            <H5 ml={10}>COVID-19 Discolosure</H5>
          </BarView>
          <H6 lh={20}>
            As a result of the COVID-19 pandemic, many states and local
            jurisdictions have issued stay at home orders and restrictive
            measures that may prevent individuals in those locations from using
            BarbApp. It is your responsibility to adhere to the regulations put
            inplace by your local government. Even in those locatoins where it
            is permissible to schedule appointments using BarbApp, please
            understand these is still a substantial risk of becoming exposed to
            or inflected by the COVIC-19 virus. By booking this appointment, you
            agree to the{' '}
          </H6>
          <BarActionButton text="COVID-19 Terms of Services" width={335} />
        </BarView>
        <H5 mt={10} weight="bold">
          COMPLETE YOUR PROFILE
        </H5>
        <BarView background={Colors.card} pv={10} row>
          {profileButtons.map((button) => {
            if (
              button.title === 'Photos' &&
              MyCuts.data &&
              MyCuts.data.user_cuts.length > 0
            )
              return null;
            return (
              <BarButton
                justify="center"
                style={{flex: 1}}
                onPress={() => onPressProfileButton(button)}>
                <BarView width={30} height={30} justify="center" align="center">
                  <BarIcon
                    name={button.iconName}
                    type={button.iconType}
                    color={Colors.outline}
                  />
                </BarView>
                <H6 align="center" color={Colors.outline}>
                  {button.title}
                </H6>
              </BarButton>
            );
          })}
        </BarView>
        <BarView row mt={10} justify="space-between">
          <H5 weight="bold">LOCATION & HOURS</H5>
          <BarButton padding={1} mb={2}>
            <H5 weight="bold" color={Colors.outline}>
              EDIT
            </H5>
          </BarButton>
        </BarView>
        <BarView height={200} width={355} background="white">
          <MapView
            provider={GOOGLE_PROVIDER}
            style={{...StyleSheet.absoluteFillObject}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{latitude: 37.79225, longitude: -122.4024}}
              title="Barber Shop"
              description="This is my location"
            />
          </MapView>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#000000FF', '#000000CC', '#00000055']}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              height: dySize(200),
            }}>
            <H5>Aurora, Colorado, United States</H5>
            <H5 color={Colors.placeholder}>Not set up</H5>
          </LinearGradient>
        </BarView>
        {MyCuts.loading ? (
          <WaveIndicator color={Colors.text} />
        ) : !MyCuts.loading && MyCuts.error ? (
          <H5 weight="bold">{MyCuts.error}</H5>
        ) : MyCuts.data && MyCuts.data.user_cuts.length > 0 ? (
          <>
            <BarView row mt={10} justify="space-between">
              <H5 weight="bold">PHOTOS</H5>
              <BarButton padding={1} mb={2} onPress={onPressAddPhoto}>
                <H5 weight="bold" color={Colors.outline}>
                  ADD
                </H5>
              </BarButton>
            </BarView>
            <FlatList
              data={MyCuts.data.user_cuts}
              renderItem={_renderPhotoItems}
              numColumns={2}
            />
          </>
        ) : null}
      </BarContent>
      {!MyCuts.loading && MyCuts.data && (
        <Modal visible={visibleIndex > -1} transparent={true}>
          <ImageViewer
            imageUrls={MyCuts.data.user_cuts.map((i) => ({
              url: i.image,
            }))}
            index={visibleIndex}
            onCancel={() => setVisibleIndex(-1)}
            enablePreload
          />
          <BarButton
            width={60}
            height={60}
            br={30}
            padding={1}
            background={Colors.background}
            onPress={() => setVisibleIndex(-1)}
            style={{
              position: 'absolute',
              right: 10,
              top: 15,
            }}>
            <BarIcon type="AntDesign" name="close" margin={1} />
          </BarButton>
        </Modal>
      )}
    </RootView>
  );
};

export default BarberInfoScreen;
