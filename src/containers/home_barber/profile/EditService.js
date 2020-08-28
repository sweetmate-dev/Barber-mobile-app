import React, {useState, useRef, useEffect} from 'react';
import {View} from 'react-native';
import * as _ from 'lodash';
import {H5, H6} from '../../../components/styled/Text';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {RootView, BarContent, BarView} from '../../../components/styled/View';
import {dySize} from '../../../utils/responsive';
import {Colors} from '../../../themes';
import {BarInput, BarHeader, BarActionButton} from '../../../components/common';
import {
  showAlert,
  showLoading,
  hideLoading,
  showConfirmAlert,
} from '../../../services/operators';
import {
  ADD_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
} from '../../../graphql/mutation';
import {GET_BARBER_SERVICES} from '../../../graphql/query';
import NavigationService from '../../../navigation/NavigationService';

const EditServiceScreen = ({route}) => {
  const [updating] = useState(route.params.service.id || false);
  const nameField = useRef(null);
  const priceField = useRef(null);
  const durationField = useRef(null);
  const descriptionField = useRef(null);

  onAddedOrUpdatedService = () => {
    hideLoading();
    NavigationService.goBack();
  };

  onProcessError = (error) => {
    hideLoading();
    showAlert(JSON.stringify(error));
  };

  const [addService] = useMutation(ADD_SERVICE, {
    onCompleted: onAddedOrUpdatedService,
    onError: onProcessError,
    refetchQueries: [
      {
        query: GET_BARBER_SERVICES,
        variables: {barberId: route.params.barberId},
      },
    ],
  });

  const [updateService] = useMutation(UPDATE_SERVICE, {
    onCompleted: onAddedOrUpdatedService,
    onError: onProcessError,
    refetchQueries: [
      {
        query: GET_BARBER_SERVICES,
        variables: {barberId: route.params.barberId},
      },
    ],
  });

  const [deleteService] = useMutation(DELETE_SERVICE, {
    onCompleted: onAddedOrUpdatedService,
    onError: onProcessError,
    refetchQueries: [
      {
        query: GET_BARBER_SERVICES,
        variables: {barberId: route.params.barberId},
      },
    ],
  });

  const service_inputs = [
    {
      key: 'name',
      placeholder: 'Name',
      errorText: 'Service Name is required',
      maxLength: 20,
      ref: nameField,
    },
    {
      key: 'price',
      placeholder: 'Price (￡)',
      keyboardType: 'numeric',
      errorText: 'Price should be valid',
      maxLength: 4,
      ref: priceField,
    },
    {
      key: 'duration',
      placeholder: 'Duration (minute)',
      keyboardType: 'numeric',
      errorText: 'Duration should be valid',
      maxLength: 3,
      ref: durationField,
    },
    {
      key: 'description',
      placeholder: 'Description',
      errorText: 'Description is required',
      maxLength: 256,
      ref: descriptionField,
    },
  ];

  useEffect(() => {
    service_inputs.map((input) => {
      input.ref.current.setValue(route.params.service[input.key]);
    });
  });

  const handleChange = (input) => (value) => {
    if (input.key === 'price' && input.ref)
      input.ref.current.setValue(Math.min(1000, Number(value)));
    else if (input.key === 'duration' && input.ref)
      input.ref.current.setValue(String(Math.min(120, Number(value))));
  };

  const submit = () => {
    let error = [];
    let param = {};
    service_inputs.map((input) => {
      const key = input.key;
      const value = input.ref.current.value();
      param[key] = value;
      if (key === 'name' && value.length === 0) {
        error.push(input.errorText);
      } else if (key === 'price' && Number(value) <= 0) {
        error.push(input.errorText);
      } else if (key === 'duration' && Number(value) <= 0) {
        error.push(input.errorText);
      } else if (key === 'description' && value.length === 0) {
        error.push(input.errorText);
      }
    });
    if (error.length > 0) {
      showAlert(error[0]);
      return;
    }
    if (updating) {
      showLoading('Saving...');
      updateService({
        variables: {
          ...param,
          id: route.params.service.id,
        },
      });
    } else {
      showLoading('Adding...');
      addService({
        variables: {
          ...param,
          barber_id: route.params.barberId,
        },
      });
    }
  };

  onPressDelete = () => {
    showConfirmAlert({description: 'You want to delete this service?'}, () => {
      showLoading('Deleting...');
      deleteService({
        variables: {id: route.params.service.id},
      });
    });
  };

  return (
    <RootView justify="flex-start" align="center">
      <BarHeader
        title={
          <H5 weight="bold">{updating ? 'EDIT SERVICE' : 'ADD SERVICE'}</H5>
        }
        leftText="CANCEL"
        hasRight
        rightText={updating ? 'SAVE' : 'ADD'}
        onPressRight={submit}
      />
      <BarContent contentContainerStyle={{alignItems: 'center'}}>
        {service_inputs.map((input) => {
          return (
            <View
              key={input.key}
              style={{
                backgroundColor: Colors.card,
                marginBottom: 2,
                paddingHorizontal: 15,
                width: dySize(355),
              }}>
              <BarInput
                inputRef={input.ref}
                label={input.placeholder}
                onChangeText={handleChange(input)}
                keyboardType={input.keyboardType || 'default'}
                maxLength={input.maxLength}
                lineWidth={0}
                activeLineWidth={0}
                containerStyle={{margin: -5}}
              />
            </View>
          );
        })}
      </BarContent>
      {updating && (
        <BarActionButton
          text="Delete"
          mb={20}
          background={Colors.red}
          textColor={Colors.text}
          onPress={onPressDelete}
        />
      )}
    </RootView>
  );
};

export default EditServiceScreen;
