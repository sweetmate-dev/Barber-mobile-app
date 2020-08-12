import React, {useContext, useState} from 'react';
import {Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import {useQuery, useMutation} from '@apollo/client';
import {WaveIndicator} from 'react-native-indicators';
import ImageViewer from 'react-native-image-zoom-viewer';
import {H5, H6, BarIcon} from '../../../components/styled/Text';
import {RootView, BarContent, BarView} from '../../../components/styled/View';
import {BarButton} from '../../../components/styled/Button';
import {BarHeader, BarImage} from '../../../components/common';
import {dySize} from '../../../utils/responsive';
import {Welcome, Jacket, Face} from '../../../assets/images';
import {Colors} from '../../../themes';
import NavigationService from '../../../navigation/NavigationService';
import MyBarberItem from './MyBarberItem';
import {Context as AuthContext} from '../../../context/authContext';
import {
  showLoading,
  hideLoading,
  showConfirmAlert,
} from '../../../services/operators';
import {ADD_CUT, REMOVE_CUT} from '../../../graphql/mutation';
import {GET_MY_CUTS, GET_FAVORITE_BARBERS} from '../../../graphql/query';
import API from '../../../services/api';

const HomeScreen = () => {
  const {state} = useContext(AuthContext);

  if (!state.user.id) return <RootView justify="flex-start"></RootView>;
  const [visibleIndex, setVisibleIndex] = useState(-1); // cut gallaxy visibility

  const MyCuts = useQuery(GET_MY_CUTS, {variables: {user_id: state.user.id}});
  const MyFavoriteBarbers = useQuery(GET_FAVORITE_BARBERS, {
    variables: {user_id: state.user.id},
  });
  const [addCutImage] = useMutation(ADD_CUT, {
    refetchQueries: [
      {
        query: GET_MY_CUTS,
        variables: {user_id: state.user.id},
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
        variables: {user_id: state.user.id},
      },
    ],
    onCompleted: (data) => {
      hideLoading();
    },
  });

  const onPressAddCut = () => {
    // open image picker
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(async (image) => {
      showLoading('Uploading picture...');
      const fileName = `cuts/${state.user.id}-${new Date().getTime()}`;
      const avatarUrl = await API.fileUploadToS3({
        image: image.path,
        name: fileName,
      });
      addCutImage({variables: {user_id: state.user.id, image: avatarUrl}});
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

  onPressFavoriteBarber = (barber) => {
    NavigationService.navigate('BarberProfile', {barber});
  };

  return (
    <RootView justify="flex-start">
      <BarHeader
        title={<H5 weight="bold">HOME</H5>}
        hasBack={false}
        hasRight
        rightIconType="AntDesign"
        rightIcon="bells"
      />
      <BarContent
        style={{padding: dySize(10)}}
        contentContainerStyle={{paddingBottom: 100}}>
        <BarImage image={{uri: state.user.avatar}} width={355} height={250} />
        <LinearGradient
          colors={['#00000055', '#000000CC', '#000000FF']}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            height: dySize(250),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BarImage round image={{uri: state.user.avatar}} />
          <H5 weight="bold">{state.user.name}</H5>
        </LinearGradient>

        <BarView row justify="space-between" align="center">
          <H5 weight="bold">MY BARBERS</H5>
          <BarButton onPress={() => NavigationService.navigate('TabSearch')}>
            <BarIcon type="AntDesign" name="search1" color={Colors.outline} />
          </BarButton>
        </BarView>

        <BarView row wrap>
          {MyFavoriteBarbers.data &&
            MyFavoriteBarbers.data.favorite_barbers.map((item) => (
              <MyBarberItem
                key={item.id}
                user={item.barber}
                onPress={() => onPressFavoriteBarber(item.barber)}
              />
            ))}
          {MyFavoriteBarbers.data &&
            MyFavoriteBarbers.data.favorite_barbers.length === 0 && (
              <H6 color={Colors.placeholder} mb={20}>
                No favorite barbers
              </H6>
            )}
        </BarView>

        <BarView row justify="space-between" align="center">
          <H5 weight="bold">MY CUTS</H5>
          <BarButton onPress={onPressAddCut}>
            <BarIcon type="AntDesign" name="plus" color={Colors.outline} />
          </BarButton>
        </BarView>

        <BarView row wrap>
          {MyCuts.loading && <WaveIndicator color={Colors.text} />}
          {!MyCuts.loading && MyCuts.error && (
            <H5 weight="bold">{MyCuts.error}</H5>
          )}
          {!MyCuts.loading &&
            MyCuts.data &&
            MyCuts.data.user_cuts.map((cut, index) => (
              <BarView mr={4} ml={4} key={cut.id}>
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
            ))}
        </BarView>
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

export default HomeScreen;
